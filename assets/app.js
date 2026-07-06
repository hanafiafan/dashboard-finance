const money = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });
const pct = new Intl.NumberFormat("id-ID", { style: "percent", maximumFractionDigits: 1 });
const chartColors = ["#0f766e", "#2563eb", "#f9735b", "#f59e0b", "#7c3aed", "#16a34a", "#e11d48", "#0891b2", "#84cc16", "#d946ef"];

const app = {
  state: null,
  view: "command",
  entity: "budget",
  master: "users",
  charts: {},
  rows: {},
  modal: null,
  demo: location.protocol === "file:",
  lastError: "",
};

const entityLabels = {
  budget: "Budget Request",
  income: "Cash In Real",
  forecast: "Forecast Cash In",
  outcome: "Cash Out",
  omzet: "Omzet",
  bank: "Saldo Rekening",
  service: "Biaya Layanan",
  payables: "Hutang",
  receivables: "Piutang",
  users: "Users",
  brands: "Brands",
  sources: "Source Workbooks",
};

const tableColumns = {
  budget: ["Brand", "Tgl Pengajuan", "Tgl Dibutuhkan", "Kategori", "Keterangan", "Vendor", "Nominal Pengajuan (Rp)", "Nominal Dibayar (Rp)", "Sisa Hutang (Rp)", "Prioritas", "Status"],
  income: ["Brand", "Tanggal", "Keterangan", "Customer", "Nominal", "Bank Masuk"],
  forecast: ["Brand", "Estimasi Cair", "Marketplace", "Nominal Estimasi", "Status", "Catatan"],
  outcome: ["Brand", "Tanggal", "Keterangan", "Kategori", "Jumlah (Rp)", "Biaya (Rp)", "Total Pengeluaran (Rp)", "Bank Keluar"],
  omzet: ["Brand", "Tahun", "Bulan", "Target Omzet", "Realisasi Omzet", "Selisih", "Capaian"],
  bank: ["Brand", "Bank", "Saldo Awal", "Pemasukan", "Pengeluaran", "Total"],
  service: ["Brand", "Tanggal", "Keterangan", "Vendor", "Nominal", "Status"],
  payables: ["Brand", "Nama Pemasok", "Total Hutang", "Total Dibayar", "Sisa Hutang", "Progress %", "Status"],
  receivables: ["Brand", "Nama Pelanggan", "Total Piutang", "Total Diterima", "Sisa Piutang", "Progress %", "Status"],
  users: ["Email", "Name", "Role", "Company Scope", "Brand Scope", "Active"],
  brands: ["Company", "Brand", "Brand Key", "Active", "PIC Email"],
  sources: ["Company", "Brand", "Brand Key", "Spreadsheet ID", "Active", "Last Imported At"],
};

const forms = {
  budget: [
    field("Brand Key", "Brand", "brand"),
    field("Tgl Pengajuan", "Tgl Pengajuan", "date"),
    field("Tgl Dibutuhkan", "Tgl Dibutuhkan", "date"),
    field("Kategori", "Kategori", "select", "categories"),
    field("Keterangan", "Keterangan", "textarea"),
    field("Vendor", "Vendor", "text"),
    field("Nominal Pengajuan (Rp)", "Nominal Pengajuan", "number"),
    field("Nominal Dibayar (Rp)", "Nominal Dibayar", "number"),
    field("Jenis Bayar", "Jenis Bayar", "select", "paymentTypes"),
    field("Tgl Pembayaran Selanjutnya", "Tgl Pembayaran Selanjutnya", "date"),
    field("Tgl Pelunasan", "Tgl Pelunasan", "date"),
    field("Prioritas", "Prioritas", "select", "priorities"),
    field("Status", "Status", "select", "budgetStatuses"),
    field("Dokumen URL", "Dokumen URL", "url"),
    field("Form Feedback Finance", "Feedback Finance", "textarea"),
  ],
  income: [
    field("Brand Key", "Brand", "brand"),
    field("Tanggal", "Tanggal", "date"),
    field("Keterangan", "Keterangan", "text"),
    field("Customer", "Customer", "text"),
    field("Nominal", "Nominal", "number"),
    field("Bank Masuk", "Bank Masuk", "select", "banks"),
    field("Catatan", "Catatan", "textarea"),
  ],
  forecast: [
    field("Brand Key", "Brand", "brand"),
    field("Estimasi Cair", "Estimasi Cair", "date"),
    field("Marketplace", "Marketplace", "text"),
    field("Nominal Estimasi", "Nominal Estimasi", "number"),
    field("Status", "Status", "text"),
    field("Catatan", "Catatan", "textarea"),
  ],
  outcome: [
    field("Brand Key", "Brand", "brand"),
    field("Tanggal", "Tanggal", "date"),
    field("Keterangan", "Keterangan", "text"),
    field("Kategori", "Kategori", "select", "categories"),
    field("Jumlah (Rp)", "Jumlah", "number"),
    field("Biaya (Rp)", "Biaya", "number"),
    field("Bank Keluar", "Bank Keluar", "select", "banks"),
    field("Catatan", "Catatan", "textarea"),
  ],
  omzet: [
    field("Brand Key", "Brand", "brand"),
    field("Tahun", "Tahun", "number"),
    field("Bulan", "Bulan", "select", "months"),
    field("Target Omzet", "Target Omzet", "number"),
    field("Realisasi Omzet", "Realisasi Omzet", "number"),
  ],
  bank: [
    field("Brand Key", "Brand", "brand"),
    field("Bank", "Bank", "select", "banks"),
    field("Saldo Awal", "Saldo Awal", "number"),
    field("Pemasukan", "Pemasukan", "number"),
    field("Pengeluaran", "Pengeluaran", "number"),
  ],
  service: [
    field("Brand Key", "Brand", "brand"),
    field("Tanggal", "Tanggal", "date"),
    field("Keterangan", "Keterangan", "text"),
    field("Vendor", "Vendor", "text"),
    field("Nominal", "Nominal", "number"),
    field("Status", "Status", "text"),
    field("Catatan", "Catatan", "textarea"),
  ],
  payables: [
    field("Brand Key", "Brand", "brand"),
    field("Nama Pemasok", "Nama Pemasok", "text"),
    field("Total Hutang", "Total Hutang", "number"),
    field("Total Dibayar", "Total Dibayar", "number"),
    field("Status", "Status", "text"),
    field("Source", "Source", "text"),
  ],
  receivables: [
    field("Brand Key", "Brand", "brand"),
    field("Nama Pelanggan", "Nama Pelanggan", "text"),
    field("Total Piutang", "Total Piutang", "number"),
    field("Total Diterima", "Total Diterima", "number"),
    field("Status", "Status", "text"),
    field("Source", "Source", "text"),
  ],
  users: [
    field("Email", "Email", "email"),
    field("Name", "Name", "text"),
    field("Role", "Role", "select", "roles"),
    field("Company Scope", "Company Scope", "text"),
    field("Brand Scope", "Brand Scope", "text"),
    field("Active", "Active", "boolean"),
  ],
  brands: [
    field("Company", "Company", "text"),
    field("Brand", "Brand", "text"),
    field("Brand Key", "Brand Key", "text"),
    field("Active", "Active", "boolean"),
    field("PIC Email", "PIC Email", "email"),
  ],
  sources: [
    field("Company", "Company", "text"),
    field("Brand", "Brand", "text"),
    field("Brand Key", "Brand Key", "text"),
    field("Spreadsheet ID", "Spreadsheet ID", "text"),
    field("Active", "Active", "boolean"),
    field("Notes", "Notes", "textarea"),
  ],
};

