export interface RouteData {
  from: string;
  to: string;
}

export interface KeywordLink {
  keyword: string;
  url: string;
  routeKey: string;
  regexPattern: string;
}

function slugifyCity(city: string): string {
  return city.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function generateRouteKeywords(routes: RouteData[]): KeywordLink[] {
  const keywords: KeywordLink[] = [];
  
  for (const route of routes) {
    const fromSlug = slugifyCity(route.from);
    const toSlug = slugifyCity(route.to);
    const url = `/${fromSlug}/${toSlug}/`;
    const routeKey = `${fromSlug}-${toSlug}`;
    
    const fromEscaped = escapeRegExp(route.from.toLowerCase());
    const toEscaped = escapeRegExp(route.to.toLowerCase());
    
    const pattern = `travel\\s+(ke\\s+)?${fromEscaped}\\s*[-–—]?\\s*${toEscaped}`;
    
    keywords.push({
      keyword: `travel ${route.from.toLowerCase()} ${route.to.toLowerCase()}`,
      url,
      routeKey,
      regexPattern: pattern,
    });
  }
  
  keywords.sort((a, b) => b.keyword.length - a.keyword.length);
  
  return keywords;
}

export function injectInternalLinks(
  html: string,
  keywords: KeywordLink[],
  maxLinksPerArticle: number = 5
): string {
  const linkedRoutes = new Set<string>();
  let totalLinksAdded = 0;
  
  const forbiddenTags = new Set([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'script', 'style', 'code', 'pre', 'kbd', 'samp', 'var',
    'a', 'button', 'textarea', 'input', 'select'
  ]);
  
  const tagStack: string[] = [];
  
  let result = '';
  let i = 0;
  
  while (i < html.length) {
    const c = html[i];
    
    if (c === '<') {
      const tagEnd = html.indexOf('>', i);
      if (tagEnd === -1) {
        result += html.slice(i);
        break;
      }
      
      const fullTag = html.slice(i, tagEnd + 1);
      const tagMatch = fullTag.match(/^<\/?([a-zA-Z][a-zA-Z0-9]*)/i);
      
      if (tagMatch) {
        const isClosing = fullTag[1] === '/';
        const tagName = tagMatch[1].toLowerCase();
        
        if (isClosing) {
          const idx = tagStack.lastIndexOf(tagName);
          if (idx !== -1) {
            tagStack.splice(idx, 1);
          }
        } else if (!fullTag.endsWith('/>')) {
          tagStack.push(tagName);
        }
      }
      
      result += fullTag;
      i = tagEnd + 1;
    } else {
      let textEnd = html.indexOf('<', i);
      if (textEnd === -1) textEnd = html.length;
      
      let text = html.slice(i, textEnd);
      
      const isInForbidden = tagStack.some(t => forbiddenTags.has(t));
      
      if (!isInForbidden && totalLinksAdded < maxLinksPerArticle) {
        for (const kw of keywords) {
          if (linkedRoutes.has(kw.routeKey)) continue;
          if (totalLinksAdded >= maxLinksPerArticle) break;
          
          const regex = new RegExp(`(?<![a-zA-Z0-9])(${kw.regexPattern})(?![a-zA-Z0-9])`, 'gi');
          
          if (regex.test(text)) {
            text = text.replace(regex, (match) => {
              linkedRoutes.add(kw.routeKey);
              totalLinksAdded++;
              return `<a href="${kw.url}" class="internal-link">${match}</a>`;
            });
          }
        }
      }
      
      result += text;
      i = textEnd;
    }
  }
  
  return result;
}
