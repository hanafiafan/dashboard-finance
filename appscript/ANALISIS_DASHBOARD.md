# Analisis Workbook Dashboard Finance

Saya menganalisis 10 workbook sumber:

| Company | Brand | File |
| --- | --- | --- |
| CV HAN | HAN | Dashboard Finanace HAN.xlsx |
| CV LBP | LBP | Dashboard Finance LBP.xlsx |
| CV LBP | KHEEMA | Dashboard Finance Kheema.xlsx |
| CV LBP | PG | Dashboard Finanace PG.xlsx |
| CV LBP | PRP | Dashboard Finance PRP.xlsx |
| PT MBN | PT MBN | Dashboard Finance - PT MBN.xlsx |
| PT MBN | BSJT | Dashboard Finance - BSJT.xlsx |
| PT MBN | NUSASEED | Dashboard Finance - NUSASEED.xlsx |
| PT MBN | BSSM/RBLN | Dashboard Finance - BSSM_RBLN.xlsx |
| PT MBN | BSS | Dashboard Finance - BSS.xlsx |

## Struktur Yang Ditemukan

Semua workbook memiliki sheet yang sama:

`Dashboard`, `Weekly Budget Req`, `Omzet`, `Saldo Rekening`, `Income`, `Outcome`, `Hutang`, `Piutang`, `Biaya Layanan`, `DataBase`

Ini membuat normalisasi ke satu database master layak dilakukan.

## Fungsi Setiap Sheet

| Sheet | Fungsi Operasional |
| --- | --- |
| `Weekly Budget Req` | Pengajuan budget, prioritas, approval finance, pembayaran, sisa hutang |
| `Omzet` | Target omzet, realisasi, selisih, capaian bulanan |
| `Saldo Rekening` | Saldo awal, pemasukan, pengeluaran, total per rekening/kas |
| `Income` | Cash in real dan forecast cash in |
| `Outcome` | Cash out, kategori biaya, bank keluar, total pengeluaran |
| `Hutang` | Rekap vendor/pemasok, total hutang, dibayar, sisa, progress |
| `Piutang` | Rekap pelanggan, total piutang, diterima, sisa, progress |
| `Biaya Layanan` | Biaya layanan per vendor |
| `DataBase` | Master marketplace/customer, bank, kategori |

## Header Utama

### Weekly Budget Req

`No`, `Tgl Pengajuan`, `Tgl Dibutuhkan`, `Week`, `Kategori`, `Keterangan`, `Vendor`, `Nominal Pengajuan (Rp)`, `Nominal Dibayar (Rp)`, `Sisa Hutang (Rp)`, `Jenis Bayar`, `Tgl Pembayaran Selanjutnya`, `Tgl Pelunasan`, `Prioritas`, `Status`, `Kontrol Pengajuan`, `Piagam Project/ Invoice/ Dokumen Pendukung`, `Form Feedback`

### Income

Cash in real:

`Tanggal`, `Keterangan`, `Customer`, `Nominal`, `Bank Masuk`

Forecast cash in:

`Estimasi Cair`, `Marketplace`, `Nominal Estimasi`, `Catatan`

### Outcome

`Tanggal`, `Keterangan`, `Kategori`, `Jumlah (Rp)`, `Biaya (Rp)`, `Bank Keluar`, `Total Pengeluaran (Rp)`, `Catatan`

### Omzet

`Bulan`, `Target Omzet`, `Realisasi Omzet`, `Selisih`, `Capaian`

## Ringkasan Baris Aktif

| Brand | Budget Req | Income Real | Forecast | Outcome | Saldo | Biaya Layanan |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| HAN | 48 | 4 | 5 | 4 | 9 | 2 |
| LBP | 48 | 4 | 5 | 9 | 6 | 3 |
| KHEEMA | 48 | 3 | 5 | 3 | 5 | 2 |
| PG | 48 | 4 | 5 | 9 | 5 | 3 |
| PRP | 48 | 4 | 5 | 9 | 5 | 2 |
| PT MBN | 48 | 5 | 5 | 8 | 9 | 3 |
| BSJT | 48 | 5 | 5 | 8 | 9 | 3 |
| NUSASEED | 48 | 5 | 5 | 8 | 4 | 3 |
| BSSM/RBLN | 48 | 5 | 5 | 8 | 4 | 3 |
| BSS | 48 | 5 | 5 | 8 | 4 | 3 |

## Temuan Penting

- Tab `Dashboard` pada workbook sumber lebih berupa judul besar, belum menjadi dashboard statistik lengkap.
- Template dan header antar brand konsisten.
- `Weekly Budget Req` adalah pusat workflow approval finance.
- `Income`, `Outcome`, `Saldo Rekening`, dan `Omzet` adalah basis KPI utama.
- `Hutang` dan `Piutang` mengandung formula yang pada inspeksi lokal terlihat dapat menghasilkan error `#NAME?`, sehingga dashboard web menghitung ulang metrik hutang/piutang dari data operasional dan hanya mengimpor baris Hutang/Piutang yang tidak error.
- Beberapa workbook brand PT MBN memiliki nilai template yang mirip, sehingga dashboard perlu filter company/brand agar konsolidasi tidak menyesatkan saat data awal masih berupa salinan template.

## Desain Dashboard Yang Dibuat

Dashboard final memakai database master agar:

- Finance pusat bisa melihat semua company dan brand.
- PIC brand hanya mengelola brand masing-masing.
- Owner/master hanya melihat statistik.
- Approval terpisah dari input PIC.
- Semua perubahan tercatat di `Audit_Log`.
- Data lama dari workbook sumber bisa diimpor setelah file dikonversi ke Google Sheets.

## Visualisasi Utama

- Cash in, cash out, forecast, dan net cash bulanan.
- Budget request per kategori.
- Outcome per kategori.
- Status approval budget.
- Prioritas budget.
- Performa brand.
- Saldo rekening.
- Aging hutang.
- Capaian omzet.

## QA 10 Poin

1. Semua 10 workbook dicek dan memiliki struktur sheet konsisten.
2. Header sheet operasional dipetakan ke skema database master.
3. Role superadmin, finance, owner, dan PIC brand diterapkan di backend.
4. Filter company, brand, tanggal, dan tahun diterapkan di backend.
5. PIC brand dibatasi oleh `Brand Scope`.
6. Owner dibuat read-only.
7. Finance dan superadmin bisa approval.
8. Import source workbook memakai ID Google Sheets, bukan file lokal.
9. Nilai turunan seperti sisa hutang, total outcome, selisih omzet, capaian, dan total saldo dihitung ulang.
10. Sintaks backend dan frontend sudah dicek secara lokal.