document.addEventListener("DOMContentLoaded", init);

function field(key, label, type, optionsKey) {
  return { key, label, type, optionsKey };
}

function init() {
  loadState();
}

async function loadState() {
  try {
    app.state = await api("getAppState", [collectFilters()]);
    if (!app.state || !app.state.authorized) {
      app.lastError = app.state && app.state.message ? app.state.message : "";
      return renderLogin();
    }
    renderShell();
  } catch (error) {
    app.lastError = error.message || String(error);
    if (app.demo || location.protocol === "file:") {
      app.demo = true;
      app.state = demoState();
      return renderShell();
    }
    renderLogin();
  }
}

async function api(action, args = []) {
  if (app.demo) return demoApi(action, args);

  const userEmail = currentEmail();
  const loginCode = localStorage.getItem("financeDashboardLoginCode") || localStorage.getItem("financeJoyboardLoginCode") || "";
  const response = await fetch("/api/finance-api", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action, args, userEmail, loginCode }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) throw new Error(data.error || "Request gagal.");
  return data.result;
}

function currentEmail() {
  return localStorage.getItem("financeDashboardEmail") || localStorage.getItem("financeJoyboardEmail") || "";
}

function renderLogin() {
  const root = document.getElementById("app");
  root.className = "login-screen";
  root.innerHTML = `
    <section class="login-card">
      <div class="brand-mark">FD</div>
      <h1>Finance Dashboard</h1>
      <p>${escapeHtml(app.lastError || "Masuk untuk membuka dashboard finance.")}</p>
      <div class="demo-row">
        <input id="emailOverride" type="email" placeholder="email user">
        <input id="loginCode" type="password" placeholder="password">
      </div>
      <div class="login-actions">
        <button class="btn blue" onclick="loginOverride()"><i data-lucide="log-in"></i>Masuk</button>
        <button class="btn ghost" onclick="startDemo()"><i data-lucide="sparkles"></i>Preview Demo</button>
      </div>
    </section>
  `;
  paintIcons();
}

function loginOverride() {
  const email = document.getElementById("emailOverride").value.trim().toLowerCase();
  const loginCode = document.getElementById("loginCode").value.trim();
  if (!email) return showToast("Isi email user dulu.");
  if (!loginCode) return showToast("Isi password dulu.");
  localStorage.setItem("financeDashboardEmail", email);
  localStorage.setItem("financeDashboardLoginCode", loginCode);
  app.demo = false;
  loadState();
}

function startDemo() {
  app.demo = true;
  app.state = demoState();
  renderShell();
}

function renderShell() {
  const root = document.getElementById("app");
  const session = app.state.session || {};
  const appTitle = brandTitle(app.state.app && app.state.app.title);
  document.title = appTitle;
  root.className = "app-shell";
  root.innerHTML = `
    <aside class="sidebar">
      <div class="brand-lockup">
        <div class="brand-mark">FD</div>
        <div>
          <h1>${escapeHtml(appTitle)}</h1>
          <span>${escapeHtml(app.state.app.subtitle)}</span>
        </div>
      </div>
      <div class="account-card">
        <strong>${escapeHtml(session.name || currentEmail() || "Demo User")}</strong>
        <span class="role-pill"><i data-lucide="badge-check"></i>${escapeHtml(app.demo ? "demo" : session.role || "guest")}</span>
      </div>
      <nav class="nav">
        ${nav("command", "layout-dashboard", "Command")}
        ${nav("analytics", "chart-no-axes-combined", "Analytics")}
        ${nav("operations", "table-2", "Operasional")}
        ${nav("approval", "badge-check", "Approval")}
        ${nav("master", "settings-2", "Master")}
      </nav>
      <div class="side-footer">
        <button class="btn ghost" onclick="refreshAll()"><i data-lucide="refresh-cw"></i>Refresh</button>
        ${app.demo ? "" : `<button class="btn ghost" onclick="logout()"><i data-lucide="log-out"></i>Keluar</button>`}
        <div class="side-note">Updated: <span id="updatedAt">${formatDateTime(app.state.dashboard.generatedAt)}</span></div>
      </div>
    </aside>
    <main class="main">
      <div class="topbar">
        <div>
          <p class="eyebrow">Finance operating system</p>
          <h2 class="page-title" id="pageTitle"></h2>
        </div>
        <div class="top-actions">
          ${canApprove() ? `<button class="btn amber" onclick="importSources()"><i data-lucide="download-cloud"></i>Import</button>` : ""}
          <button class="btn ghost" onclick="exportCurrentCsv()"><i data-lucide="file-down"></i>CSV</button>
          <button class="btn blue" onclick="refreshAll()"><i data-lucide="refresh-cw"></i>Refresh</button>
        </div>
      </div>
      <section class="filter-band">
        <div class="field"><label>Company</label><select id="companyFilter"></select></div>
        <div class="field"><label>Brand</label><select id="brandFilter"></select></div>
        <div class="field"><label>Dari tanggal</label><input id="startDate" type="date"></div>
        <div class="field"><label>Sampai tanggal</label><input id="endDate" type="date"></div>
        <div class="field"><label>Tahun</label><input id="yearFilter" type="number" min="2020" max="2100" placeholder="2026"></div>
      </section>
      <section id="view-command" class="view"></section>
      <section id="view-analytics" class="view"></section>
      <section id="view-operations" class="view"></section>
      <section id="view-approval" class="view"></section>
      <section id="view-master" class="view"></section>
    </main>
  `;
  populateFilters();
  renderView();
  paintIcons();
}

