/**
 * https://mdn.github.io/dom-examples/view-transitions/mpa-chapter-nav-multiple-transition-types/index.html
 * https://github.com/mdn/dom-examples/blob/main/view-transitions/mpa-chapter-nav-multiple-transition-types/index.js
 */
const VT_KEY = "view-transition";


// logo
function isHomeUrl(url) {
  return getPageKey(url) === "/";
}

function determineLogoTransitionType(fromUrl, toUrl) {
  const fromHome = isHomeUrl(fromUrl);
  const toHome = isHomeUrl(toUrl);

  console.log(fromHome !== toHome)

  if (fromHome !== toHome) return "logo-skip";

  return undefined;
}


// backwards / forwards
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
  return to < from ? "backwards" : "forwards";
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
    determineTransitionType(fromUrl, toUrl) ?? "forwards"
  );
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const link = target.closest("a[data-transition]");
  if (!link) return;

  storeTransitionOverride(link.dataset.transition, link.href);
});

window.addEventListener("pageswap", (event) => {
  console.log("pageswap");
  if (!event.viewTransition || !event.activation) return;

  const fromUrl = event.activation.from.url;
  const toUrl = event.activation.entry.url;
  const type = getTransitionType(fromUrl, toUrl);
  const logoType = determineLogoTransitionType(fromUrl, toUrl);

  console.log(type);
  event.viewTransition.types.add(type);

  if (logoType) event.viewTransition.types.add(logoType);
});

window.addEventListener("pagereveal", (event) => {
  console.log("pagereveal");
  if (!event.viewTransition || !navigation.activation) return;

  const fromUrl = navigation.activation.from.url;
  const toUrl = navigation.activation.entry.url;
  const type = getTransitionType(fromUrl, toUrl);
  const logoType = determineLogoTransitionType(fromUrl, toUrl);

  console.log(type);
  event.viewTransition.types.add(type);

  if (logoType) event.viewTransition.types.add(logoType);

  clearTransitionOverride();
});



