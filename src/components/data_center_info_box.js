
export const showDataCenterInfoBox = (
  title,
  rows, // format: [{label: string, value: string, onClink?: () => void }]
) => {
  const el = document.querySelector(".data-center");

  const titleEl = el.querySelector(".data-center__title");
  titleEl.innerHTML = title;

  const rowsEl = el.querySelector(".data-center__rows");
  const rowsHtml = rows.map(row => `
    <div class="data-center__row">
      <div class="data-center__label">
        ${row.label}
      </div>
      <div class="data-center__value" id="regionName">
        ${row.value}
      </div>
    </div>
  `);
  rowsEl.innerHTML = rowsHtml.join("\n");

  el.classList.add("data-center--active");
}

export const hideDataCenterInfoBox = () => {
  el.classList.remove(".data-center--active");
}