function nav(view, icon, label) {
  return `<button class="${app.view === view ? "active" : ""}" onclick="switchView('${view}')"><i data-lucide="${icon}"></i>${label}</button>`;
}

function populateFilters() {
  const company = document.getElementById("companyFilter");
  const brand = document.getElementById("brandFilter");
  if (!company || !brand) return;
  const filters = app.state.dashboard.filters || {};
  company.innerHTML = `<option value="">Semua company</option>${(app.state.options.companies || []).map(item => `<option value="${escapeAttr(item)}">${escapeHtml(item)}</option>`).join("")}`;
  brand.innerHTML = `<option value="">Semua brand</option>${(app.state.brands || []).map(item => `<option value="${escapeAttr(item["Brand Key"])}">${escapeHtml(item.Brand)}</option>`).join("")}`;
  company.value = filters.company || "";
  brand.value = filters.brandKey || "";
  document.getElementById("startDate").value = filters.startDate || "";
  document.getElementById("endDate").value = filters.endDate || "";
  document.getElementById("yearFilter").value = filters.year || "";
  ["companyFilter", "brandFilter", "startDate", "endDate", "yearFilter"].forEach(id => document.getElementById(id).addEventListener("change", refreshAll));
}

function switchView(view) {
  app.view = view;
  renderView();
}

function renderView() {
  document.querySelectorAll(".view").forEach(item => item.classList.remove("active"));
  document.querySelectorAll(".nav button").forEach(item => item.classList.toggle("active", item.getAttribute("onclick").includes(`'${app.view}'`)));
  const target = document.getElementById(`view-${app.view}`);
  if (!target) return;
  target.classList.add("active");
  const titles = {
    command: "Command center",
    analytics: "Analytics board",
    operations: "Operasional harian",
    approval: "Approval finance",
    master: "Master data",
  };
  document.getElementById("pageTitle").textContent = titles[app.view];
  if (app.view === "command") renderCommand();
  if (app.view === "analytics") renderAnalytics();
  if (app.view === "operations") renderOperations();
  if (app.view === "approval") renderApproval();
  if (app.view === "master") renderMaster();
  paintIcons();
}

function renderCommand() {
  const d = app.state.dashboard;
  const s = d.summary;
  document.getElementById("view-command").innerHTML = `
    <div class="metric-grid">
      ${metric("Cash In", money.format(s.cashIn), "blue", "Real income", "trending-up")}
      ${metric("Cash Out", money.format(s.cashOut), "coral", "Pengeluaran berjalan", "trending-down")}
      ${metric("Net Cash", money.format(s.netCash), s.netCash >= 0 ? "green" : "rose", "Cash in - cash out", "wallet")}
      ${metric("Saldo Rekening", money.format(s.bankBalance), "teal", "Bank dan kas aktif", "landmark")}
      ${metric("Budget Request", money.format(s.budgetRequested), "violet", "Total pengajuan", "clipboard-list")}
      ${metric("Pending Approval", number.format(s.pendingApproval), "amber", "Menunggu finance", "timer")}
      ${metric("Outstanding Hutang", money.format(s.payableOutstanding), "rose", "Sisa kewajiban", "receipt")}
      ${metric("Capaian Omzet", pct.format(s.omzetAchievement || 0), "cyan", `${money.format(s.omzetReal)} / ${money.format(s.omzetTarget)}`, "target")}
    </div>
    <div class="brand-strip">${brandCards(d.charts.brandPerformance || [])}</div>
    <div class="grid-2">
      ${panel("Tren cashflow", "Cash in, cash out, forecast, dan net cash", "cashflowChart", "tall")}
      ${panel("Status budget", "Komposisi approval", "budgetStatusChart")}
    </div>
    <div class="grid-3">
      ${panel("Budget kategori", "Nominal pengajuan", "budgetCategoryChart")}
      ${panel("Outcome kategori", "Total pengeluaran", "outcomeCategoryChart")}
      ${panel("Aging hutang", "Sisa hutang per bucket", "agingChart")}
    </div>
    <div class="grid-2">
      ${quickTable("Antrian approval", d.tables.pendingBudget, ["Brand", "Tgl Pengajuan", "Kategori", "Keterangan", "Nominal Pengajuan (Rp)", "Prioritas", "Status"])}
      ${quickTable("Jatuh tempo dekat", d.tables.dueSoon, ["Brand", "Tgl Dibutuhkan", "Tgl Pembayaran Selanjutnya", "Vendor", "Sisa Hutang (Rp)", "Status"])}
    </div>
  `;
  drawCommandCharts();
}

function renderAnalytics() {
  const d = app.state.dashboard;
  document.getElementById("view-analytics").innerHTML = `
    <div class="grid-2">
      ${panel("Performa brand", "Cash in, cash out, budget", "brandPerformanceChart", "tall")}
      ${panel("Saldo rekening", "Posisi bank dan kas", "bankChart", "tall")}
    </div>
    <div class="grid-2">
      ${panel("Omzet bulanan", "Target vs realisasi", "omzetChart", "tall")}
      ${panel("Prioritas budget", "Komposisi urgency", "priorityChart")}
    </div>
    <div class="grid-3">
      ${quickTable("Cash in terbaru", d.tables.recentIncome, ["Brand", "Tanggal", "Keterangan", "Customer", "Nominal", "Bank Masuk"])}
      ${quickTable("Cash out terbaru", d.tables.recentOutcome, ["Brand", "Tanggal", "Keterangan", "Kategori", "Total Pengeluaran (Rp)", "Bank Keluar"])}
      ${quickTable("Saldo rekening", d.tables.bank, ["Brand", "Bank", "Saldo Awal", "Pemasukan", "Pengeluaran", "Total"])}
    </div>
  `;
  drawAnalyticsCharts();
}

