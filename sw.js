// Utilisation sans connexion.
// À chaque visite avec internet, la page charge la dernière version et la garde en réserve.
// Sans internet, c'est cette réserve qui s'affiche.
const CACHE = "super-pouvoirs-v41";
const FILES = [
  "./", "index.html", "style.css", "app.js", "jeux.js", "contenu.js", "personnages.js",
  "fonts/fonts.css", "fonts/bagel-fat-one-latin-1.woff2", "fonts/bagel-fat-one-latin-ext-0.woff2",
  "fonts/bricolage-grotesque-latin-1.woff2", "fonts/bricolage-grotesque-latin-ext-0.woff2",
  "fonts/nunito-latin-1.woff2", "fonts/nunito-latin-ext-0.woff2",
  "audio/wintery-loop.mp4", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-180.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // Réseau d'abord (toujours la dernière version), réserve ensuite (sans connexion).
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match("index.html")))
  );
});
