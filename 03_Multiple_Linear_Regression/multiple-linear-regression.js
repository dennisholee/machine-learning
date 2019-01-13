// URL: https://beta.observablehq.com/@dennisholee/multiple-linear-regression
// Title: Multiple Linear Regression
// Author: dennisholee (@dennisholee)
// Version: 308
// Runtime version: 1

const m0 = {
  id: "5aec0f8a876eb95a@308",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Multiple Linear Regression`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `Following exercise is based on the following explanation http://reliawiki.org/index.php/Multiple_Linear_Regression_Analysis#Example`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md `
Multiple linear regression model with  predictor variables:

&nbsp;&nbsp;&nbsp;${tex`y_n = \beta_0 + \beta_1x_{n1} + + \beta_2x_{n2} + + \beta_nx_{nk} + \epsilon`}

Represented in matrix notation: 

&nbsp;&nbsp;&nbsp;${tex`y = X\beta + \epsilon`}

To calculate ${tex`\beta`}:

&nbsp;&nbsp;&nbsp;${tex`\widehat{\beta} = (X'X)X'y`}
`
)})
    },
    {
      inputs: ["table","data_raw"],
      value: (function(table,data_raw){return(
table(data_raw, { title: "Data", pageSize: 5 })
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md `
${tex`X`} is the independent variables column 0 and 1.

The dependent variable ${tex`y`} is column 2.
`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md `The vaue of ${tex`\widehat{\beta}`} is ${tex`(X'X)X'y`}`
)})
    },
    {
      name: "viewof beta_matrix_view",
      inputs: ["pt","math","beta_matrix"],
      value: (function(pt,math,beta_matrix){return(
pt(math.matrix(beta_matrix))
)})
    },
    {
      name: "beta_matrix_view",
      inputs: ["Generators","viewof beta_matrix_view"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md","tex","beta_matrix"],
      value: (function(md,tex,beta_matrix){return(
md`${tex`y_n =  ${beta_matrix[1][0]}x_{n1} + ${beta_matrix[2][0]}x_{n2} + ${beta_matrix[0][0]}`}`
)})
    },
    {
      inputs: ["md","tex","beta_matrix"],
      value: (function(md,tex,beta_matrix){return(
md`To calculate the prediction:

${tex`predict = (${beta_matrix[1][0]} * 47.3) + (${beta_matrix[2][0]} * 29.9) + ${beta_matrix[0][0]}`}


`
)})
    },
    {
      inputs: ["md","tex","predict"],
      value: (function(md,tex,predict){return(
md`${tex`predict = ${predict}`}`
)})
    },
    {
      name: "add",
      value: (function(){return(
(v1, v2) => {return v1 + v2}
)})
    },
    {
      name: "pt",
      inputs: ["tex"],
      value: (function(tex){return(
matrix => {
  const data = matrix.toArray().map(row => row.join(' & ')).join(' \\\\ ')
  const el = tex`
\left(\begin{matrix}
${data}
\end{matrix}\right)
`
  el.value = matrix
  return el
}
)})
    },
    {
      from: "@tmcw/tables/2",
      name: "table",
      remote: "table"
    },
    {
      name: "math",
      inputs: ["require"],
      value: (function(require){return(
require('https://unpkg.com/mathjs@5.0.1/dist/math.min.js')
)})
    },
    {
      name: "data_raw",
      value: (function(){return(
[
  [41.9,29.1,251.3],
  [43.4,29.3,251.3],
  [43.9,29.5,248.3],
  [44.5,29.7,267.5],
  [47.3,29.9,273],
  [47.5,30.3,276.5],
  [47.9,30.5,270.3],
  [50.2,30.7,274.9],
  [52.8,30.8,285],
  [53.2,30.9,290],
  [56.7,31.5,297],
  [57,31.7,302.5],
  [63.5,31.9,304.5],
  [65.3,32,309.3],
  [71.1,32.1,321.7],
  [77,32.5,330.7],
  [77.8,32.9,349]
]
)})
    },
    {
      name: "data",
      inputs: ["data_raw"],
      value: (function(data_raw){return(
data_raw.map(x => [1, x[0], x[1]])
)})
    },
    {
      name: "data_t",
      inputs: ["math","data"],
      value: (function(math,data){return(
math.transpose(data)
)})
    },
    {
      name: "y",
      inputs: ["data_raw"],
      value: (function(data_raw){return(
data_raw.map(x => [x[2]])
)})
    },
    {
      name: "beta_matrix",
      inputs: ["math","data_t","data","y"],
      value: (function(math,data_t,data,y)
{
  var something = math.multiply(data_t, data)
  var something2 = math.multiply(data_t, y)
  return math.multiply(math.inv(something), something2)
}
)
    },
    {
      name: "predict",
      inputs: ["beta_matrix","add"],
      value: (function(beta_matrix,add)
{
  var pred_data = [[47.3, 29.9]]
  var beta0 = beta_matrix[0][0]
  return beta0 + (beta_matrix.slice(1).map((x, i) => x[0] * pred_data[0][i]).reduce(add))
}
)
    }
  ]
};

const m1 = {
  id: "@tmcw/tables/2",
  variables: [
    {
      name: "table",
      inputs: ["detectColumns","html","leftIcon","rightIcon","searchIcon","header","search","style","row","recommendVerticalBorders"],
      value: (function(detectColumns,html,leftIcon,rightIcon,searchIcon,header,search,style,row,recommendVerticalBorders){return(
function table(inputData, options = {}) {
  let { page, pageSize, date, title, debug } = {
    pageSize: 15,
    page: 0,
    date: "day",
    title: "",
    debug: false,
    ...options
  };
  let first = true;
  let searching = false;
  let filters = {};
  let searchQuery = "";
  let adata = Array.from(inputData); // Normalize iterables to plain arrays.
  let detectedColumns = detectColumns(adata);
  let supercontainer = html`<div class='table-2'></div>`;

  function render() {
    let data;
    if (Object.keys(filters).length || searchQuery) {
      data = adata.filter(obj => {
        for (let [col, value] of Object.entries(filters)) {
          if (obj[col] !== value) return false;
        }
        if (searchQuery) {
          let strValue = "";
          for (let key of Object.keys(obj)) {
            strValue += obj[key];
          }
          if (!strValue.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
          }
        }
        return true;
      });
    } else {
      data = adata;
    }
    // If we're on page 5 and then filter and yield
    // fewer than 5 pages.
    if (page * pageSize > data.length) {
      page = Math.floor(data.length / pageSize);
    }
    let start = page * pageSize;
    let end = Math.min(data.length, (page + 1) * pageSize);
    let pageCount = Math.ceil(data.length / pageSize);
    let chunk = data.slice(start, end);
    let hasPrev = page > 0;
    let hasNext = end < data.length;

    let prevButton = html`<div title="Previous" class='button ${
      hasPrev ? "" : "disabled"
    }'>${leftIcon()}</div>`;
    let nextButton = html`<div title="Next" class='button ${
      hasNext ? "" : "disabled"
    }'>${rightIcon()}</div>`;
    prevButton.onclick = () => {
      page--;
      render();
    };
    nextButton.onclick = () => {
      page++;
      render();
    };
    let pageLinks = html`<div class='page-links'></div>`;
    if (pageCount < 5) {
      for (let i = 0; i < pageCount; i++) {
        let elem = html`<div class='${i === page ? "current" : ""}'>${i +
          1}</div>`;
        elem.onclick = () => {
          page = i;
          render();
        };
        pageLinks.appendChild(elem);
      }
    } else {
      const select = html`<div class='page-selector-container'><label for='page-selector'>Page</label> <select id='page-selector'>
    ${Array.from({ length: pageCount }, (_, i) => {
      let elem = html`<option value='${i}'>${i + 1}</option>`;
      return elem;
    })}
</select></div>`;
      select.querySelector("select").value = page;
      pageLinks.appendChild(select);
      select.onchange = e => {
        page = parseInt(e.target.value, 10);
        render();
      };
    }
    let searchToggle = html`<div style='flex:auto;display:inline-flex;'><div title="Search / Filter" class='button'>${searchIcon()}</div></div>`;
    searchToggle.querySelector(".button").onclick = () => {
      searching = !searching;
      render();
    };
    let navigation = html`<div class='pager'>${searchToggle}
<div class='title'>${title}</div>
          ${pageLinks}
          ${prevButton}
          ${nextButton}
        </div>`;
    let tbody = html`<tbody></tbody>`;
    let table = html`<table>${header(detectedColumns)}${tbody}</table>`;
    let searchUI = searching
      ? search(adata, detectedColumns, filters, searchQuery)
      : "";
    let container = html`<div>
${searchUI}
${
      hasNext || hasPrev ? navigation : ""
    }<div class='scroll-zone'>${table}</div>${style()}</div>`;
    for (let d of chunk) {
      tbody.appendChild(row(d, detectedColumns, { date }));
    }

    if (searchUI) {
      searchUI.addEventListener("setfilters", e => {
        ({ filters, searchQuery } = e.target.value);
        render();
      });
      searchUI.addEventListener("closefilters", e => {
        ({ filters, searchQuery } = e.target.value);
        searching = false;
        render();
      });
    }

    supercontainer.innerHTML = "";
    supercontainer.appendChild(container);
    supercontainer.value = chunk;
    supercontainer.dispatchEvent(new CustomEvent("input"));

    if (first) {
      setTimeout(() => {
        // If the table wants to be wide, let it be wide and scrollable.
        if (supercontainer.querySelector("table").offsetWidth > 640) {
          supercontainer.classList.add("wide");
        }
        if (recommendVerticalBorders(supercontainer)) {
          supercontainer.classList.add("narrow-columns");
        }
      }, 0);
      first = false;
    }
  }
  render();
  return supercontainer;
}
)})
    },
    {
      name: "detectColumns",
      inputs: ["countDecimals"],
      value: (function(countDecimals){return(
function detectColumns(data) {
  let columns = new Map();
  for (let row of data) {
    for (let key in row) {
      if (columns.has(key)) continue;
      if (
        typeof row[key] === "object" &&
        row[key] !== null &&
        "html" in row[key]
      ) {
        columns.set(key, { type: "html" });
      } else {
        if (row[key] instanceof Date) {
          columns.set(key, { type: "date" });
        } else {
          columns.set(key, { type: typeof row[key] });
        }
      }
    }
  }
  for (let [key, { type }] of columns) {
    if (type === "number") {
      let decimalsRequired = 0;
      for (let row of data) {
        if (countDecimals(row[key]) > decimalsRequired) {
          decimalsRequired = countDecimals(row[key]);
        }
        if (decimalsRequired == 4) break;
      }
      columns.get(key).decimalsRequired = decimalsRequired;
    }
  }
  return [...columns.entries()];
}
)})
    },
    {
      name: "leftIcon",
      inputs: ["svg"],
      value: (function(svg){return(
() =>
  svg`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`
)})
    },
    {
      name: "rightIcon",
      inputs: ["svg"],
      value: (function(svg){return(
() =>
  svg`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`
)})
    },
    {
      name: "searchIcon",
      inputs: ["svg"],
      value: (function(svg){return(
() =>
  svg`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`
)})
    },
    {
      name: "header",
      inputs: ["html","th"],
      value: (function(html,th){return(
function header(detectedColumns) {
  return html`<thead>
    ${detectedColumns.map(th)}
  </thead>`;
}
)})
    },
    {
      name: "search",
      inputs: ["getDropdowns","html","xCircleIcon","dropdown"],
      value: (function(getDropdowns,html,xCircleIcon,dropdown){return(
function search(data, detectedColumns, filters, searchQuery) {
  let dropdowns = getDropdowns(data, detectedColumns);
  let filterContainer = html`<div class='filters'></div>`;

  let closeButton = html`<div title='Close' class='button'>${xCircleIcon()}</div>`;
  let query = html`<div class='query'>
<input type='search' autocomplete=off />
<button type=button>Search</button>
</div>`;
  let container = html`<div class='search'>
<div>
${query}
${filterContainer}
</div>
${closeButton}
</div>`;
  closeButton.onclick = () => {
    container.value = { filters: {}, searchQuery: "" };
    container.dispatchEvent(new CustomEvent("closefilters"));
  };

  let setSearchQuery = () => {
    searchQuery = query.querySelector("input").value;
    container.value = { filters, searchQuery };
    container.dispatchEvent(new CustomEvent("setfilters"));
  };
  query.querySelector("button").onclick = setSearchQuery;
  query.querySelector("input").onsearch = setSearchQuery;
  query.querySelector("input").value = searchQuery;
  [...dropdowns.entries()].map(([column, choices]) => {
    let d = dropdown(column, choices, filters);
    filterContainer.appendChild(d);
    d.addEventListener("setfilters", e => {
      e.stopPropagation();
      filters[column] = e.target.value;
      if (filters[column] === undefined) delete filters[column];
      container.value = { filters, searchQuery };
      container.dispatchEvent(new CustomEvent("setfilters"));
    });
  });
  return container;
}
)})
    },
    {
      name: "style",
      inputs: ["html","filterStyles"],
      value: (function(html,filterStyles){return(
() => html`<style>
.table-2.wide .scroll-zone {
  overflow-x: auto;
  max-width: 100%;
}
.table-2.narrow-columns td,
.table-2.narrow-columns th {
  border: 1px solid #eee;
  padding: 4px;
}
.table-2.narrow-columns th {
  background: #f9f9f9;
  border-right: 1px solid #eee;
}
.table-2.wide .pager {
  max-width: 100%;
}
.table-2 table th,
.table-2 table td {
  padding: 3px 0px;
}
.table-2 table th,
.table-2 table td {
  vertical-align: top;
}
.table-2 table td:not(:first-child),
.table-2 table th:not(:first-child) {
  padding-left: 4px;
}
.table-2 table thead th {
  text-transform: uppercase;
  font-weight:500;
}
.table-2 .pager .title {
  flex: auto;
  font-weight: 700;
}
.table-2 .pager {
  margin-bottom: 4px;
  box-sizing: border-box;
  border-bottom:1px solid #ccc;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  max-width: 640px;
  align-items: center;
  font-family: var(--sans-serif);
  justify-content: space-between;
}
.table-2 .pager .button.disabled {
  color: #ccc;
  pointer-events:none;
}
.table-2 .pager .button {
  display: inline-flex;
  align-items: center;
  color: #333;
}
.table-2 .pager .button:hover {
  color: #000;
  cursor: pointer;
}
.table-2 .pager select {
  font-family: var(--sans-serif);
}
.table-2 .pager .page-links {
  display: inline-flex;
  align-items: center;
}
.table-2 .pager .page-links div {
  padding: 2px 4px 2px 4px;
  cursor: pointer;
  color: #888;
}
.table-2 .pager .page-links div.current {
  padding: 2px 4px 0 4px;
  pointer-events: none;
  color: #000;
  border-bottom:2px solid #000;
}
.table-2 .pager .page-links .page-selector-container {
  padding: 4px 0;
}
${filterStyles}
</style>`
)})
    },
    {
      name: "row",
      inputs: ["html","td"],
      value: (function(html,td){return(
function row(data, detectedColumns, options) {
  return html`<tr>
    ${detectedColumns.map(column => td(data, column, options))}
  </tr>`;
}
)})
    },
    {
      name: "recommendVerticalBorders",
      value: (function(){return(
function recommendVerticalBorders(table) {
  let narrowCells = 0;
  for (let cell of table.querySelectorAll("tbody tr:first-child td")) {
    if (cell.offsetWidth < 50) narrowCells++;
    if (narrowCells > 8) return true;
  }
}
)})
    },
    {
      name: "countDecimals",
      value: (function(){return(
number =>
  Math.min((number.toString().split(".")[1] || "").length, 4)
)})
    },
    {
      name: "th",
      inputs: ["html","thStyles"],
      value: (function(html,thStyles){return(
function th([key, { type }]) {
  return html`<th style='${thStyles[type] || ""}'>${key}</th>`;
}
)})
    },
    {
      name: "getDropdowns",
      value: (function(){return(
function getDropdowns(inputData, detectedColumns) {
  let dropdowns = new Map();
  // Find columns with under 25 distinct values and
  // avoiding columns with string values over 100.
  for (let [column] of detectedColumns) {
    let uniqueValues = new Set();
    for (let row of inputData) {
      uniqueValues.add(row[column]);
      if (uniqueValues.size > 25) break;
      if (typeof row[column] === "string" && row[column].length > 100) break;
    }
    if (uniqueValues.size !== 26) {
      dropdowns.set(column, uniqueValues);
    }
  }
  let ret = new Map();
  for (let [column, choices] of dropdowns) {
    ret.set(
      column,
      [...choices].sort((a, b) => (typeof a === "string" ? b > a : b - a))
    );
  }
  return ret;
}
)})
    },
    {
      name: "xCircleIcon",
      inputs: ["svg"],
      value: (function(svg){return(
() =>
  svg`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`
)})
    },
    {
      name: "dropdown",
      inputs: ["idx","html"],
      value: (function(idx,html){return(
function dropdown(column, choices, filters) {
  choices = [...choices];
  let id = idx();
  let elem = html`<div class='search-dropdown'>
<label for='search-${id}'>${column}</label>
<select id='search-${id}'>
<option value='-1'></option>
${choices.map((choice, i) => html`<option value=${i}>${choice}</option>`)}
</select>
</div>`;
  if (filters[column] !== undefined) {
    elem.querySelector("select").value = choices.indexOf(filters[column]);
  }
  elem.querySelector("select").onchange = e => {
    elem.value = choices[e.target.value];
    elem.dispatchEvent(new CustomEvent("setfilters"));
  };
  return elem;
}
)})
    },
    {
      name: "filterStyles",
      value: (function(){return(
`
.search {
  padding:5px 0;
  font-family: var(--sans-serif);
  font-size: 80%;
  border-bottom:1px solid #ccc;
  max-width: 640px;
  display: flex;
  justify-content: space-between;
}
.search .search-dropdown select {
  font-family: var(--sans-serif);
}
.search .search-dropdown {
  padding-right:10px;
}
.search .query {
  padding-bottom: 5px;
}
.search .filters {
  display: flex;
  flex-wrap: wrap;
}
.search .button {
  color: #aaa;
}
.search .button:hover {
  color: #000;
  cursor: pointer;
}
`
)})
    },
    {
      name: "td",
      inputs: ["basicDayFormat","basicYearFormat","html","tdStyles"],
      value: (function(basicDayFormat,basicYearFormat,html,tdStyles){return(
function td(data, [key, { type, decimalsRequired }], options) {
  let rep = data[key];
  if (rep === null) rep = "null";
  let title = "";
  if (type === "number") {
    rep = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalsRequired
    }).format(data[key]);
  }
  if (type === "date") {
    title = data[key].toLocaleString();
    switch (options.date) {
      case "day":
        rep = basicDayFormat(data[key]);
        break;
      case "year":
        rep = basicYearFormat(data[key]);
        break;
      case "full":
        rep = data[key].toLocaleString().toLowerCase();
        break;
    }
  }
  return html`<td title='${title}' style='${tdStyles[type] || ""}'>${rep}</td>`;
}
)})
    },
    {
      name: "thStyles",
      value: (function(){return(
{
  number: "text-align:right;"
}
)})
    },
    {
      name: "idx",
      value: (function(){return(
(() => {
  let i = 0;
  return () => ++i;
})()
)})
    },
    {
      name: "basicDayFormat",
      value: (function(){return(
d => {
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d
    .getDate()
    .toString()
    .padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}
)})
    },
    {
      name: "basicYearFormat",
      value: (function(){return(
d => {
  return d.getFullYear().toString();
}
)})
    },
    {
      name: "tdStyles",
      value: (function(){return(
{
  number: "text-align:right;font-variant-numeric:tabular-nums;",
  date: "font-variant-numeric:tabular-nums;"
}
)})
    }
  ]
};

const notebook = {
  id: "5aec0f8a876eb95a@308",
  modules: [m0,m1]
};

export default notebook;
