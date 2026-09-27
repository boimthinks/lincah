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

/**
 * Pemetaan eksplisit routeKey -> URL artikel blog.
 *
 * Konteks SEO: Google bersikeras mengindeks artikel blog (bukan halaman rute
 * /[from]/[to] yang bertindak sebagai money page). Agar link equity dari
 * autolink tidak "jatuh" ke halaman yang tidak terindeks, autolink dialihkan
 * ke artikel blog yang benar-benar tampil di SERP.
 *
 * routeKey dibentuk dari slug kota asal & tujuan: `${slugify(from)}-${slugify(to)}`.
 * Mapping ini tidak seragam (slug artikel tidak mengikuti pola rute) sehingga
 * harus didaftarkan manual. Untuk rute yang belum punya artikel, autolink
 * akan tetap mengarah ke halaman rute (/[from]/[to]) sebagai fallback.
 */
const ROUTE_BLOG_MAP: Record<string, string> = {
  // Palembang -> kota (arah utama, paling banyak dicari)
  'palembang-baturaja': '/blog/travel-palembang-baturaja-door-to-door',
  'palembang-lampung': '/blog/travel-palembang-lampung-via-tol',
  'palembang-jambi': '/blog/travel-palembang-jambi-berbasis-palembang',
  'palembang-kayu-agung': '/blog/travel-palembang-kayu-agung-door-to-door',
  'palembang-kikim': '/blog/ongkos-dan-jadwal-travel-palembang-kikim-lahat',
  'palembang-lahat': '/blog/travel-palembang-lahat-door-to-door',
  'palembang-lubuklinggau': '/blog/travel-palembang-lubuk-linggau-door-to-door',
  'palembang-muara-enim': '/blog/travel-palembang-muara-enim-door-to-door',
  'palembang-muara-dua': '/blog/travel-palembang-muara-dua-door-to-door',
  'palembang-pagaralam': '/blog/travel-palembang-pagaralam-door-to-door',
  'palembang-sekayu': '/blog/travel-palembang-sekayu',
  'palembang-sungai-lilin': '/blog/travel-palembang-sungai-lilin-door-to-door',
  'palembang-bayung-lencir': '/blog/travel-palembang-bayung-lencir-door-to-door',
  'palembang-indralaya': '/blog/travel-palembang-indralaya-unsri',
  'palembang-martapura': '/blog/travel-palembang-martapura-oku-timur',
  'palembang-batu-marta': '/blog/travel-palembang-batu-marta-oku-timur',
  'palembang-belitang': '/blog/travel-palembang-belitang-oku-timur',
  'palembang-prabumulih': '/blog/travel-palembang-prabumulih-jadwal-malam',
  'palembang-betung': '/blog/travel-palembang-ke-betung-rekomendasi-hotel',
  'palembang-simpang-belimbing': '/blog/travel-palembang-simpang-belimbing',
  'palembang-pendopo-lintang': '/blog/travel-palembang-pendopo-lintang',
  'palembang-babat-toman': '/blog/travel-palembang-babat-toman-harga',
  'palembang-tanjung-enim': '/blog/travel-palembang-tanjung-enim',
  'palembang-tebing-tinggi': '/blog/travel-palembang-tebing-tinggi-empat-lawang',
  'palembang-danau-ranau': '/blog/perjalanan-palembang-danau-ranau-wisata',
  'palembang-kuala-tungkal': '/blog/travel-palembang-kuala-tungkal-lintas-provinsi',
  'palembang-talang-padang': '/blog/travel-palembang-talang-padang',
  'palembang-tugumulyo': '/blog/travel-palembang-tugumulyo',
  'palembang-pelabuhan-tanjung-api-api': '/blog/travel-palembang-pelabuhan-tanjung-api-api',
  'palembang-muara-bulian': '/blog/travel-palembang-muara-bulian-perjalanan-dinas',
  'palembang-muara-beliti': '/blog/travel-palembang-muara-beliti',

  // Kota -> Palembang (arah balik)
  'baturaja-palembang': '/blog/travel-palembang-baturaja-door-to-door',
  'lampung-palembang': '/blog/travel-palembang-lampung-via-tol',
  'jambi-palembang': '/blog/travel-palembang-jambi-berbasis-palembang',
  'kayu-agung-palembang': '/blog/travel-palembang-kayu-agung-door-to-door',
  'kikim-palembang': '/blog/ongkos-dan-jadwal-travel-palembang-kikim-lahat',
  'lahat-palembang': '/blog/travel-palembang-lahat-door-to-door',
  'lubuklinggau-palembang': '/blog/travel-palembang-lubuk-linggau-door-to-door',
  'muara-enim-palembang': '/blog/travel-palembang-muara-enim-door-to-door',
  'muara-dua-palembang': '/blog/travel-palembang-muara-dua-door-to-door',
  'pagaralam-palembang': '/blog/travel-palembang-pagaralam-door-to-door',
  'sekayu-palembang': '/blog/travel-palembang-sekayu',
  'sungai-lilin-palembang': '/blog/travel-palembang-sungai-lilin-door-to-door',
  'bayung-lencir-palembang': '/blog/travel-palembang-bayung-lencir-door-to-door',
  'indralaya-palembang': '/blog/travel-palembang-indralaya-unsri',
  'martapura-palembang': '/blog/travel-palembang-martapura-oku-timur',
  'batu-marta-palembang': '/blog/travel-palembang-batu-marta-oku-timur',
  'belitang-palembang': '/blog/travel-palembang-belitang-oku-timur',
  'prabumulih-palembang': '/blog/travel-palembang-prabumulih-jadwal-malam',
  'betung-palembang': '/blog/travel-palembang-ke-betung-rekomendasi-hotel',
  'simpang-belimbing-palembang': '/blog/travel-palembang-simpang-belimbing',
  'pendopo-lintang-palembang': '/blog/travel-palembang-pendopo-lintang',
  'babat-toman-palembang': '/blog/travel-palembang-babat-toman-harga',
  'tebing-tinggi-palembang': '/blog/travel-palembang-tebing-tinggi-empat-lawang',
  'danau-ranau-palembang': '/blog/perjalanan-palembang-danau-ranau-wisata',
  'kuala-tungkal-palembang': '/blog/travel-palembang-kuala-tungkal-lintas-provinsi',
  'muara-beliti-palembang': '/blog/travel-palembang-muara-beliti',
  'talang-padang-palembang': '/blog/travel-palembang-talang-padang',
  'tugumulyo-palembang': '/blog/travel-palembang-tugumulyo',

  // Rute non-Palembang (lintas kota)
  'jambi-bangko': '/blog/travel-jambi-bangko-door-to-door',
  'muara-bulian-jambi-palembang': '/blog/travel-palembang-muara-bulian-perjalanan-dinas',
};

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
    const routeKey = `${fromSlug}-${toSlug}`;
    
    // Arahkan autolink ke artikel blog (yang terindeks Google) bila tersedia,
    // fallback ke halaman rute /[from]/[to].
    const url = ROUTE_BLOG_MAP[routeKey] ?? `/${fromSlug}/${toSlug}`;
    
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
