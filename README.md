# React + Vite + Typescript+ Tailwindcss

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Ini adalah platform marketplace untuk layanan engagement media sosial yang mempertemukan pemasang iklan dengan penyedia jasa. implementasi awal dengan desain yang modern dan fungsional.
Saya akan menggunakan inspirasi dari platform freelance seperti Fiverr dan Upwork, namun disesuaikan untuk layanan engagement media sosial. Desainnya akan menggunakan gradien hijau-biru yang profesional dengan aksen oranye untuk call-to-action.

```text
Fitur yang akan saya implementasi di versi pertama:
✔ Landing page yang menarik dengan hero section
✔ Dashboard untuk kedua jenis pengguna (Advertiser & Service Provider)
✔ Sistem kampanye dengan formulir lengkap Panel admin untuk manajemen
✔ UI responsif dengan animasi smooth
✔ Komponen untuk statistik dan progress tracking
```

```text
Desain & Styling:
✅Gradien modern hijau-biru (#10B981 ke #3B82F6)
✅Typography yang clean dan readable
✅Card-based layout untuk konten
✅Smooth transitions dan hover effects
✅Mobile-first responsive design 
Saya akan membuat aplikasi marketplace engagement media sosial dengan struktur yang komprehensif:
Pertama,perbarui konfigurasi Tailwind untuk tema khusus
kedua , membuat landing page modern dan komprehensif untuk platform EngageMarket dengan desain yang menarik, fitur lengkap, dan struktur
```
```text
✅ Fitur yang Sudah Diimplementasi:
📱 Formulir Kampanye Lengkap:
Judul Kampanye - Input dengan validasi minimal 3 karakter
Platform Media Sosial - Dropdown dengan 7 platform (YouTube, Instagram, Facebook, Twitter, TikTok, Likee, Waveful)
URL Target Konten - Input dengan validasi URL
Jenis Layanan Dinamis - Berubah sesuai platform yang dipilih:
YouTube: View, Subscribe, Watch Time, Like, Comment
Instagram/Facebook/Twitter/TikTok/Likee/Waveful: Like, Comment, Follow, View
🎯 Layanan Multi-Service:
Bisa menambah beberapa layanan sekaligus
Setiap layanan memiliki:
Jumlah target (misal: 1000 views)
Harga per unit (misal: Rp 50/view)
Konfigurasi khusus untuk komentar
💬 Fitur Komentar Canggih:
Komentar Positif Otomatis - Sistem otomatis memberikan komentar positif
Komentar Sesuai Skrip - Input textarea untuk menulis skrip komentar khusus
📊 Estimasi Biaya Real-time:
Kalkulasi otomatis total biaya berdasarkan target × harga per unit
Tampilan dalam format Rupiah yang mudah dibaca
⏰ Manajemen Waktu:
Tanggal mulai kampanye
Tanggal berakhir kampanye
Anggaran maksimal dengan validasi
🔐 Keamanan & Validasi:
Hanya dapat diakses oleh pengguna dengan role "Pemasang Iklan"
Validasi form lengkap menggunakan Zod schema
Error handling yang user-friendly
🎨 UI/UX Modern:
Design responsif dengan Tailwind CSS
Card-based layout yang clean
Icon-icon dari Lucide React
Toast notifications untuk feedback
Loading states saat submit
🚀 Cara Menggunakan:
Login sebagai Pemasang Iklan
Buka Dashboard → Klik "Buat Kampanye"
Isi Formulir:
Judul kampanye
Pilih platform (YouTube, Instagram, dll)
Masukkan URL target
Pilih layanan yang diinginkan
Set target & harga untuk setiap layanan
Tentukan tanggal & anggaran
Review Estimasi Biaya di bagian bawah
Submit kampanye
📍 Akses Fitur:
URL: /campaigns/add
Navigasi: Dashboard Advertiser → Tombol "Buat Kampanye"
Atau langsung dari header "Kembali" ke dashboard
```

