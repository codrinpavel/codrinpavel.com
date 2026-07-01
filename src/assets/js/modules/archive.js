(() => {
  const work = document.querySelector(".archive");
  if (!work) return;

  const rows = [...work.querySelectorAll("ul > li")];
  const header = rows[0];
  const items = rows.slice(1);

  const headerCells = header.querySelectorAll("span");
  const defaults = [...headerCells].map(cell => cell.textContent);

  const getCells = row => {
    const target = row.querySelector("a") || row;
    return [...target.querySelectorAll("span")];
  };

  const normalize = text => text.trim().replace(/\s+/g, " ");

  const data = items.map(row => {
    const cells = getCells(row);
    const clientCell = cells[1];

    const project = normalize(cells[0]?.textContent || "");
    const client = normalize(clientCell?.dataset.client || "");
    const year = Number(normalize(cells[2]?.textContent || ""));
    const hasCaseStudy = !!row.querySelector("a[href^='/work/']");

    return { row, project, client, year, hasCaseStudy };
  });

  const byClient = data.reduce((map, item) => {
    if (!map.has(item.client)) map.set(item.client, []);
    map.get(item.client).push(item);
    return map;
  }, new Map());

  const setHeader = item => {
    const group = byClient.get(item.client) || [item];
    const years = group.map(entry => entry.year).filter(Boolean);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const count = group.length;
    const hasCaseStudy = group.some(entry => entry.hasCaseStudy);

    headerCells[0].textContent = `${count === 1 ? "Single Project" : `${count} Projects`}`;
    headerCells[1].textContent = item.client;
    headerCells[2].textContent =
      minYear === maxYear
        ? `${maxYear}`
        : `${minYear}–${maxYear}`;

    work.dataset.hovering = "true";
    work.dataset.client = item.client;
  };

  const resetHeader = () => {
    headerCells.forEach((cell, index) => {
      cell.textContent = defaults[index];
    });

    delete work.dataset.hovering;
    delete work.dataset.client;
  };

  data.forEach(item => {
    item.row.addEventListener("mouseenter", () => setHeader(item));
    item.row.addEventListener("focusin", () => setHeader(item));
  });

  work.addEventListener("mouseleave", resetHeader);
  work.addEventListener("focusout", event => {
    if (!work.contains(event.relatedTarget)) resetHeader();
  });
})();