function renderOperations() {
  const entities = ["budget", "income", "forecast", "outcome", "omzet", "bank", "service", "payables", "receivables"].filter(name => app.state.entities[name]);
  if (!entities.includes(app.entity)) app.entity = entities[0] || "budget";
  const entity = app.state.entities[app.entity] || { label: entityLabels[app.entity], canEdit: false };
  document.getElementById("view-operations").innerHTML = `
    <div class="segmented">${entities.map(name => `<button class="${app.entity === name ? "active" : ""}" onclick="setEntity('${name}')">${escapeHtml(entityLabels[name])}</button>`).join("")}</div>
    <div class="panel tight">
      <div class="panel-head">
        <div><h3>${escapeHtml(entity.label || entityLabels[app.entity])}</h3><p id="entityMeta">Memuat data...</p></div>
        <div class="row-actions">${entity.canEdit ? `<button class="btn blue" onclick="openModal('${app.entity}')"><i data-lucide="plus"></i>Tambah</button>` : ""}</div>
      </div>
      <div class="table-toolbar">
        <input id="entitySearch" placeholder="Cari data..." oninput="renderEntityTable()">
        <button class="btn ghost" onclick="exportRows('${app.entity}')"><i data-lucide="file-down"></i>Export</button>
      </div>
      <div id="entityTable" class="table-wrap"><div class="empty">Memuat data...</div></div>
    </div>
  `;
  loadRows(app.entity, "entity");
}

function renderApproval() {
  const rows = app.state.dashboard.tables.pendingBudget || [];
  document.getElementById("view-approval").innerHTML = `
    <div class="grid-2">
      <div class="panel tight">
        <div class="panel-head"><div><h3>Antrian approval</h3><p>${number.format(rows.length)} budget request</p></div></div>
        <div class="table-wrap">${approvalTable(rows)}</div>
      </div>
      ${panel("Prioritas request", "High, medium, low", "approvalPriorityChart")}
    </div>
  `;
  doughnut("approvalPriorityChart", app.state.dashboard.charts.priority || []);
}

function renderMaster() {
  const entities = ["users", "brands", "sources"].filter(name => app.state.entities[name]);
  if (!entities.length) {
    document.getElementById("view-master").innerHTML = quickTable("Brand scope", app.state.brands, ["Company", "Brand", "Brand Key", "PIC Email"]);
    return;
  }
  if (!entities.includes(app.master)) app.master = entities[0];
  const entity = app.state.entities[app.master] || { label: entityLabels[app.master], canEdit: false };
  document.getElementById("view-master").innerHTML = `
    <div class="segmented">${entities.map(name => `<button class="${app.master === name ? "active" : ""}" onclick="setMaster('${name}')">${escapeHtml(entityLabels[name])}</button>`).join("")}</div>
    <div class="panel tight">
      <div class="panel-head">
        <div><h3>${escapeHtml(entity.label || entityLabels[app.master])}</h3><p id="masterMeta">Memuat data...</p></div>
        <div class="row-actions">${entity.canEdit ? `<button class="btn blue" onclick="openModal('${app.master}')"><i data-lucide="plus"></i>Tambah</button>` : ""}</div>
      </div>
      <div class="table-toolbar">
        <input id="masterSearch" placeholder="Cari master..." oninput="renderMasterTable()">
        <button class="btn ghost" onclick="exportRows('${app.master}')"><i data-lucide="file-down"></i>Export</button>
      </div>
      <div id="masterTable" class="table-wrap"><div class="empty">Memuat data...</div></div>
    </div>
  `;
  loadRows(app.master, "master");
}

async function loadRows(entity, target) {
  try {
    const result = await api("getRecords", [entity, collectFilters()]);
    app.rows[entity] = result.rows || [];
    if (target === "entity") renderEntityTable();
    if (target === "master") renderMasterTable();
  } catch (error) {
    showToast(error.message || error);
  }
}

function renderEntityTable() {
  const rows = filterRows(app.rows[app.entity] || [], document.getElementById("entitySearch")?.value || "");
  document.getElementById("entityMeta").textContent = `${number.format(rows.length)} data`;
  document.getElementById("entityTable").innerHTML = table(app.entity, rows, app.state.entities[app.entity]?.canEdit);
  paintIcons();
}

function renderMasterTable() {
  const rows = filterRows(app.rows[app.master] || [], document.getElementById("masterSearch")?.value || "");
  document.getElementById("masterMeta").textContent = `${number.format(rows.length)} data`;
  document.getElementById("masterTable").innerHTML = table(app.master, rows, app.state.entities[app.master]?.canEdit);
  paintIcons();
}

function table(entity, rows, canEdit) {
  const cols = tableColumns[entity] || [];
  if (!rows.length) return `<div class="empty">Belum ada data.</div>`;
  return `<table><thead><tr>${cols.map(col => `<th>${escapeHtml(col)}</th>`).join("")}${canEdit ? "<th>Aksi</th>" : ""}</tr></thead><tbody>
    ${rows.map((row) => `<tr>
      ${cols.map(col => `<td>${formatCell(col, row[col])}</td>`).join("")}
      ${canEdit ? `<td><div class="row-actions"><button class="icon-btn" onclick="openModal('${entity}', '${escapeAttr(row.ID || row["Brand Key"] || row.Email || "")}')" title="Edit"><i data-lucide="pencil"></i></button>${row.ID ? `<button class="icon-btn" onclick="deleteRow('${entity}', '${escapeAttr(row.ID)}')" title="Hapus"><i data-lucide="trash-2"></i></button>` : ""}</div></td>` : ""}
    </tr>`).join("")}
  </tbody></table>`;
}

function quickTable(title, rows = [], cols = []) {
  return `<div class="panel tight">
    <div class="panel-head"><div><h3>${escapeHtml(title)}</h3><p>${number.format(rows.length)} data</p></div></div>
    <div class="table-wrap">${rows.length ? `<table><thead><tr>${cols.map(col => `<th>${escapeHtml(col)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${cols.map(col => `<td>${formatCell(col, row[col])}</td>`).join("")}</tr>`).join("")}</tbody></table>` : `<div class="empty">Tidak ada data.</div>`}</div>
  </div>`;
}