```text
✅ Fitur Baru yang Ditambahkan:
🎯 Jenis Layanan Lengkap:
View Video ✓
Like ✓
Subscribe/Follow ✓
Share (baru) ✓
Komentar dengan sub-kategori:
Komentar Positif Otomatis ✓
Komentar Sesuai Skrip ✓
🔢 Target Amount Options:
Dropdown dengan pilihan: 10, 20, 30, 40, 50, 60, 70, 100, 250, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000

💰 Dynamic Pricing System:
View: Rp 2-50 per unit
Like: Rp 5-80 per unit
Subscribe/Follow: Rp 100-500 per unit
Comment: Rp 40-200 per unit
Share: Rp 40-100 per unit
Harga otomatis turun saat quantity naik (bulk discount)
💳 Metode Pembayaran Lengkap:
E-wallet Indonesia:

QRIS (Universal) 🔄
GoPay 💚
ShopeePay 🧡
Transfer Bank:

BCA, Mandiri, BNI, BRI, CIMB Niaga
International:

Mastercard, Visa, PayPal
📊 Smart Pricing Features:
Real-time cost calculation
Progressive discount system (5%-15% untuk pembelian besar)
Budget validation (warning jika melebihi budget)
Subtotal per layanan ditampilkan
🎨 UX/UI Improvements:
Card-based service layout ("Layanan #1", "Layanan #2")
Visual pricing display per layanan
Gradient cost summary dengan breakdown diskon
Icon-based payment methods
Real-time total update
```
```text
✅ Status System Implemented:
🟡 Pending - Menunggu pembayaran, tidak terlihat oleh penyedia jasa
🔵 Active - Sudah dibayar, bisa dikerjakan penyedia jasa
🟠 Partial - Sebagian layanan sudah dikerjakan
✅ Completed - Semua target sudah terpenuhi
❌ Failed - Kampanye gagal atau refund
📊 Progress Tracking:
Real-time progress bar menunjukkan pencapaian target
Detail progress per layanan (contoh: 380/1000 views)
Perhitungan persentase otomatis
🔐 Access Control:
Pemasang Iklan: Melihat semua kampanye dengan status lengkap
Penyedia Jasa: Hanya melihat kampanye Active/Partial
Tombol "Bayar Sekarang" untuk kampanye Pending
💳 Payment Integration Ready:
Status pembayaran: Unpaid, Paid, Failed, Expired
Workflow otomatis: Pending → Active setelah pembayaran berhasil
Validasi akses berdasarkan status pembayaran
📈 Dashboard Updates:
Advertiser Dashboard: Stats yang akurat, daftar kampanye dengan progress
Service Provider Dashboard: Hanya menampilkan tugas yang bisa dikerjakan
Real-time calculation untuk engagement dan ROI
🎨 UI/UX Features:
Badge dengan emoji untuk status visual
Progress bar dengan persentase
Responsive card layout
Action buttons sesuai role dan status
```

```text
implemented all the campaign management actions (View, Edit, Pay, Delete) for the campaigns table. Here's what I've added:
✅View Details Modal - Shows comprehensive campaign information including services, progress, financial details, and payment status
✅Edit Campaign Modal - Allows editing of basic campaign details (title, URL, budget, dates, notes) for pending campaigns
✅Payment Modal - Handles payment confirmation and proof upload with a multi-step flow
✅Delete Confirmation Modal - Provides safe deletion with warnings for paid campaigns
```

# let's start create new project with terminal cmd :
```text
npm create vite@latest socialmediacampaign-frontend -- --template react
```
```text
rm -rf node_modules package-lock.json
```
```text
npm install
```

## If not Running , install module react

```text
npm install --save-dev @types/react @types/react-dom
```
```text
npx tailwindcss -v
```
```text
npm install tailwindcss@3.4.19
```
```text
npx shadcn@latest init
```

```text
npm install react-icons
```
```text
npm install vite-plugin-component-tagger --save-dev
```
```text
npm install -D @vitejs/plugin-react-
```
```text
npm install -D lovable-tagger
```
## build application 
```text
npm run dev
```
# Endpoint API
```text
http://localhost:8087/
```
```text
http://localhost:8087/login
```
```text
http://localhost:8087/register
```
```text
http://localhost:8087/dashboard/service-provider
```
```text
http://localhost:8087/dashboard/advertiser
```
```text
http://localhost:8087/campaigns/add
```
```text
http://localhost:8087/campaigns/manage
```

# Result and Display Frontend

https://drive.google.com/file/d/1oX_4LU_MhrWyl7kaHOXD0ROLsdadK7Xe/view?usp=sharing

## video mockup result running
https://drive.google.com/file/d/1FUEfhY6xYFeOex-mf6Dx67CizVWfSRPB/view?usp=sharing