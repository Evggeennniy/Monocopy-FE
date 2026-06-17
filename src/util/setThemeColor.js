export default function setThemeColor(color) {
  document.documentElement.style.background = color;
  let resolved = color;
  if (color.startsWith("var(")) {
    const name = color.match(/var\(([^)]+)\)/)?.[1]?.trim();
    if (name) {
      resolved = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }
  }
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.content = resolved;
}