function approvalTable(rows) {
  if (!rows.length) return `<div class="empty">Tidak ada antrian approval.</div>`;
  const cols = ["Brand", "Tgl Pengajuan", "Tgl Dibutuhkan", "Kategori", "Keterangan", "Nominal Pengajuan (Rp)", "Prioritas", "Status"];
  return `<table><thead><tr>${cols.map(col => `<th>${escapeHtml(col)}</th>`).join("")}${canApprove() ? "<th>Aksi</th>" : ""}</tr></thead><tbody>
    ${rows.map(row => `<tr>${cols.map(col => `<td>${formatCell(col, row[col])}</td>`).join("")}${canApprove() ? `<td><div class="row-actions">
      <button class="icon-btn" onclick="approve('${escapeAttr(row.ID)}', 'Approved')" title="Approve"><i data-lucide="check"></i></button>
      <button class="icon-btn" onclick="approve('${escapeAttr(row.ID)}', 'Need Revision')" title="Revisi"><i data-lucide="rotate-ccw"></i></button>
      <button class="icon-btn" onclick="approve('${escapeAttr(row.ID)}', 'Rejected')" title="Tolak"><i data-lucide="x"></i></button>
    </div></td>` : ""}</tr>`).join("")}
  </tbody></table>`;
}

function metric(label, value, color, note, icon) {
  return `<div class="metric ${color}"><span><i data-lucide="${icon}"></i>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(note)}</small></div>`;
}

function panel(title, note, id, size = "") {
  return `<div class="panel"><div class="panel-head"><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(note)}</p></div></div><div class="chart-box ${size}"><canvas id="${id}"></canvas></div></div>`;
}

function brandCards(items) {
  if (!items.length) return `<div class="brand-card"><b>Belum ada brand</b><span>Data kosong</span><div class="bar-meter"><i style="width:0%"></i></div></div>`;
  return items.slice(0, 10).map(item => {
    const ach = Math.max(0, Math.min(1, Number(item.omzetAchievement || 0)));
    return `<div class="brand-card"><b>${escapeHtml(item.label)}</b><span>Net cash ${money.format(item.netCash || 0)}</span><div class="bar-meter"><i style="width:${Math.round(ach * 100)}%"></i></div></div>`;
  }).join("");
}

function drawCommandCharts() {
  const d = app.state.dashboard.charts;
  combo("cashflowChart", d.monthlyCashFlow || [], ["cashIn", "cashOut", "forecastIn", "netCash"], ["Cash In", "Cash Out", "Forecast", "Net Cash"]);
  doughnut("budgetStatusChart", d.budgetStatus || []);
  bar("budgetCategoryChart", d.budgetByCategory || []);
  bar("outcomeCategoryChart", d.outcomeByCategory || []);
  bar("agingChart", d.payableAging || []);
}

function drawAnalyticsCharts() {
  const d = app.state.dashboard.charts;
  chart("brandPerformanceChart", "bar", {
    labels: (d.brandPerformance || []).map(x => x.label),
    datasets: [
      ds("Cash In", (d.brandPerformance || []).map(x => x.cashIn), "#2563eb"),
      ds("Cash Out", (d.brandPerformance || []).map(x => x.cashOut), "#f9735b"),
      ds("Budget", (d.brandPerformance || []).map(x => x.budget), "#7c3aed"),
    ],
  });
  bar("bankChart", d.bankBalance || [], true);
  chart("omzetChart", "bar", {
    labels: (d.omzetByMonth || []).map(x => x.label),
    datasets: [
      ds("Target", (d.omzetByMonth || []).map(x => x.target), "#0f766e"),
      ds("Realisasi", (d.omzetByMonth || []).map(x => x.real), "#2563eb"),
    ],
  });
  doughnut("priorityChart", d.priority || []);
}

function combo(id, rows, fields, labels) {
  chart(id, "bar", {
    labels: rows.map(x => x.label),
    datasets: fields.map((field, index) => ds(labels[index], rows.map(x => x[field] || 0), chartColors[index], field === "netCash" ? "line" : undefined)),
  });
}

function bar(id, series, horizontal = false) {
  chart(id, "bar", {
    labels: series.map(x => x.label),
    datasets: [ds("Nilai", series.map(x => x.value), chartColors)],
  }, horizontal ? { indexAxis: "y" } : {});
}

function doughnut(id, series) {
  chart(id, "doughnut", {
    labels: series.map(x => x.label),
    datasets: [{ data: series.map(x => x.value), backgroundColor: chartColors, borderWidth: 0 }],
  }, { cutout: "62%", scales: undefined });
}

function chart(id, type, data, customOptions = {}) {
  const canvas = document.getElementById(id);
  if (!canvas || !window.Chart) return;
  if (app.charts[id]) app.charts[id].destroy();
  app.charts[id] = new Chart(canvas, {
    type,
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
      scales: type === "doughnut" ? undefined : {
        y: { beginAtZero: true, ticks: { callback: shortMoney } },
        x: { ticks: { maxRotation: 0 } },
      },
      ...customOptions,
    },
  });
}

function ds(label, data, color, type) {
  return { label, data, type, backgroundColor: color, borderColor: Array.isArray(color) ? color[0] : color, borderWidth: 2, tension: .35 };
}

function openModal(entity, key = "") {
  const row = findRow(entity, key) || {};
  app.modal = { entity, row };
  const canEdit = app.state.entities[entity] && app.state.entities[entity].canEdit;
  if (!canEdit) return;
  document.getElementById("modal").className = "modal open";
  document.getElementById("modal").innerHTML = `
    <form class="modal-card" onsubmit="submitModal(event)">
      <div class="modal-head">
        <h3>${row.ID || row["Brand Key"] || row.Email ? "Edit" : "Tambah"} ${escapeHtml(entityLabels[entity])}</h3>
        <button type="button" class="icon-btn" onclick="closeModal()"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body">${(forms[entity] || []).map(item => inputField(item, row)).join("")}</div>
      <div class="modal-foot">
        <button type="button" class="btn ghost" onclick="closeModal()"><i data-lucide="x"></i>Batal</button>
        <button type="submit" class="btn blue"><i data-lucide="save"></i>Simpan</button>
      </div>
    </form>
  `;
  paintIcons();
}

