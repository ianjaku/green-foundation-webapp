
export const showDataCenterInfoBox = (
  selector,
  title,
  rows, // format: [{label: string, value: string, onClink?: () => void }]
) => {
  const el = document.querySelector(selector);

  const titleEl = el.querySelector(".data-center__title");
  titleEl.innerHTML = title;

  const rowsEl = el.querySelector(".data-center__rows");
  const rowsHtml = rows.map(row => `
    <div class="data-center__row">
      <div class="data-center__label">
        ${row.label}
      </div>
      <div class="data-center__value" id="regionName">
        ${row.onClick ? `<a href="#" class="data-center__link" data-label="${row.label}">` : ''}
          ${row.value}
          ${row.improvement ? ` <span class="data-center__improvement">(${row.improvement})</span>` : ''}
        ${row.onClick ? '</a>' : ''}
      </div>
    </div>
  `);
  rowsEl.innerHTML = rowsHtml.join("\n");

  rowsEl.querySelectorAll(".data-center__link").forEach(el => {
    const label = el.dataset.label;
    const row = rows.find(row => row.label === label);
    el.addEventListener("click", e => {
      e.preventDefault();
      row?.onClick();
    });
  });

  el.classList.add("data-center--active");
}

export const hideDataCenterInfoBox = (selector) => {
  const el = document.querySelector(selector);
  el.classList.remove("data-center--active");
}
