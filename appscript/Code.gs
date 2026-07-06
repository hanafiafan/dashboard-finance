const FINANCE_APP = {
  title: 'Finance Joyboard',
  subtitle: 'Dashboard operasional finance multi-company dan multi-brand',
  timezone: 'Asia/Jakarta',
  devAllowEmailOverride: false
};

let API_REQUEST_CONTEXT = {
  email: ''
};

const SHEETS = {
  users: 'Users',
  brands: 'Brands',
  sources: 'Source_Workbooks',
  budget: 'Budget_Requests',
  income: 'Income',
  forecast: 'Income_Forecast',
  outcome: 'Outcome',
  omzet: 'Omzet',
  bank: 'Bank_Balances',
  service: 'Service_Fees',
  payables: 'Payables',
  receivables: 'Receivables',
  audit: 'Audit_Log',
  settings: 'Settings'
};

const BRAND_SEED = [
  ['CV HAN', 'HAN', 'HAN', true, ''],
  ['CV LBP', 'LBP', 'LBP', true, ''],
  ['CV LBP', 'PRP', 'PRP', true, ''],
  ['CV LBP', 'KHEEMA', 'KHEEMA', true, ''],
  ['CV LBP', 'PG', 'PG', true, ''],
  ['PT MBN', 'NUSASEED', 'NUSASEED', true, ''],
  ['PT MBN', 'BSS', 'BSS', true, ''],
  ['PT MBN', 'BSSM/RBLN', 'BSSM_RBLN', true, ''],
  ['PT MBN', 'BSJT', 'BSJT', true, ''],
  ['PT MBN', 'PT MBN', 'PT_MBN', true, '']
];

const DEFAULT_OPTIONS = {
  categories: [
    'Gaji dan Upah',
    'Operasional',
    'Marketing',
    'Sewa',
    'Aset',
    'Hutang',
    'Saving',
    'Persediaan',
    'Transfer Antar Bank',
    'Jasa Konsultasi & Manajemen RUN'
  ],
  banks: [
    'Bank Sentral',
    'Bank BCA',
    'Bank BRI',
    'Bank BNI',
    'Bank BSI',
    'Bank Mandiri',
    'Kas Kecil',
    'Kas Ditangan',
    'E-wallet'
  ],
  priorities: ['High', 'Medium', 'Low'],
  budgetStatuses: ['Diajukan', 'Approved', 'Need Revision', 'Rejected', 'DP', 'Termin', 'Lunas'],
  paymentTypes: ['Belum Dibayar', 'DP', 'Termin', 'Lunas']
};

const HEADERS = {};
HEADERS[SHEETS.users] = ['ID', 'Email', 'Name', 'Role', 'Company Scope', 'Brand Scope', 'Active', 'Last Login'];
HEADERS[SHEETS.brands] = ['Company', 'Brand', 'Brand Key', 'Active', 'PIC Email'];
HEADERS[SHEETS.sources] = ['Company', 'Brand', 'Brand Key', 'Spreadsheet ID', 'Active', 'Last Imported At', 'Notes'];
HEADERS[SHEETS.budget] = [
  'ID', 'Company', 'Brand', 'Brand Key', 'No', 'Tgl Pengajuan', 'Tgl Dibutuhkan', 'Week',
  'Kategori', 'Keterangan', 'Vendor', 'Nominal Pengajuan (Rp)', 'Nominal Dibayar (Rp)',
  'Sisa Hutang (Rp)', 'Jenis Bayar', 'Tgl Pembayaran Selanjutnya', 'Tgl Pelunasan',
  'Prioritas', 'Status', 'Kontrol Pengajuan', 'Dokumen URL', 'Form Feedback Finance',
  'Created By', 'Created At', 'Updated By', 'Updated At', 'Approved By', 'Approved At'
];
HEADERS[SHEETS.income] = [
  'ID', 'Company', 'Brand', 'Brand Key', 'Tanggal', 'Keterangan', 'Customer',
  'Nominal', 'Bank Masuk', 'Catatan', 'Created By', 'Created At', 'Updated By', 'Updated At'
];
HEADERS[SHEETS.forecast] = [
  'ID', 'Company', 'Brand', 'Brand Key', 'Estimasi Cair', 'Marketplace',
  'Nominal Estimasi', 'Catatan', 'Status', 'Created By', 'Created At', 'Updated By', 'Updated At'
];
HEADERS[SHEETS.outcome] = [
  'ID', 'Company', 'Brand', 'Brand Key', 'Tanggal', 'Keterangan', 'Kategori',
  'Jumlah (Rp)', 'Biaya (Rp)', 'Bank Keluar', 'Total Pengeluaran (Rp)', 'Catatan',
  'Created By', 'Created At', 'Updated By', 'Updated At'
];
HEADERS[SHEETS.omzet] = [
  'ID', 'Company', 'Brand', 'Brand Key', 'Tahun', 'Bulan', 'Target Omzet',
  'Realisasi Omzet', 'Selisih', 'Capaian', 'Updated By', 'Updated At'
];
HEADERS[SHEETS.bank] = [
  'ID', 'Company', 'Brand', 'Brand Key', 'Bank', 'Saldo Awal', 'Pemasukan',
  'Pengeluaran', 'Total', 'Updated By', 'Updated At'
];
HEADERS[SHEETS.service] = [
  'ID', 'Company', 'Brand', 'Brand Key', 'Tanggal', 'Keterangan', 'Vendor',
  'Nominal', 'Status', 'Catatan', 'Created By', 'Created At', 'Updated By', 'Updated At'
];
HEADERS[SHEETS.payables] = [
  'ID', 'Company', 'Brand', 'Brand Key', 'Nama Pemasok', 'Total Hutang',
  'Total Dibayar', 'Sisa Hutang', 'Progress %', 'Status', 'Source', 'Updated By', 'Updated At'
];
HEADERS[SHEETS.receivables] = [
  'ID', 'Company', 'Brand', 'Brand Key', 'Nama Pelanggan', 'Total Piutang',
  'Total Diterima', 'Sisa Piutang', 'Progress %', 'Status', 'Source', 'Updated By', 'Updated At'
];
HEADERS[SHEETS.audit] = ['Timestamp', 'User', 'Action', 'Entity', 'Record ID', 'Company', 'Brand', 'Detail JSON'];
HEADERS[SHEETS.settings] = ['Key', 'Value', 'Notes'];

const ENTITIES = {
  budget: { sheet: SHEETS.budget, label: 'Budget Request', dateField: 'Tgl Pengajuan', idPrefix: 'BUD', approveable: true },
  income: { sheet: SHEETS.income, label: 'Cash In Real', dateField: 'Tanggal', idPrefix: 'INC' },
  forecast: { sheet: SHEETS.forecast, label: 'Forecast Cash In', dateField: 'Estimasi Cair', idPrefix: 'FCI' },
  outcome: { sheet: SHEETS.outcome, label: 'Cash Out', dateField: 'Tanggal', idPrefix: 'OUT' },
  omzet: { sheet: SHEETS.omzet, label: 'Omzet', dateField: null, idPrefix: 'OMZ' },
  bank: { sheet: SHEETS.bank, label: 'Saldo Rekening', dateField: null, idPrefix: 'BNK' },
  service: { sheet: SHEETS.service, label: 'Biaya Layanan', dateField: 'Tanggal', idPrefix: 'SRV' },
  payables: { sheet: SHEETS.payables, label: 'Hutang', dateField: null, idPrefix: 'AP' },
  receivables: { sheet: SHEETS.receivables, label: 'Piutang', dateField: null, idPrefix: 'AR' },
  users: { sheet: SHEETS.users, label: 'Users', adminOnly: true, idPrefix: 'USR' },
  brands: { sheet: SHEETS.brands, label: 'Brands', adminOnly: true, noId: true },
  sources: { sheet: SHEETS.sources, label: 'Source Workbooks', adminOnly: true, noId: true }
};

