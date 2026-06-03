function createWaveAnimation(selector, options = {}) {
  const settings = {
    stagger: 20,
    duration: 700,
    distance: "1.15em",
    ...options,
  };

  const elements = document.querySelectorAll(selector);

  let i = 0;

  elements.forEach((el) => {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    const baseDelay = Number(el.dataset.delay || 0);

    el.innerHTML = words
      .map((word, wordIndex) => {
        const delay = baseDelay + wordIndex * settings.stagger;

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