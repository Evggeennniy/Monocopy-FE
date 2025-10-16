export function setThemeColor(color) {
  let meta = document.querySelector("meta[name=theme-color]");
  if (meta) meta.setAttribute("content", color);
  else {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = color;
    document.head.appendChild(meta);
  }
}