const DATE_FIELDS = [
  'Tgl Pengajuan', 'Tgl Dibutuhkan', 'Tgl Pembayaran Selanjutnya', 'Tgl Pelunasan',
  'Tanggal', 'Estimasi Cair', 'Created At', 'Updated At', 'Approved At',
  'Last Login', 'Last Imported At', 'Timestamp'
];

const NUMERIC_FIELDS = [
  'No', 'Nominal Pengajuan (Rp)', 'Nominal Dibayar (Rp)', 'Sisa Hutang (Rp)',
  'Nominal', 'Nominal Estimasi', 'Jumlah (Rp)', 'Biaya (Rp)', 'Total Pengeluaran (Rp)',
  'Tahun', 'Target Omzet', 'Realisasi Omzet', 'Selisih', 'Capaian',
  'Saldo Awal', 'Pemasukan', 'Pengeluaran', 'Total',
  'Total Hutang', 'Total Dibayar', 'Sisa Hutang', 'Progress %',
  'Total Piutang', 'Total Diterima', 'Sisa Piutang'
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Finance Dashboard')
    .addItem('Setup database', 'setupFinanceDashboard')
    .addItem('Generate Vercel API token', 'generateVercelApiToken')
    .addItem('Import source workbooks', 'importFromSourceWorkbooks')
    .addToUi();
}

function doGet(e) {
  if (e && e.parameter && e.parameter.api === '1') {
    return jsonResponse_({
      ok: true,
      app: FINANCE_APP.title,
      mode: 'api',
      configured: !!getConfiguredApiToken_()
    });
  }

  return HtmlService
    .createTemplateFromFile('Index')
    .evaluate()
    .setTitle(FINANCE_APP.title)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  return handleApiRequest_(e);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function setupFinanceDashboard() {
  ensureBaseSheets_();
  const email = normalizeEmail_(Session.getEffectiveUser().getEmail());
  const users = readTable_(SHEETS.users);
  const currentUserExists = users.some(row => normalizeEmail_(row.Email) === email);
  if (email && (users.length === 0 || !currentUserExists)) {
    appendRecordBySheet_(SHEETS.users, {
      ID: makeId_('USR'),
      Email: email,
      Name: email.split('@')[0],
      Role: 'superadmin',
      'Company Scope': '*',
      'Brand Scope': '*',
      Active: true
    });
  }

  logAudit_('system', 'SETUP', 'system', '', '', '', { message: 'Database setup completed' });
  return {
    ok: true,
    message: 'Setup selesai. Cek sheet Users, Brands, dan Source_Workbooks.'
  };
}

function generateApiToken_() {
  const token = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
  PropertiesService.getScriptProperties().setProperty('FINANCE_API_TOKEN', token);
  logAudit_('system', 'TOKEN_GENERATED', 'api', '', '', '', { message: 'Finance API token generated' });

  try {
    SpreadsheetApp.getUi().alert('Finance API token', 'Simpan token ini di Vercel env FINANCE_API_TOKEN:\n\n' + token, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (error) {
    Logger.log('FINANCE_API_TOKEN=' + token);
  }
  return token;
}

function generateVercelApiToken() {
  return generateApiToken_();
}

function handleApiRequest_(e) {
  let payload = {};
  try {
    payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    validateApiToken_(payload.token);
    API_REQUEST_CONTEXT = {
      email: normalizeEmail_(payload.userEmail || payload.email || '')
    };

    const action = payload.action;
    const args = Array.isArray(payload.args) ? payload.args : [];
    let result;

    if (action === 'health') result = getApiHealth_();
    else if (action === 'getAppState') result = getAppState(args[0] || {});
    else if (action === 'getDashboardData') result = getDashboardData(args[0] || {});
    else if (action === 'getRecords') result = getRecords(args[0], args[1] || {});
    else if (action === 'saveRecord') result = saveRecord(args[0], args[1] || {});
    else if (action === 'deleteRecord') result = deleteRecord(args[0], args[1]);
    else if (action === 'approveBudget') result = approveBudget(args[0], args[1], args[2], args[3]);
    else if (action === 'importFromSourceWorkbooks') result = importFromSourceWorkbooks();
    else throw new Error('Action API tidak dikenal: ' + action);

    return jsonResponse_({ ok: true, result: result });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: error.message || String(error)
    });
  } finally {
    API_REQUEST_CONTEXT = { email: '' };
  }
}

function getApiHealth_() {
  return {
    app: publicAppInfo_(),
    configured: !!getConfiguredApiToken_(),
    userEmail: API_REQUEST_CONTEXT.email || '',
    time: new Date()
  };
}

function validateApiToken_(token) {
  const expected = getConfiguredApiToken_();
  if (!expected) {
    throw new Error('FINANCE_API_TOKEN belum dibuat. Jalankan generateVercelApiToken di Apps Script.');
  }
  if (!token || token !== expected) {
    throw new Error('Token API tidak valid.');
  }
}

function getConfiguredApiToken_() {
  return PropertiesService.getScriptProperties().getProperty('FINANCE_API_TOKEN') || '';
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload, replacerForJson_))
    .setMimeType(ContentService.MimeType.JSON);
}

function replacerForJson_(key, value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, FINANCE_APP.timezone, "yyyy-MM-dd'T'HH:mm:ssXXX");
  }
  return value;
}

function getAppState(filters) {
  ensureBaseSheets_();
  const session = getSession_();
  if (!session.authorized) {
    return {
      authorized: false,
      app: publicAppInfo_(),
      session: session,
      message: 'Email Anda belum terdaftar atau belum bisa dibaca oleh Apps Script.'
    };
  }

  touchLastLogin_(session.email);
  return {
    authorized: true,
    app: publicAppInfo_(),
    session: session,
    brands: getVisibleBrands_(session),
    allBrands: readBrands_(),
    options: buildOptions_(),
    entities: buildClientEntities_(session),
    dashboard: getDashboardData(filters || {})
  };
}

