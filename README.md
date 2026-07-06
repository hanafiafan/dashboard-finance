# Finance Joyboard

Dashboard finance multi-company dan multi-brand untuk operasional harian finance.

## Arsitektur

- Google Sheets: database utama.
- Apps Script: backend API untuk membaca dan menulis Google Sheets.
- Vercel: frontend dashboard dan API proxy.

## Isi Repo

- `index.html` - shell frontend.
- `assets/` - CSS dan JavaScript frontend.
- `api/finance-api.js` - Vercel API route sebagai proxy ke Apps Script.
- `appscript/Code.gs` - backend Apps Script.
- `database/` - tempat lokal untuk seed database spreadsheet. File `.xlsx` tidak di-track git agar data finance tidak ikut ter-upload.
- `vercel.json` - konfigurasi routing Vercel.

## Setup Google Sheets + Apps Script

1. Upload file `Finance Joyboard Master Database.xlsx` dari folder output lokal Codex ke Google Drive.
2. Buka sebagai Google Sheets.
3. Buka `Extensions` -> `Apps Script`.
4. Tempel `appscript/Code.gs` ke file `Code.gs`.
5. Jika perlu, pakai `appscript/appsscript.json` sebagai manifest.
6. Jalankan `setupFinanceDashboard`.
7. Jalankan `generateVercelApiToken`.
8. Deploy Apps Script sebagai Web App:
   - Execute as: `Me`
   - Who has access: `Anyone`
9. Salin URL Web App `/exec`.

## Setup Vercel

Set environment variables:

```text
APPS_SCRIPT_API_URL=https://script.google.com/macros/s/.../exec
FINANCE_API_TOKEN=token-dari-generateVercelApiToken
FINANCE_APP_LOGIN_CODE=kode-login-internal
ALLOW_EMAIL_OVERRIDE=false
```

Lalu deploy project ini di Vercel.

## Login

Login memakai:

- Email user yang sudah terdaftar di sheet `Users`.
- Access code dari `FINANCE_APP_LOGIN_CODE`.

Role dan brand scope tetap dikontrol di sheet `Users`.

## Role

- `superadmin`: akses penuh, master data, approval.
- `finance`: CRUD semua transaksi dan approval.
- `owner`: hanya melihat dashboard/statistik.
- `pic_brand`: CRUD hanya untuk brand scope masing-masing.
