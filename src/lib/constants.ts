export const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
];

export const TAGS_TO_REMOVE = [
  'head',
  'script', 
  'style',
  'noscript',
  'link',
  'svg',
  'iframe',
  'link[rel="stylesheet"]',
  'meta[name="description"]',
  'meta[name="keywords"]',
  'meta[name="robots"]',
  'meta[name="author"]',
  'meta[name="generator"]',
  'meta[name="copyright"]',
  'meta[name="language"]',
  'meta[name="distribution"]'
];

export const ATTRIBUTES_TO_REMOVE = [
  'id',
  'class', 
  'style',
  'aria-label',
  'aria-hidden',
  'data-*',
  'role',
  'tabindex',
  'title',
  'alt',
  'target',
  'rel',
  'onclick',
  'onload',
  'onerror',
  'aria-*'
];

export const ARGS_CHROME = [
  '--disable-blink-features=AutomationControlled',
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-infobars',
  '--window-position=0,0',
  '--ignore-certifcate-errors',
  '--ignore-certifcate-errors-spki-list',
]

export const EXTRA_HTTP_HEADERS = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Cache-Control': 'max-age=0'
}