function getDashboardData(filters) {
  ensureBaseSheets_();
  const session = getSession_();
  requireAuthorized_(session);

  const scope = normalizeFilters_(filters || {}, session);
  const budget = filterRows_(readTable_(SHEETS.budget), ENTITIES.budget, scope, session);
  const income = filterRows_(readTable_(SHEETS.income), ENTITIES.income, scope, session);
  const forecast = filterRows_(readTable_(SHEETS.forecast), ENTITIES.forecast, scope, session);
  const outcome = filterRows_(readTable_(SHEETS.outcome), ENTITIES.outcome, scope, session);
  const omzet = filterRows_(readTable_(SHEETS.omzet), ENTITIES.omzet, scope, session);
  const bank = filterRows_(readTable_(SHEETS.bank), ENTITIES.bank, scope, session);
  const service = filterRows_(readTable_(SHEETS.service), ENTITIES.service, scope, session);
  const payables = filterRows_(readTable_(SHEETS.payables), ENTITIES.payables, scope, session);
  const receivables = filterRows_(readTable_(SHEETS.receivables), ENTITIES.receivables, scope, session);

  const cashIn = sum_(income, 'Nominal');
  const forecastIn = sum_(forecast, 'Nominal Estimasi');
  const cashOut = sum_(outcome, 'Total Pengeluaran (Rp)');
  const serviceFees = sum_(service, 'Nominal');
  const budgetRequested = sum_(budget, 'Nominal Pengajuan (Rp)');
  const budgetPaid = sum_(budget, 'Nominal Dibayar (Rp)');
  const budgetOutstanding = sum_(budget, 'Sisa Hutang (Rp)');
  const bankBalance = sum_(bank, 'Total');
  const omzetTarget = sum_(omzet, 'Target Omzet');
  const omzetReal = sum_(omzet, 'Realisasi Omzet');
  const payableOutstanding = budgetOutstanding + sum_(payables, 'Sisa Hutang');
  const receivableOutstanding = forecastIn + sum_(receivables, 'Sisa Piutang');
  const pendingBudget = budget.filter(row => isPendingBudget_(row));
  const approvedBudget = budget.filter(row => isApprovedBudget_(row));

  return {
    generatedAt: new Date(),
    filters: scope,
    summary: {
      cashIn: cashIn,
      forecastIn: forecastIn,
      cashOut: cashOut,
      netCash: cashIn - cashOut,
      serviceFees: serviceFees,
      budgetRequested: budgetRequested,
      budgetPaid: budgetPaid,
      budgetOutstanding: budgetOutstanding,
      bankBalance: bankBalance,
      omzetTarget: omzetTarget,
      omzetReal: omzetReal,
      omzetAchievement: omzetTarget ? omzetReal / omzetTarget : 0,
      payableOutstanding: payableOutstanding,
      receivableOutstanding: receivableOutstanding,
      pendingApproval: pendingBudget.length,
      approvalRate: budget.length ? approvedBudget.length / budget.length : 0
    },
    charts: {
      monthlyCashFlow: buildMonthlyCashFlow_(income, outcome, forecast),
      budgetByCategory: groupSum_(budget, 'Kategori', 'Nominal Pengajuan (Rp)', 9),
      outcomeByCategory: groupSum_(outcome, 'Kategori', 'Total Pengeluaran (Rp)', 9),
      budgetStatus: groupCount_(budget, 'Status'),
      priority: groupCount_(budget, 'Prioritas'),
      brandPerformance: buildBrandPerformance_(income, outcome, budget, omzet),
      bankBalance: groupSum_(bank, 'Bank', 'Total', 12),
      omzetByMonth: buildOmzetByMonth_(omzet),
      payableAging: buildPayableAging_(budget)
    },
    tables: {
      pendingBudget: serializeRows_(pendingBudget.slice(0, 12)),
      dueSoon: serializeRows_(buildDueSoon_(budget).slice(0, 12)),
      recentIncome: serializeRows_(sortByDateDesc_(income, 'Tanggal').slice(0, 8)),
      recentOutcome: serializeRows_(sortByDateDesc_(outcome, 'Tanggal').slice(0, 8)),
      bank: serializeRows_(bank.slice(0, 20))
    }
  };
}

function getRecords(entityName, filters) {
  ensureBaseSheets_();
  const session = getSession_();
  requireAuthorized_(session);
  const entity = getEntity_(entityName);
  requireEntityAccess_(entityName, session, 'read');

  const scope = normalizeFilters_(filters || {}, session);
  const rows = filterRows_(readTable_(entity.sheet), entity, scope, session);
  return {
    entity: entityName,
    rows: serializeRows_(rows.slice(0, 500)),
    canEdit: canEditEntity_(entityName, session),
    canApprove: !!session.permissions.canApprove
  };
}

function saveRecord(entityName, payload) {
  ensureBaseSheets_();
  const session = getSession_();
  requireAuthorized_(session);
  const entity = getEntity_(entityName);
  requireEntityAccess_(entityName, session, 'write');

  const record = normalizeRecordForSave_(entityName, payload || {}, session);
  assertBrandWriteAccess_(record, session);
  const saved = upsertRecord_(entity.sheet, record, entity);
  logAudit_(session.email, saved.created ? 'CREATE' : 'UPDATE', entityName, saved.record.ID || '', saved.record.Company || '', saved.record.Brand || '', saved.record);

  return { ok: true, record: serializeRecord_(saved.record), created: saved.created };
}

function deleteRecord(entityName, id) {
  ensureBaseSheets_();
  const session = getSession_();
  requireAuthorized_(session);
  const entity = getEntity_(entityName);
  requireEntityAccess_(entityName, session, 'delete');
  if (entity.noId) throw new Error('Entity ini tidak memakai ID untuk hapus lewat dashboard.');

  const found = findRowById_(entity.sheet, id);
  if (!found) throw new Error('Data tidak ditemukan.');
  assertBrandWriteAccess_(found.record, session);

  getSheet_(entity.sheet).deleteRow(found.rowNumber);
  logAudit_(session.email, 'DELETE', entityName, id, found.record.Company || '', found.record.Brand || '', found.record);
  return { ok: true };
}

function approveBudget(id, status, paidAmount, feedback) {
  ensureBaseSheets_();
  const session = getSession_();
  requireAuthorized_(session);
  if (!session.permissions.canApprove) throw new Error('Role Anda tidak punya akses approval.');

  const found = findRowById_(SHEETS.budget, id);
  if (!found) throw new Error('Budget request tidak ditemukan.');
  assertBrandReadAccess_(found.record, session);

  const record = found.record;
  record.Status = status || 'Approved';
  if (paidAmount !== undefined && paidAmount !== null && paidAmount !== '') {
    record['Nominal Dibayar (Rp)'] = asNumber_(paidAmount);
  }
  record['Sisa Hutang (Rp)'] = Math.max(0, asNumber_(record['Nominal Pengajuan (Rp)']) - asNumber_(record['Nominal Dibayar (Rp)']));
  record['Jenis Bayar'] = record['Sisa Hutang (Rp)'] <= 0 ? 'Lunas' : (record['Nominal Dibayar (Rp)'] > 0 ? 'Termin' : 'Belum Dibayar');
  record['Form Feedback Finance'] = feedback || record['Form Feedback Finance'] || '';
  record['Approved By'] = session.email;
  record['Approved At'] = new Date();
  record['Updated By'] = session.email;
  record['Updated At'] = new Date();
  upsertRecord_(SHEETS.budget, record, ENTITIES.budget);
  logAudit_(session.email, 'APPROVE', 'budget', id, record.Company || '', record.Brand || '', { status: record.Status, paidAmount: record['Nominal Dibayar (Rp)'] });
  return { ok: true, record: serializeRecord_(record) };
}

