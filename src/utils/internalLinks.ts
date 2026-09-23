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
  
  // Anchor merek "travel palembang" -> homepage (selalu tersedia, bukan rute spesifik)
  keywords.push({
    keyword: 'travel palembang',
    url: '/',
    routeKey: 'travel-palembang-home',
    regexPattern: 'travel\\s+palembang',
  });
  
  for (const route of routes) {
    const fromSlug = slugifyCity(route.from);
    const toSlug = slugifyCity(route.to);
    const url = `/${fromSlug}/${toSlug}`;
    const routeKey = `${fromSlug}-${toSlug}`;
    
    const fromEscaped = escapeRegExp(route.from.toLowerCase());
    const toEscaped = escapeRegExp(route.to.toLowerCase());
    
    const pattern = `travel\\s+(?:ke\\s+)?${fromEscaped}\\s*(?:ke\\s+)?[-–—]?\\s*${toEscaped}`;
    
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
  
  // Gabungkan semua pattern dalam satu regex (longest-first, non-overlapping)
  // agar frasa lebih panjang (mis. "travel palembang baturaja") diprioritaskan
  // dan tidak menimpa frasa pendek ("travel palembang") sehingga tidak menghasilkan
  // anchor <a> bersarang yang tidak valid.
  const sorted = keywords.slice().sort((a, b) => b.regexPattern.length - a.regexPattern.length);
  const combinedPattern = sorted
    .map((kw, idx) => `(?<g${idx}>${kw.regexPattern})`)
    .join('|');
  const combinedRegex = new RegExp(
    `(?<![a-zA-Z0-9])(?:${combinedPattern})(?![a-zA-Z0-9])`,
    'gi'
  );
  
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
        text = text.replace(combinedRegex, (match, ...rest) => {
          if (totalLinksAdded >= maxLinksPerArticle) return match;
          
          const groupsObj = rest[rest.length - 1] as Record<string, string>;
          let matchedKw: KeywordLink | undefined;
          for (let idx = 0; idx < sorted.length; idx++) {
            if (groupsObj[`g${idx}`] !== undefined) {
              matchedKw = sorted[idx];
              break;
            }
          }
          if (!matchedKw) return match;
          if (linkedRoutes.has(matchedKw.routeKey)) return match;
          
          linkedRoutes.add(matchedKw.routeKey);
          totalLinksAdded++;
          return `<a href="${matchedKw.url}" class="internal-link">${match}</a>`;
        });
      }
      
      result += text;
      i = textEnd;
    }
  }
  
  return result;
}