function inputField(item, row) {
  const value = row[item.key] ?? defaultValue(item);
  const wide = item.type === "textarea" ? " wide" : "";
  if (item.type === "textarea") return `<div class="field${wide}"><label>${escapeHtml(item.label)}</label><textarea name="${escapeAttr(item.key)}">${escapeHtml(value)}</textarea></div>`;
  if (item.type === "select" || item.type === "brand") return `<div class="field"><label>${escapeHtml(item.label)}</label><select name="${escapeAttr(item.key)}">${optionsFor(item, value)}</select></div>`;
  if (item.type === "boolean") return `<div class="field"><label>${escapeHtml(item.label)}</label><select name="${escapeAttr(item.key)}"><option value="true" ${truthy(value) ? "selected" : ""}>Aktif</option><option value="false" ${!truthy(value) ? "selected" : ""}>Nonaktif</option></select></div>`;
  return `<div class="field"><label>${escapeHtml(item.label)}</label><input name="${escapeAttr(item.key)}" type="${item.type}" value="${escapeAttr(value)}"></div>`;
}

function optionsFor(item, selected) {
  const values = item.type === "brand"
    ? (app.state.brands || []).map(b => ({ value: b["Brand Key"], label: `${b.Company} - ${b.Brand}` }))
    : (app.state.options[item.optionsKey] || []).map(x => ({ value: x, label: x }));
  return `<option value="">Pilih</option>${values.map(x => `<option value="${escapeAttr(x.value)}" ${String(x.value) === String(selected) ? "selected" : ""}>${escapeHtml(x.label)}</option>`).join("")}`;
}

function defaultValue(item) {
  if (item.key === "Brand Key") return document.getElementById("brandFilter")?.value || (app.state.brands[0] && app.state.brands[0]["Brand Key"]) || "";
  if (item.key === "Tahun") return new Date().getFullYear();
  if (item.key === "Status" && app.modal && app.modal.entity === "budget") return "Diajukan";
  if (item.key === "Active") return true;
  return "";
}

function closeModal() {
  document.getElementById("modal").className = "modal";
  document.getElementById("modal").innerHTML = "";
  app.modal = null;
}

async function submitModal(event) {
  event.preventDefault();
  const record = { ...(app.modal.row || {}) };
  const form = new FormData(event.currentTarget);
  for (const [key, value] of form.entries()) record[key] = value;
  try {
    await api("saveRecord", [app.modal.entity, record]);
    closeModal();
    showToast("Data tersimpan.");
    await refreshAll();
  } catch (error) {
    showToast(error.message || error);
  }
}

async function deleteRow(entity, id) {
  if (!confirm("Hapus data ini?")) return;
  try {
    await api("deleteRecord", [entity, id]);
    showToast("Data dihapus.");
    await refreshAll();
  } catch (error) {
    showToast(error.message || error);
  }
}

async function approve(id, status) {
  const paid = status === "Approved" ? prompt("Nominal dibayar, kosongkan jika belum dibayar:") : "";
  const feedback = prompt("Feedback finance:") || "";
  try {
    await api("approveBudget", [id, status, paid, feedback]);
    showToast(`Status: ${status}`);
    await refreshAll();
  } catch (error) {
    showToast(error.message || error);
  }
}

async function importSources() {
  if (!confirm("Import data lama dari Source_Workbooks sekarang?")) return;
  try {
    const result = await api("importFromSourceWorkbooks", []);
    const total = (result.results || []).reduce((sum, item) => sum + Number(item.imported || 0), 0);
    showToast(`${number.format(total)} baris diproses.`);
    await refreshAll();
  } catch (error) {
    showToast(error.message || error);
  }
}

async function refreshAll() {
  try {
    app.state = await api("getAppState", [collectFilters()]);
    renderShell();
  } catch (error) {
    showToast(error.message || error);
  }
}

function setEntity(entity) {
  app.entity = entity;
  renderOperations();
}

function setMaster(entity) {
  app.master = entity;
  renderMaster();
}

function collectFilters() {
  const val = id => document.getElementById(id) ? document.getElementById(id).value : "";
  return {
    company: val("companyFilter"),
    brandKey: val("brandFilter"),
    startDate: val("startDate"),
    endDate: val("endDate"),
    year: val("yearFilter"),
  };
}

function canApprove() {
  return app.state && app.state.session && app.state.session.permissions && app.state.session.permissions.canApprove;
}

function findRow(entity, key) {
  if (!key) return null;
  return (app.rows[entity] || []).find(row => String(row.ID || row["Brand Key"] || row.Email || "") === String(key)) || null;
}

function filterRows(rows, term) {
  const q = String(term || "").toLowerCase();
  if (!q) return rows;
  return rows.filter(row => Object.values(row).some(value => String(value ?? "").toLowerCase().includes(q)));
}

function formatCell(col, value) {
  if (value === undefined || value === null || value === "") return "-";
  if (isMoneyColumn(col)) return money.format(Number(value || 0));
  if (/%|Capaian|Progress/i.test(col)) return pct.format(Number(value || 0));
  if (/Status|Prioritas|Kontrol|Active/i.test(col)) return `<span class="status ${statusClass(value)}">${escapeHtml(value)}</span>`;
  return escapeHtml(value);
}

function isMoneyColumn(col) {
  return /Nominal|Jumlah|Biaya|Total|Saldo|Pemasukan|Pengeluaran|Sisa|Hutang|Piutang|Target|Realisasi|Selisih/i.test(col) && !/%|Capaian|Progress/i.test(col);
}

function statusClass(value) {
  const text = String(value).toLowerCase();
  if (/approved|lunas|ok|paid|high|true|aktif/.test(text)) return "ok";
  if (/diajukan|pending|termin|dp|medium|revision|terlambat|partially/.test(text)) return "warn";
  if (/reject|tolak|belum|low|false|nonaktif|cancel/.test(text)) return "bad";
  return "info";
}