function importFromSourceWorkbooks() {
  ensureBaseSheets_();
  const session = getSession_();
  requireAuthorized_(session);
  if (!session.permissions.canManageUsers && !session.permissions.canApprove) {
    throw new Error('Import hanya untuk superadmin atau finance.');
  }

  const sources = readTable_(SHEETS.sources).filter(row => isTruthy_(row.Active) && String(row['Spreadsheet ID'] || '').trim());
  const results = [];
  sources.forEach(source => {
    assertBrandReadAccess_(source, session);
    const count = importSingleSource_(source, session);
    source['Last Imported At'] = new Date();
    upsertSourceRow_(source);
    results.push({ company: source.Company, brand: source.Brand, imported: count });
  });
  logAudit_(session.email, 'IMPORT', 'sources', '', '', '', results);
  return { ok: true, results: results };
}

function ensureBaseSheets_() {
  Object.keys(HEADERS).forEach(name => ensureSheet_(name, HEADERS[name]));
  seedBrands_();
  seedSources_();
  seedSettings_();
}

function ensureSheet_(name, headers) {
  const ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeader = current.some(value => value !== '');
  if (!hasHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setFontColor('#17202a')
      .setBackground('#dff7f1');
    sheet.autoResizeColumns(1, headers.length);
  }
}

function seedBrands_() {
  if (readTable_(SHEETS.brands).length > 0) return;
  const sheet = getSheet_(SHEETS.brands);
  sheet.getRange(2, 1, BRAND_SEED.length, BRAND_SEED[0].length).setValues(BRAND_SEED);
}

