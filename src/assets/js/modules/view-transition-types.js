/**
 * https://mdn.github.io/dom-examples/view-transitions/mpa-chapter-nav-multiple-transition-types/index.html
 * https://github.com/mdn/dom-examples/blob/main/view-transitions/mpa-chapter-nav-multiple-transition-types/index.js
 */
const VT_KEY = "view-transition";

function getPageKey(url) {
  const pathname = new URL(url, location.href).pathname;
  const segments = pathname.split("/").filter(Boolean);

  return segments.length === 0 ? "/" : `/${segments.at(-1)}/`;
}

function getOrder(url) {
  return window.PAGE_ORDER?.[getPageKey(url)];
}

function determineTransitionType(fromUrl, toUrl) {
  const from = getOrder(fromUrl);
  const to = getOrder(toUrl);

  if (from == null || to == null) return undefined;
  return to > from ? "forwards" : "backwards";
}

function storeTransitionOverride(type, toUrl) {
  if (!type) return;

  sessionStorage.setItem(
    VT_KEY,
    JSON.stringify({
      type,
      from: location.href,
      to: toUrl,
      time: Date.now(),
    })
  );
}

function readTransitionOverride() {
  try {
    const record = JSON.parse(sessionStorage.getItem(VT_KEY) || "null");

    if (!record) return undefined;
    if (Date.now() - record.time > 5000) return undefined;

    return record.type;
  } catch {
    return undefined;
  }
}

function clearTransitionOverride() {
  sessionStorage.removeItem(VT_KEY);
}

function getTransitionType(fromUrl, toUrl) {
  return (
    readTransitionOverride() ??
    determineTransitionType(fromUrl, toUrl) ??
    "forwards"
  );
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-transition]");
  if (!link) return;

  storeTransitionOverride(link.dataset.transition, link.href);
});

window.addEventListener("pageswap", (event) => {
  if (!event.viewTransition || !event.activation) return;
  const type = getTransitionType(event.activation.from.url,event.activation.entry.url);

  console.log("pageswap",type);
  event.viewTransition.types.add(type);
});

window.addEventListener("pagereveal", (event) => {
  if (!event.viewTransition || !navigation.activation) return;
  const type = getTransitionType(navigation.activation.from.url,navigation.activation.entry.url);

  console.log("pagereveal",type);
  event.viewTransition.types.add(type);
  clearTransitionOverride();
});