function shortMoney(value) {
  const abs = Math.abs(Number(value || 0));
  if (abs >= 1000000000) return `${Math.round(value / 1000000000)}M`;
  if (abs >= 1000000) return `${Math.round(value / 1000000)}Jt`;
  if (abs >= 1000) return `${Math.round(value / 1000)}Rb`;
  return value;
}

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
}

function exportCurrentCsv() {
  const entity = app.view === "master" ? app.master : app.entity;
  exportRows(entity);
}

function exportRows(entity) {
  const rows = app.rows[entity] || [];
  if (!rows.length) return showToast("Tidak ada data untuk export.");
  const cols = tableColumns[entity] || Object.keys(rows[0]);
  const csv = [cols, ...rows.map(row => cols.map(col => row[col] ?? ""))]
    .map(line => line.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `finance-${entity}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function logout() {
  localStorage.removeItem("financeDashboardEmail");
  localStorage.removeItem("financeDashboardLoginCode");
  localStorage.removeItem("financeJoyboardEmail");
  localStorage.removeItem("financeJoyboardLoginCode");
  renderLogin();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3600);
}

function paintIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function truthy(value) {
  return value === true || String(value).toLowerCase() === "true" || String(value) === "1";
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function brandTitle(title) {
  return String(title || "Finance Dashboard").replace(/Finance Joyboard/g, "Finance Dashboard");
}

function demoApi(action, args) {
  const state = demoState();
  if (action === "getAppState") return state;
  if (action === "getRecords") return { rows: demoRows(args[0]), canEdit: true, canApprove: true };
  if (action === "saveRecord") return { ok: true, record: args[1], created: !args[1].ID };
  if (action === "deleteRecord") return { ok: true };
  if (action === "approveBudget") return { ok: true };
  if (action === "importFromSourceWorkbooks") return { ok: true, results: [{ brand: "Demo", imported: 24 }] };
  return {};
}

function demoState() {
  const brands = [
    { Company: "CV HAN", Brand: "HAN", "Brand Key": "HAN" },
    { Company: "CV LBP", Brand: "LBP", "Brand Key": "LBP" },
    { Company: "PT MBN", Brand: "NUSASEED", "Brand Key": "NUSASEED" },
    { Company: "PT MBN", Brand: "BSS", "Brand Key": "BSS" },
  ];
  const monthlyCashFlow = [
    { label: "2026-04", cashIn: 180000000, cashOut: 128000000, forecastIn: 70000000, netCash: 52000000 },
    { label: "2026-05", cashIn: 210000000, cashOut: 146000000, forecastIn: 94000000, netCash: 64000000 },
    { label: "2026-06", cashIn: 244000000, cashOut: 158000000, forecastIn: 110000000, netCash: 86000000 },
    { label: "2026-07", cashIn: 292349000, cashOut: 87310000, forecastIn: 454220000, netCash: 205039000 },
  ];
  const brandPerformance = [
    { label: "HAN", company: "CV HAN", cashIn: 77000000, cashOut: 4183000, budget: 14670000, netCash: 72817000, omzetAchievement: .84 },
    { label: "LBP", company: "CV LBP", cashIn: 82000000, cashOut: 16005000, budget: 8200000, netCash: 65995000, omzetAchievement: .78 },
    { label: "NUSASEED", company: "PT MBN", cashIn: 63500000, cashOut: 11507000, budget: 11900000, netCash: 51993000, omzetAchievement: .91 },
    { label: "BSS", company: "PT MBN", cashIn: 38000000, cashOut: 8600000, budget: 8600000, netCash: 29400000, omzetAchievement: .69 },
  ];
  return {
    authorized: true,
    app: { title: "Finance Dashboard", subtitle: "Dashboard operasional finance" },
    session: { name: "Demo Finance", role: "finance", permissions: { canApprove: true, canManageUsers: true } },
    brands,
    options: {
      companies: ["CV HAN", "CV LBP", "PT MBN"],
      categories: ["Operasional", "Marketing", "Aset", "Persediaan", "Hutang"],
      banks: ["Bank Sentral", "Bank BCA", "Bank BRI", "Kas Kecil", "E-wallet"],
      priorities: ["High", "Medium", "Low"],
      budgetStatuses: ["Diajukan", "Approved", "Need Revision", "Rejected", "DP", "Termin", "Lunas"],
      paymentTypes: ["Belum Dibayar", "DP", "Termin", "Lunas"],
      months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli"],
      roles: ["superadmin", "finance", "owner", "pic_brand"],
    },
    entities: Object.fromEntries(Object.keys(entityLabels).map(key => [key, { label: entityLabels[key], canEdit: true, canApprove: key === "budget" }])),
    dashboard: {
      generatedAt: new Date().toISOString(),
      filters: {},
      summary: {
        cashIn: 292349000,
        forecastIn: 454220000,
        cashOut: 87310000,
        netCash: 205039000,
        bankBalance: 342000000,
        budgetRequested: 172470000,
        budgetPaid: 80120000,
        budgetOutstanding: 92350000,
        payableOutstanding: 202350000,
        receivableOutstanding: 362000000,
        pendingApproval: 4,
        omzetTarget: 920000000,
        omzetReal: 718000000,
        omzetAchievement: .78,
      },
      charts: {
        monthlyCashFlow,
        brandPerformance,
        budgetStatus: [{ label: "Approved", value: 5 }, { label: "Diajukan", value: 3 }, { label: "Termin", value: 2 }, { label: "Need Revision", value: 1 }],
        priority: [{ label: "High", value: 4 }, { label: "Medium", value: 5 }, { label: "Low", value: 2 }],
        budgetByCategory: [{ label: "Hutang", value: 100000000 }, { label: "Marketing", value: 13300000 }, { label: "Aset", value: 13000000 }, { label: "Persediaan", value: 17400000 }],
        outcomeByCategory: [{ label: "Hutang", value: 30010000 }, { label: "Marketing", value: 17090000 }, { label: "Persediaan", value: 21210000 }, { label: "Operasional", value: 9600000 }],
        bankBalance: [{ label: "Bank Sentral", value: 238000000 }, { label: "Bank BCA", value: 84000000 }, { label: "Kas Kecil", value: 20000000 }],
        payableAging: [{ label: "Lewat tempo", value: 12000000 }, { label: "0-7 hari", value: 46350000 }, { label: "8-14 hari", value: 41000000 }, { label: "15+ hari", value: 103000000 }],
        omzetByMonth: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli"].map((m, i) => ({ label: m, target: 95000000 + i * 6000000, real: 76000000 + i * 5200000 })),
      },
      tables: {
        pendingBudget: demoRows("budget").filter(row => row.Status === "Diajukan" || row.Status === "Need Revision"),
        dueSoon: demoRows("budget").slice(0, 4),
        recentIncome: demoRows("income"),
        recentOutcome: demoRows("outcome"),
        bank: demoRows("bank"),
      },
    },
  };
}

function demoRows(entity) {
  const map = {
    budget: [
      { ID: "BUD-HAN-003", Brand: "HAN", "Brand Key": "HAN", "Tgl Pengajuan": "2026-07-02", "Tgl Dibutuhkan": "2026-07-15", Kategori: "Aset", Keterangan: "Pembelian Macbook Air", Vendor: "iBox", "Nominal Pengajuan (Rp)": 13000000, "Nominal Dibayar (Rp)": 0, "Sisa Hutang (Rp)": 13000000, Prioritas: "High", Status: "Diajukan" },
      { ID: "BUD-LBP-001", Brand: "LBP", "Brand Key": "LBP", "Tgl Pengajuan": "2026-07-01", "Tgl Dibutuhkan": "2026-07-10", Kategori: "Persediaan", Keterangan: "Bahan baku batch Juli", Vendor: "Supplier A", "Nominal Pengajuan (Rp)": 8200000, "Nominal Dibayar (Rp)": 3200000, "Sisa Hutang (Rp)": 5000000, Prioritas: "High", Status: "Approved" },
      { ID: "BUD-KHEEMA-001", Brand: "KHEEMA", "Brand Key": "KHEEMA", "Tgl Pengajuan": "2026-07-04", "Tgl Dibutuhkan": "2026-07-16", Kategori: "Operasional", Keterangan: "Kebutuhan outlet", Vendor: "Vendor Outlet", "Nominal Pengajuan (Rp)": 2600000, "Nominal Dibayar (Rp)": 0, "Sisa Hutang (Rp)": 2600000, Prioritas: "Low", Status: "Need Revision" },
    ],
    income: [
      { ID: "INC-HAN-001", Brand: "HAN", Tanggal: "2026-07-01", Keterangan: "BSB", Customer: "Cust Internal", Nominal: 70000000, "Bank Masuk": "Bank BCA" },
      { ID: "INC-LBP-001", Brand: "LBP", Tanggal: "2026-07-02", Keterangan: "Penjualan online", Customer: "Cust Internal", Nominal: 82000000, "Bank Masuk": "Bank Sentral" },
    ],
    forecast: [
      { ID: "FCI-HAN-001", Brand: "HAN", "Estimasi Cair": "2026-07-08", Marketplace: "Cust Internal", "Nominal Estimasi": 90000000, Status: "Open", Catatan: "BSB" },
    ],
    outcome: [
      { ID: "OUT-HAN-001", Brand: "HAN", Tanggal: "2026-07-01", Keterangan: "Pembayaran listrik", Kategori: "Operasional", "Jumlah (Rp)": 1000000, "Biaya (Rp)": 3000, "Total Pengeluaran (Rp)": 1003000, "Bank Keluar": "Kas Kecil" },
      { ID: "OUT-PTMBN-001", Brand: "PT MBN", Tanggal: "2026-07-05", Keterangan: "Pembayaran hutang pusat", Kategori: "Hutang", "Jumlah (Rp)": 30000000, "Biaya (Rp)": 10000, "Total Pengeluaran (Rp)": 30010000, "Bank Keluar": "Bank Sentral" },
    ],
    omzet: [
      { ID: "OMZ-HAN-07", Brand: "HAN", Tahun: 2026, Bulan: "Juli", "Target Omzet": 76000000, "Realisasi Omzet": 64000000, Selisih: -12000000, Capaian: .84 },
    ],
    bank: [
      { ID: "BNK-HAN-001", Brand: "HAN", Bank: "Bank BCA", "Saldo Awal": 10000000, Pemasukan: 77000000, Pengeluaran: 4183000, Total: 82817000 },
      { ID: "BNK-LBP-001", Brand: "LBP", Bank: "Bank Sentral", "Saldo Awal": 101469291, Pemasukan: 82000000, Pengeluaran: 16005000, Total: 167464291 },
    ],
    service: [
      { ID: "SRV-HAN-001", Brand: "HAN", Tanggal: "2026-05-15", Keterangan: "Jasa manajemen RUN", Vendor: "CV RUN", Nominal: 30000000, Status: "Open" },
    ],
    payables: [
      { ID: "AP-HAN-001", Brand: "HAN", "Nama Pemasok": "iBox", "Total Hutang": 13000000, "Total Dibayar": 0, "Sisa Hutang": 13000000, "Progress %": 0, Status: "Belum Dibayar" },
    ],
    receivables: [
      { ID: "AR-HAN-001", Brand: "HAN", "Nama Pelanggan": "Cust Internal", "Total Piutang": 90000000, "Total Diterima": 0, "Sisa Piutang": 90000000, "Progress %": 0, Status: "Belum Diterima" },
    ],
    users: [
      { ID: "USR-001", Email: "finance@domain.com", Name: "Admin Finance", Role: "finance", "Company Scope": "*", "Brand Scope": "*", Active: true },
    ],
    brands: demoStateLiteBrands(),
    sources: demoStateLiteBrands().map(b => ({ ...b, "Spreadsheet ID": "", Active: true, "Last Imported At": "" })),
  };
  return map[entity] || [];
}

function demoStateLiteBrands() {
  return [
    { Company: "CV HAN", Brand: "HAN", "Brand Key": "HAN", Active: true, "PIC Email": "pic.han@example.com" },
    { Company: "CV LBP", Brand: "LBP", "Brand Key": "LBP", Active: true, "PIC Email": "pic.lbp@example.com" },
    { Company: "PT MBN", Brand: "NUSASEED", "Brand Key": "NUSASEED", Active: true, "PIC Email": "pic.nusaseed@example.com" },
  ];
}