function seedSources_() {
  if (readTable_(SHEETS.sources).length > 0) return;
  const rows = BRAND_SEED.map(item => [item[0], item[1], item[2], '', true, '', 'Isi Spreadsheet ID setelah file XLSX dikonversi ke Google Sheets']);
  getSheet_(SHEETS.sources).getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

function seedSettings_() {
  if (readTable_(SHEETS.settings).length > 0) return;
  const rows = [
    ['App Title', FINANCE_APP.title, 'Judul dashboard'],
    ['Late Budget Lead Days', 7, 'Pengajuan dianggap terlambat bila kurang dari jumlah hari ini'],
    ['Currency', 'IDR', 'Format nilai rupiah']
  ];
  getSheet_(SHEETS.settings).getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

function getSession_() {
  const requestEmail = API_REQUEST_CONTEXT && API_REQUEST_CONTEXT.email ? API_REQUEST_CONTEXT.email : '';
  const email = normalizeEmail_(requestEmail || Session.getActiveUser().getEmail());
  const users = readTable_(SHEETS.users);
  const user = users.find(row => normalizeEmail_(row.Email) === email && isTruthy_(row.Active));
  if (!email || !user) {
    return {
      authorized: false,
      email: email,
      name: email || 'Guest',
      role: 'guest',
      visibleBrandKeys: [],
      permissions: permissionsForRole_('guest')
    };
  }
  const role = String(user.Role || 'owner').toLowerCase();
  return {
    authorized: true,
    email: email,
    name: user.Name || email,
    role: role,
    companyScope: user['Company Scope'] || '',
    brandScope: user['Brand Scope'] || '',
    visibleBrandKeys: getVisibleBrandKeys_(user, role),
    permissions: permissionsForRole_(role)
  };
}

function permissionsForRole_(role) {
  return {
    canManageUsers: role === 'superadmin',
    canApprove: role === 'superadmin' || role === 'finance',
    canEditAllBrands: role === 'superadmin' || role === 'finance',
    canEditOwnBrand: role === 'pic_brand',
    readOnly: role === 'owner' || role === 'guest'
  };
}

function getVisibleBrandKeys_(user, role) {
  const all = readBrands_().map(brand => brand['Brand Key']);
  if (role === 'superadmin' || role === 'finance') return all;
  const raw = String(user['Brand Scope'] || '').trim();
  if (!raw || raw === '*') return role === 'owner' ? all : [];
  return raw.split(',').map(item => item.trim()).filter(Boolean);
}

function readBrands_() {
  return readTable_(SHEETS.brands).filter(row => isTruthy_(row.Active));
}

function getVisibleBrands_(session) {
  const keys = {};
  session.visibleBrandKeys.forEach(key => keys[key] = true);
  return readBrands_().filter(brand => keys[brand['Brand Key']]);
}

function buildOptions_() {
  const rows = {
    budget: readTable_(SHEETS.budget),
    income: readTable_(SHEETS.income),
    outcome: readTable_(SHEETS.outcome),
    bank: readTable_(SHEETS.bank),
    forecast: readTable_(SHEETS.forecast)
  };
  return {
    companies: uniqueSorted_(readBrands_().map(row => row.Company)),
    brands: readBrands_(),
    categories: uniqueSorted_(DEFAULT_OPTIONS.categories.concat(rows.budget.map(row => row.Kategori), rows.outcome.map(row => row.Kategori))),
    banks: uniqueSorted_(DEFAULT_OPTIONS.banks.concat(rows.income.map(row => row['Bank Masuk']), rows.outcome.map(row => row['Bank Keluar']), rows.bank.map(row => row.Bank))),
    priorities: DEFAULT_OPTIONS.priorities,
    budgetStatuses: DEFAULT_OPTIONS.budgetStatuses,
    paymentTypes: DEFAULT_OPTIONS.paymentTypes,
    months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    roles: ['superadmin', 'finance', 'owner', 'pic_brand']
  };
}

function buildClientEntities_(session) {
  const result = {};
  Object.keys(ENTITIES).forEach(name => {
    if (ENTITIES[name].adminOnly && !session.permissions.canManageUsers) return;
    result[name] = {
      label: ENTITIES[name].label,
      headers: HEADERS[ENTITIES[name].sheet],
      canEdit: canEditEntity_(name, session),
      canApprove: name === 'budget' && session.permissions.canApprove
    };
  });
  return result;
}

function canEditEntity_(entityName, session) {
  const entity = getEntity_(entityName);
  if (session.permissions.readOnly) return false;
  if (entity.adminOnly) return session.permissions.canManageUsers;
  return session.permissions.canEditAllBrands || session.permissions.canEditOwnBrand;
}

function requireEntityAccess_(entityName, session, mode) {
  const entity = getEntity_(entityName);
  if (mode === 'read') {
    if (entity.adminOnly && !session.permissions.canManageUsers) throw new Error('Akses admin dibutuhkan.');
    return;
  }
  if (!canEditEntity_(entityName, session)) throw new Error('Role Anda tidak punya akses edit untuk area ini.');
}

function assertBrandReadAccess_(record, session) {
  if (session.permissions.canEditAllBrands || session.role === 'owner') {
    if (session.visibleBrandKeys.indexOf(record['Brand Key']) === -1) throw new Error('Brand di luar scope akses Anda.');
    return;
  }
  if (session.visibleBrandKeys.indexOf(record['Brand Key']) === -1) throw new Error('Brand di luar scope akses Anda.');
}

function assertBrandWriteAccess_(record, session) {
  if (record['Brand Key']) assertBrandReadAccess_(record, session);
  if (session.permissions.readOnly) throw new Error('Role ini hanya bisa melihat data.');
  if (session.permissions.canEditAllBrands) return;
  if (session.permissions.canEditOwnBrand && session.visibleBrandKeys.indexOf(record['Brand Key']) !== -1) return;
  throw new Error('Anda hanya bisa mengubah data brand yang menjadi scope Anda.');
}

function normalizeFilters_(filters, session) {
  const visible = session.visibleBrandKeys || [];
  let brandKey = filters.brandKey || filters.brand || '';
  if (brandKey && visible.indexOf(brandKey) === -1) brandKey = '';
  return {
    company: filters.company || '',
    brandKey: brandKey,
    startDate: filters.startDate || '',
    endDate: filters.endDate || '',
    year: filters.year || '',
    visibleBrandKeys: visible
  };
}

function filterRows_(rows, entity, filters, session) {
  return rows.filter(row => {
    const brandKey = row['Brand Key'] || '';
    if (brandKey && filters.visibleBrandKeys.indexOf(brandKey) === -1) return false;
    if (filters.company && row.Company !== filters.company) return false;
    if (filters.brandKey && brandKey !== filters.brandKey) return false;
    if (filters.year) {
      if (entity.sheet === SHEETS.omzet && String(row.Tahun || '') !== String(filters.year)) return false;
    }
    if (entity.dateField && (filters.startDate || filters.endDate)) {
      const value = asDate_(row[entity.dateField]);
      if (!value) return false;
      if (filters.startDate && value < asDate_(filters.startDate)) return false;
      if (filters.endDate) {
        const end = asDate_(filters.endDate);
        end.setHours(23, 59, 59, 999);
        if (value > end) return false;
      }
    }
    return true;
  });
}

function normalizeRecordForSave_(entityName, payload, session) {
  const entity = getEntity_(entityName);
  const headers = HEADERS[entity.sheet];
  const record = {};
  headers.forEach(header => {
    record[header] = payload[header] !== undefined ? payload[header] : '';
  });

  if (!entity.noId && !record.ID) record.ID = makeId_(entity.idPrefix);
  if (!entity.adminOnly) hydrateBrandFields_(record, session);
  coerceRecordTypes_(record);
  applyDerivedFields_(entityName, record);

  const now = new Date();
  if (headers.indexOf('Created By') !== -1 && !record['Created By']) record['Created By'] = session.email;
  if (headers.indexOf('Created At') !== -1 && !record['Created At']) record['Created At'] = now;
  if (headers.indexOf('Updated By') !== -1) record['Updated By'] = session.email;
  if (headers.indexOf('Updated At') !== -1) record['Updated At'] = now;
  return record;
}

function hydrateBrandFields_(record, session) {
  const brands = readBrands_();
  if (!record['Brand Key'] && session.visibleBrandKeys.length === 1) record['Brand Key'] = session.visibleBrandKeys[0];
  const brand = brands.find(item => item['Brand Key'] === record['Brand Key']) || brands.find(item => item.Brand === record.Brand);
  if (brand) {
    record.Company = brand.Company;
    record.Brand = brand.Brand;
    record['Brand Key'] = brand['Brand Key'];
  }
}

function coerceRecordTypes_(record) {
  Object.keys(record).forEach(key => {
    if (DATE_FIELDS.indexOf(key) !== -1) record[key] = asDate_(record[key]) || '';
    if (NUMERIC_FIELDS.indexOf(key) !== -1) record[key] = asNumberOrBlank_(record[key]);
  });
}

function applyDerivedFields_(entityName, record) {
  if (entityName === 'budget') {
    record['Nominal Dibayar (Rp)'] = asNumber_(record['Nominal Dibayar (Rp)']);
    record['Nominal Pengajuan (Rp)'] = asNumber_(record['Nominal Pengajuan (Rp)']);
    record['Sisa Hutang (Rp)'] = Math.max(0, record['Nominal Pengajuan (Rp)'] - record['Nominal Dibayar (Rp)']);
    if (!record['Jenis Bayar']) record['Jenis Bayar'] = record['Sisa Hutang (Rp)'] <= 0 ? 'Lunas' : 'Belum Dibayar';
    if (!record.Week) record.Week = weekLabel_(record['Tgl Dibutuhkan'] || record['Tgl Pengajuan']);
    record['Kontrol Pengajuan'] = budgetControl_(record['Tgl Pengajuan'], record['Tgl Dibutuhkan']);
    if (!record.Status) record.Status = 'Diajukan';
  }
  if (entityName === 'outcome') {
    record['Jumlah (Rp)'] = asNumber_(record['Jumlah (Rp)']);
    record['Biaya (Rp)'] = asNumber_(record['Biaya (Rp)']);
    record['Total Pengeluaran (Rp)'] = record['Jumlah (Rp)'] + record['Biaya (Rp)'];
  }
  if (entityName === 'omzet') {
    record['Target Omzet'] = asNumber_(record['Target Omzet']);
    record['Realisasi Omzet'] = asNumber_(record['Realisasi Omzet']);
    record.Selisih = record['Realisasi Omzet'] - record['Target Omzet'];
    record.Capaian = record['Target Omzet'] ? record['Realisasi Omzet'] / record['Target Omzet'] : 0;
  }
  if (entityName === 'bank') {
    record['Saldo Awal'] = asNumber_(record['Saldo Awal']);
    record.Pemasukan = asNumber_(record.Pemasukan);
    record.Pengeluaran = asNumber_(record.Pengeluaran);
    record.Total = record['Saldo Awal'] + record.Pemasukan - record.Pengeluaran;
  }
  if (entityName === 'payables') {
    record['Sisa Hutang'] = Math.max(0, asNumber_(record['Total Hutang']) - asNumber_(record['Total Dibayar']));
    record['Progress %'] = asNumber_(record['Total Hutang']) ? asNumber_(record['Total Dibayar']) / asNumber_(record['Total Hutang']) : 0;
  }
  if (entityName === 'receivables') {
    record['Sisa Piutang'] = Math.max(0, asNumber_(record['Total Piutang']) - asNumber_(record['Total Diterima']));
    record['Progress %'] = asNumber_(record['Total Piutang']) ? asNumber_(record['Total Diterima']) / asNumber_(record['Total Piutang']) : 0;
  }
}

function upsertRecord_(sheetName, record, entity) {
  if (entity && entity.noId) {
    const keyFields = sheetName === SHEETS.brands || sheetName === SHEETS.sources ? ['Brand Key'] : [];
    const foundByKey = findRowByKeyFields_(sheetName, record, keyFields);
    if (foundByKey) {
      writeRecordToRow_(sheetName, foundByKey.rowNumber, record);
      return { created: false, record: record };
    }
    return appendRecordBySheet_(sheetName, record);
  }
  const found = record.ID ? findRowById_(sheetName, record.ID) : null;
  if (found) {
    writeRecordToRow_(sheetName, found.rowNumber, record);
    return { created: false, record: record };
  }
  appendRecordBySheet_(sheetName, record);
  return { created: true, record: record };
}

function appendRecordBySheet_(sheetName, record) {
  const headers = HEADERS[sheetName];
  const row = headers.map(header => record[header] !== undefined ? record[header] : '');
  getSheet_(sheetName).appendRow(row);
  return { created: true, record: record };
}

function writeRecordToRow_(sheetName, rowNumber, record) {
  const headers = HEADERS[sheetName];
  const row = headers.map(header => record[header] !== undefined ? record[header] : '');
  getSheet_(sheetName).getRange(rowNumber, 1, 1, headers.length).setValues([row]);
}

function findRowById_(sheetName, id) {
  const rows = readTable_(sheetName);
  const record = rows.find(row => String(row.ID || '') === String(id || ''));
  return record ? { rowNumber: record._rowNumber, record: record } : null;
}

function findRowByKeyFields_(sheetName, record, fields) {
  if (!fields || fields.length === 0) return null;
  const rows = readTable_(sheetName);
  const found = rows.find(row => fields.every(field => String(row[field] || '') === String(record[field] || '')));
  return found ? { rowNumber: found._rowNumber, record: found } : null;
}

function readTable_(sheetName) {
  const sheet = getSheet_(sheetName);
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  const headers = values[0].map(String);
  return values.slice(1).map((row, index) => {
    const record = { _rowNumber: index + 2 };
    headers.forEach((header, col) => record[header] = row[col]);
    return record;
  }).filter(record => {
    return Object.keys(record).some(key => key !== '_rowNumber' && record[key] !== '' && record[key] !== null);
  });
}

function getSheet_(sheetName) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if (!sheet) throw new Error('Sheet "' + sheetName + '" tidak ditemukan. Jalankan setupFinanceDashboard dulu.');
  return sheet;
}

function getEntity_(entityName) {
  const entity = ENTITIES[entityName];
  if (!entity) throw new Error('Entity tidak dikenal: ' + entityName);
  return entity;
}

function importSingleSource_(source, session) {
  const sourceBook = SpreadsheetApp.openById(String(source['Spreadsheet ID']).trim());
  const context = {
    company: source.Company,
    brand: source.Brand,
    brandKey: source['Brand Key'],
    user: session.email
  };
  let count = 0;
  count += importBudget_(sourceBook, context);
  count += importIncome_(sourceBook, context);
  count += importForecast_(sourceBook, context);
  count += importOutcome_(sourceBook, context);
  count += importOmzet_(sourceBook, context);
  count += importBank_(sourceBook, context);
  count += importService_(sourceBook, context);
  count += importPayables_(sourceBook, context);
  count += importReceivables_(sourceBook, context);
  return count;
}

function importBudget_(book, context) {
  const rows = readSourceRows_(book, 'Weekly Budget Req', 'A2:R120');
  let count = 0;
  rows.forEach((row, index) => {
    if (!hasAny_(row, [1, 2, 4, 5, 6, 7, 8, 13, 14])) return;
    const record = {
      ID: stableImportId_('BUD', context.brandKey, index + 1),
      Company: context.company,
      Brand: context.brand,
      'Brand Key': context.brandKey,
      No: row[0],
      'Tgl Pengajuan': row[1],
      'Tgl Dibutuhkan': row[2],
      Week: row[3],
      Kategori: row[4],
      Keterangan: row[5],
      Vendor: row[6],
      'Nominal Pengajuan (Rp)': row[7],
      'Nominal Dibayar (Rp)': row[8],
      'Sisa Hutang (Rp)': row[9],
      'Jenis Bayar': row[10],
      'Tgl Pembayaran Selanjutnya': row[11],
      'Tgl Pelunasan': row[12],
      Prioritas: row[13],
      Status: row[14],
      'Kontrol Pengajuan': row[15],
      'Dokumen URL': row[16],
      'Form Feedback Finance': row[17],
      'Created By': 'source import',
      'Created At': new Date(),
      'Updated By': context.user,
      'Updated At': new Date()
    };
    coerceRecordTypes_(record);
    applyDerivedFields_('budget', record);
    upsertRecord_(SHEETS.budget, record, ENTITIES.budget);
    count++;
  });
  return count;
}

function importIncome_(book, context) {
  const rows = readSourceRows_(book, 'Income', 'B8:F160');
  let count = 0;
  rows.forEach((row, index) => {
    if (!hasAny_(row, [0, 1, 2, 3, 4])) return;
    const record = {
      ID: stableImportId_('INC', context.brandKey, index + 1),
      Company: context.company,
      Brand: context.brand,
      'Brand Key': context.brandKey,
      Tanggal: row[0],
      Keterangan: row[1],
      Customer: row[2],
      Nominal: row[3],
      'Bank Masuk': row[4],
      Catatan: '',
      'Created By': 'source import',
      'Created At': new Date(),
      'Updated By': context.user,
      'Updated At': new Date()
    };
    coerceRecordTypes_(record);
    upsertRecord_(SHEETS.income, record, ENTITIES.income);
    count++;
  });
  return count;
}

function importForecast_(book, context) {
  const rows = readSourceRows_(book, 'Income', 'H8:K160');
  let count = 0;
  rows.forEach((row, index) => {
    if (!hasAny_(row, [0, 1, 2, 3])) return;
    const record = {
      ID: stableImportId_('FCI', context.brandKey, index + 1),
      Company: context.company,
      Brand: context.brand,
      'Brand Key': context.brandKey,
      'Estimasi Cair': row[0],
      Marketplace: row[1],
      'Nominal Estimasi': row[2],
      Catatan: row[3],
      Status: 'Open',
      'Created By': 'source import',
      'Created At': new Date(),
      'Updated By': context.user,
      'Updated At': new Date()
    };
    coerceRecordTypes_(record);
    upsertRecord_(SHEETS.forecast, record, ENTITIES.forecast);
    count++;
  });
  return count;
}

function importOutcome_(book, context) {
  const rows = readSourceRows_(book, 'Outcome', 'B7:I180');
  let count = 0;
  rows.forEach((row, index) => {
    if (!hasAny_(row, [0, 1, 2, 3, 4, 5, 6])) return;
    const record = {
      ID: stableImportId_('OUT', context.brandKey, index + 1),
      Company: context.company,
      Brand: context.brand,
      'Brand Key': context.brandKey,
      Tanggal: row[0],
      Keterangan: row[1],
      Kategori: row[2],
      'Jumlah (Rp)': row[3],
      'Biaya (Rp)': row[4],
      'Bank Keluar': row[5],
      'Total Pengeluaran (Rp)': row[6],
      Catatan: row[7],
      'Created By': 'source import',
      'Created At': new Date(),
      'Updated By': context.user,
      'Updated At': new Date()
    };
    coerceRecordTypes_(record);
    applyDerivedFields_('outcome', record);
    upsertRecord_(SHEETS.outcome, record, ENTITIES.outcome);
    count++;
  });
  return count;
}

function importOmzet_(book, context) {
  const sheet = book.getSheetByName('Omzet');
  if (!sheet) return 0;
  const year = sheet.getRange('C5').getValue() || new Date().getFullYear();
  const rows = sheet.getRange('B8:F19').getValues();
  let count = 0;
  rows.forEach((row, index) => {
    if (!row[0]) return;
    const record = {
      ID: stableImportId_('OMZ', context.brandKey, index + 1),
      Company: context.company,
      Brand: context.brand,
      'Brand Key': context.brandKey,
      Tahun: year,
      Bulan: row[0],
      'Target Omzet': row[1],
      'Realisasi Omzet': row[2],
      Selisih: row[3],
      Capaian: row[4],
      'Updated By': context.user,
      'Updated At': new Date()
    };
    coerceRecordTypes_(record);
    applyDerivedFields_('omzet', record);
    upsertRecord_(SHEETS.omzet, record, ENTITIES.omzet);
    count++;
  });
  return count;
}

function importBank_(book, context) {
  const rows = readSourceRows_(book, 'Saldo Rekening', 'A8:E30');
  let count = 0;
  rows.forEach((row, index) => {
    if (!row[0]) return;
    const record = {
      ID: stableImportId_('BNK', context.brandKey, index + 1),
      Company: context.company,
      Brand: context.brand,
      'Brand Key': context.brandKey,
      Bank: row[0],
      'Saldo Awal': row[1],
      Pemasukan: row[2],
      Pengeluaran: row[3],
      Total: row[4],
      'Updated By': context.user,
      'Updated At': new Date()
    };
    coerceRecordTypes_(record);
    applyDerivedFields_('bank', record);
    upsertRecord_(SHEETS.bank, record, ENTITIES.bank);
    count++;
  });
  return count;
}

function importService_(book, context) {
  const rows = readSourceRows_(book, 'Biaya Layanan', 'G7:J160');
  let count = 0;
  rows.forEach((row, index) => {
    if (!hasAny_(row, [0, 1, 2, 3])) return;
    const record = {
      ID: stableImportId_('SRV', context.brandKey, index + 1),
      Company: context.company,
      Brand: context.brand,
      'Brand Key': context.brandKey,
      Tanggal: row[0],
      Keterangan: row[1],
      Vendor: row[2],
      Nominal: row[3],
      Status: 'Open',
      Catatan: '',
      'Created By': 'source import',
      'Created At': new Date(),
      'Updated By': context.user,
      'Updated At': new Date()
    };
    coerceRecordTypes_(record);
    upsertRecord_(SHEETS.service, record, ENTITIES.service);
    count++;
  });
  return count;
}

function importPayables_(book, context) {
  const rows = readSourceRows_(book, 'Hutang', 'B7:H120');
  let count = 0;
  rows.forEach((row, index) => {
    if (containsError_(row) || !hasAny_(row, [1, 2, 3, 4])) return;
    const record = {
      ID: stableImportId_('AP', context.brandKey, index + 1),
      Company: context.company,
      Brand: context.brand,
      'Brand Key': context.brandKey,
      'Nama Pemasok': row[1],
      'Total Hutang': row[2],
      'Total Dibayar': row[3],
      'Sisa Hutang': row[4],
      'Progress %': row[5],
      Status: row[6],
      Source: 'Hutang source workbook',
      'Updated By': context.user,
      'Updated At': new Date()
    };
    coerceRecordTypes_(record);
    applyDerivedFields_('payables', record);
    upsertRecord_(SHEETS.payables, record, ENTITIES.payables);
    count++;
  });
  return count;
}

function importReceivables_(book, context) {
  const rows = readSourceRows_(book, 'Piutang', 'B7:H120');
  let count = 0;
  rows.forEach((row, index) => {
    if (containsError_(row) || !hasAny_(row, [1, 2, 3, 4])) return;
    const record = {
      ID: stableImportId_('AR', context.brandKey, index + 1),
      Company: context.company,
      Brand: context.brand,
      'Brand Key': context.brandKey,
      'Nama Pelanggan': row[1],
      'Total Piutang': row[2],
      'Total Diterima': row[3],
      'Sisa Piutang': row[4],
      'Progress %': row[5],
      Status: row[6],
      Source: 'Piutang source workbook',
      'Updated By': context.user,
      'Updated At': new Date()
    };
    coerceRecordTypes_(record);
    applyDerivedFields_('receivables', record);
    upsertRecord_(SHEETS.receivables, record, ENTITIES.receivables);
    count++;
  });
  return count;
}

function readSourceRows_(book, sheetName, a1) {
  const sheet = book.getSheetByName(sheetName);
  if (!sheet) return [];
  return sheet.getRange(a1).getValues();
}

function upsertSourceRow_(record) {
  const rows = readTable_(SHEETS.sources);
  const found = rows.find(row => row['Brand Key'] === record['Brand Key']);
  if (found) writeRecordToRow_(SHEETS.sources, found._rowNumber, record);
}

function buildMonthlyCashFlow_(income, outcome, forecast) {
  const map = {};
  income.forEach(row => addMonthly_(map, row.Tanggal, 'cashIn', asNumber_(row.Nominal)));
  outcome.forEach(row => addMonthly_(map, row.Tanggal, 'cashOut', asNumber_(row['Total Pengeluaran (Rp)'])));
  forecast.forEach(row => addMonthly_(map, row['Estimasi Cair'], 'forecastIn', asNumber_(row['Nominal Estimasi'])));
  return Object.keys(map).sort().map(key => {
    const item = map[key];
    item.netCash = item.cashIn - item.cashOut;
    return item;
  });
}

function addMonthly_(map, dateValue, field, amount) {
  const date = asDate_(dateValue);
  if (!date) return;
  const key = Utilities.formatDate(date, FINANCE_APP.timezone, 'yyyy-MM');
  if (!map[key]) map[key] = { label: key, cashIn: 0, cashOut: 0, forecastIn: 0, netCash: 0 };
  map[key][field] += amount;
}

function buildBrandPerformance_(income, outcome, budget, omzet) {
  const brands = {};
  getVisibleBrandRecords_(income.concat(outcome, budget, omzet)).forEach(row => {
    const key = row['Brand Key'];
    if (!brands[key]) brands[key] = { label: row.Brand || key, company: row.Company || '', cashIn: 0, cashOut: 0, budget: 0, omzetTarget: 0, omzetReal: 0, pending: 0 };
  });
  income.forEach(row => brands[row['Brand Key']] && (brands[row['Brand Key']].cashIn += asNumber_(row.Nominal)));
  outcome.forEach(row => brands[row['Brand Key']] && (brands[row['Brand Key']].cashOut += asNumber_(row['Total Pengeluaran (Rp)'])));
  budget.forEach(row => {
    if (!brands[row['Brand Key']]) return;
    brands[row['Brand Key']].budget += asNumber_(row['Nominal Pengajuan (Rp)']);
    if (isPendingBudget_(row)) brands[row['Brand Key']].pending += 1;
  });
  omzet.forEach(row => {
    if (!brands[row['Brand Key']]) return;
    brands[row['Brand Key']].omzetTarget += asNumber_(row['Target Omzet']);
    brands[row['Brand Key']].omzetReal += asNumber_(row['Realisasi Omzet']);
  });
  return Object.keys(brands).map(key => {
    const item = brands[key];
    item.netCash = item.cashIn - item.cashOut;
    item.omzetAchievement = item.omzetTarget ? item.omzetReal / item.omzetTarget : 0;
    return item;
  }).sort((a, b) => b.cashIn - a.cashIn);
}

function getVisibleBrandRecords_(rows) {
  const seen = {};
  const result = [];
  rows.forEach(row => {
    const key = row['Brand Key'];
    if (!key || seen[key]) return;
    seen[key] = true;
    result.push(row);
  });
  return result;
}

function buildOmzetByMonth_(rows) {
  const map = {};
  rows.forEach(row => {
    const label = row.Bulan || 'Tanpa bulan';
    if (!map[label]) map[label] = { label: label, target: 0, real: 0, achievement: 0 };
    map[label].target += asNumber_(row['Target Omzet']);
    map[label].real += asNumber_(row['Realisasi Omzet']);
  });
  const order = buildOptions_().months;
  return Object.keys(map).sort((a, b) => order.indexOf(a) - order.indexOf(b)).map(key => {
    map[key].achievement = map[key].target ? map[key].real / map[key].target : 0;
    return map[key];
  });
}

function buildPayableAging_(budget) {
  const buckets = { 'Lewat tempo': 0, '0-7 hari': 0, '8-14 hari': 0, '15+ hari': 0, 'Tanpa tanggal': 0 };
  const today = startOfDay_(new Date());
  budget.forEach(row => {
    const outstanding = asNumber_(row['Sisa Hutang (Rp)']);
    if (outstanding <= 0) return;
    const due = asDate_(row['Tgl Pembayaran Selanjutnya'] || row['Tgl Dibutuhkan']);
    if (!due) {
      buckets['Tanpa tanggal'] += outstanding;
      return;
    }
    const days = Math.floor((startOfDay_(due) - today) / 86400000);
    if (days < 0) buckets['Lewat tempo'] += outstanding;
    else if (days <= 7) buckets['0-7 hari'] += outstanding;
    else if (days <= 14) buckets['8-14 hari'] += outstanding;
    else buckets['15+ hari'] += outstanding;
  });
  return Object.keys(buckets).map(label => ({ label: label, value: buckets[label] }));
}

function buildDueSoon_(budget) {
  const today = startOfDay_(new Date());
  return budget.filter(row => {
    if (asNumber_(row['Sisa Hutang (Rp)']) <= 0) return false;
    const due = asDate_(row['Tgl Pembayaran Selanjutnya'] || row['Tgl Dibutuhkan']);
    if (!due) return false;
    const days = Math.floor((startOfDay_(due) - today) / 86400000);
    return days <= 14;
  }).sort((a, b) => asDate_(a['Tgl Pembayaran Selanjutnya'] || a['Tgl Dibutuhkan']) - asDate_(b['Tgl Pembayaran Selanjutnya'] || b['Tgl Dibutuhkan']));
}

function groupSum_(rows, labelField, valueField, limit) {
  const map = {};
  rows.forEach(row => {
    const label = row[labelField] || 'Tidak ditentukan';
    map[label] = (map[label] || 0) + asNumber_(row[valueField]);
  });
  return Object.keys(map).map(label => ({ label: label, value: map[label] })).sort((a, b) => b.value - a.value).slice(0, limit || 20);
}

function groupCount_(rows, labelField) {
  const map = {};
  rows.forEach(row => {
    const label = row[labelField] || 'Tidak ditentukan';
    map[label] = (map[label] || 0) + 1;
  });
  return Object.keys(map).map(label => ({ label: label, value: map[label] })).sort((a, b) => b.value - a.value);
}

function sortByDateDesc_(rows, field) {
  return rows.slice().sort((a, b) => {
    const left = asDate_(a[field]);
    const right = asDate_(b[field]);
    return (right ? right.getTime() : 0) - (left ? left.getTime() : 0);
  });
}

function sum_(rows, field) {
  return rows.reduce((total, row) => total + asNumber_(row[field]), 0);
}

function serializeRows_(rows) {
  return rows.map(serializeRecord_);
}

function serializeRecord_(record) {
  const copy = {};
  Object.keys(record).forEach(key => {
    if (key === '_rowNumber') return;
    const value = record[key];
    if (value instanceof Date) {
      copy[key] = Utilities.formatDate(value, FINANCE_APP.timezone, 'yyyy-MM-dd');
    } else {
      copy[key] = value;
    }
  });
  return copy;
}

function asDate_(value) {
  if (!value && value !== 0) return null;
  if (value instanceof Date && !isNaN(value.getTime())) return value;
  if (typeof value === 'number' && value > 20000 && value < 60000) {
    const date = new Date(Date.UTC(1899, 11, 30));
    date.setUTCDate(date.getUTCDate() + value);
    return date;
  }
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function asNumber_(value) {
  if (value === null || value === undefined || value === '') return 0;
  if (typeof value === 'number') return value;
  const cleaned = String(value).replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
  const parsed = Number(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

function asNumberOrBlank_(value) {
  if (value === null || value === undefined || value === '') return '';
  return asNumber_(value);
}

function isTruthy_(value) {
  return value === true || String(value).toLowerCase() === 'true' || String(value).toLowerCase() === 'yes' || String(value) === '1';
}

function isPendingBudget_(row) {
  const status = String(row.Status || '').toLowerCase();
  return !status || status === 'diajukan' || status === 'pending' || status === 'need revision';
}

function isApprovedBudget_(row) {
  const status = String(row.Status || '').toLowerCase();
  return status === 'approved' || status === 'lunas' || status === 'dp' || status === 'termin';
}

function budgetControl_(submission, needed) {
  const sub = asDate_(submission);
  const need = asDate_(needed);
  if (!sub || !need) return '';
  const leadDays = Number(getSetting_('Late Budget Lead Days', 7));
  const days = Math.floor((startOfDay_(need) - startOfDay_(sub)) / 86400000);
  return days >= leadDays ? 'OK' : 'Terlambat Diajukan';
}

function weekLabel_(dateValue) {
  const date = asDate_(dateValue);
  if (!date) return '';
  return 'Week ' + Math.ceil(date.getDate() / 7);
}

function startOfDay_(dateValue) {
  const date = new Date(dateValue);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getSetting_(key, fallback) {
  const found = readTable_(SHEETS.settings).find(row => row.Key === key);
  return found ? found.Value : fallback;
}

function uniqueSorted_(items) {
  const set = {};
  items.forEach(item => {
    if (item !== undefined && item !== null && item !== '') set[String(item)] = true;
  });
  return Object.keys(set).sort((a, b) => a.localeCompare(b));
}

function hasAny_(row, indexes) {
  return indexes.some(index => row[index] !== '' && row[index] !== null && row[index] !== undefined);
}

function containsError_(row) {
  return row.some(value => typeof value === 'string' && value.charAt(0) === '#');
}

function stableImportId_(prefix, brandKey, index) {
  return [prefix, brandKey, index].join('-');
}

function makeId_(prefix) {
  return prefix + '-' + Utilities.formatDate(new Date(), FINANCE_APP.timezone, 'yyyyMMdd-HHmmss') + '-' + Utilities.getUuid().slice(0, 8);
}

function normalizeEmail_(email) {
  return String(email || '').trim().toLowerCase();
}

function publicAppInfo_() {
  return {
    title: getSetting_('App Title', FINANCE_APP.title),
    subtitle: FINANCE_APP.subtitle,
    timezone: FINANCE_APP.timezone
  };
}

function touchLastLogin_(email) {
  const found = readTable_(SHEETS.users).find(row => normalizeEmail_(row.Email) === email);
  if (!found) return;
  found['Last Login'] = new Date();
  writeRecordToRow_(SHEETS.users, found._rowNumber, found);
}

function requireAuthorized_(session) {
  if (!session || !session.authorized) throw new Error('Akses belum terdaftar. Tambahkan email Anda di sheet Users.');
}

function logAudit_(user, action, entity, recordId, company, brand, detail) {
  try {
    appendRecordBySheet_(SHEETS.audit, {
      Timestamp: new Date(),
      User: user,
      Action: action,
      Entity: entity,
      'Record ID': recordId,
      Company: company,
      Brand: brand,
      'Detail JSON': JSON.stringify(detail || {})
    });
  } catch (error) {
    Logger.log(error.message);
  }
}
