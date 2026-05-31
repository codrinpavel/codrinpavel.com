function createWaveAnimation(selector, options = {}) {
  const settings = {
    stagger: 20,
    duration: 700,
    distance: "1em",
    ...options
  };

  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);

    // read delay from html attribute
    const baseDelay = Number(el.dataset.delay || 0);

    el.innerHTML = words
      .map((word, i) => {
        const delay = baseDelay + i * settings.stagger;

        return `
            <span class="overflow-hidden">
              <span
                class="wave-word"
                style="
                  --wave-duration:${settings.duration}ms;
                  --wave-distance:${settings.distance};
                  --word-delay:${delay}ms;
                "
              >${word}&nbsp;</span>
            </span>`;
      })
      .join("");
  });
}

createWaveAnimation(".animate-wave");