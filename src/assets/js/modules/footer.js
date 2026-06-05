//const footer = document.querySelector(".site-footer");
//const main = document.querySelector("main");
//
//function updateFooterMode() {
//  if (!footer || !main) return;
//
//  footer.style.position = "";
//  main.style.marginBottom = `0`;
//
//  const footerHeight = footer.offsetHeight;
//  const viewportHeight = window.innerHeight;
//
//  if (footerHeight <= viewportHeight) {
//    footer.style.position = "fixed";
//    main.style.marginBottom = `${footerHeight}px`;
//  }
//}
//
//updateFooterMode();
//window.addEventListener("resize", updateFooterMode);