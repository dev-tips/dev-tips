/* Deobfuscator */
const obfuscated = document.querySelectorAll('.obfuscated');

for (let i = 0; i < obfuscated.length; i += 1) {
  const node = obfuscated[i];
  const address = node.textContent
    .replace(/ AT /g, '@')
    .replace(/ DOT /g, '.')
    .toLowerCase();
  node.innerHTML = `<a href="mailto:${address}">${address}</a>`;
}

/* Lazy Loading */
const observer = lozad('.image img, .gallery img, .author img');
observer.observe();
