
export const showStackInfoBox = (
  title,
  rows, // format: [{label: string, value: string, onClink?: () => void }]
) => {
  const el = document.querySelector(".stack");

  const titleEl = el.querySelector(".stack__title");
  titleEl.innerHTML = title;

  const rowsEl = el.querySelector(".stack__rows");
  const rowsHtml = rows.map(row => `
    <div class="stack__row">
      <div class="stack__label">
        ${row.label}
      </div>
      <div class="stack__value" id="regionName">
        ${row.value}
      </div>
    </div>
  `);
  rowsEl.innerHTML = rowsHtml.join("\n");

  el.classList.add("stack--active");
}

export const hideStackInfoBox = () => {
  const el = document.querySelector(".stack");
  el.classList.remove("stack--active");
}
