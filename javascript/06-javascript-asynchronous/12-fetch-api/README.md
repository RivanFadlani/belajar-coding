# Fetch API - Login Simulation

Repositori ini berisi contoh implementasi login sederhana menggunakan **Fetch API** di JavaScript untuk mengirimkan data ke mock server (Beeceptor).

---

## Cara Kode Ini Bekerja

Kode ini menggunakan antarmuka modern JavaScript, yaitu **Fetch API**, yang terdiri dari objek `Request` dan fungsi `fetch()`. Secara umum, kode ini bekerja dengan cara:
1. Membaca input dari form HTML (Username & Password).
2. Membungkus data tersebut ke dalam format JSON.
3. Melakukan HTTP POST request ke server Beeceptor.
4. Memproses response yang diterima secara asinkronus menggunakan Promise (`.then()` dan `.catch()`).

---

## Alur Kerja (Workflow) Aplikasi

Berikut adalah urutan langkah demi langkah bagaimana program berjalan dari awal hingga selesai:

```
[ Pengguna ] ──(Isi Form & Klik Login)──> [ Event Listener ]
                                                   │
                                            (Picu doLogin())
                                                   │
                                                   ▼
[ Tampilkan Hasil/Error ] <──(Promise)─── [ fetch(Request) ]
```

### 1. Inisiasi (Event Listener)
Ketika pengguna menekan tombol **Login** (`<input type="button" id="login">`), event listener akan mendeteksi klik tersebut dan menjalankan fungsi `doLogin()`.

### 2. Pembuatan Request Object (`Request`)
Di dalam `doLogin()`, objek `Request` baru dikonstruksi dengan konfigurasi sebagai berikut:
- **URL**: `https://ripun.free.beeceptor.com/API/user` (Endpoint target di Beeceptor).
- **Method**: `POST` (Untuk mengirimkan data sensitif seperti username dan password).
- **Headers**:
  - `Content-Type: application/json`: Memberitahu server bahwa data yang dikirim berbentuk JSON.
  - `Accept: application/json`: Memberitahu server bahwa aplikasi mengharapkan response dalam bentuk JSON.
- **Body**: Data username dan password dari input form HTML diubah menjadi string JSON menggunakan `JSON.stringify()`.

### 3. Pengiriman Request (`fetch`)
Fungsi `fetch(request)` dipanggil dengan melewatkan objek `Request` yang telah dibuat. Fungsi ini mengembalikan sebuah **Promise** yang merepresentasikan respons masa depan dari server.

### 4. Penanganan Response (Promise Chain)
Setelah server memberikan respons, Promise akan diselesaikan (*resolved*) dan masuk ke rantai `.then()`:

* **`.then((response) => response.json())`**:
  * Mengonversi body dari response HTTP menjadi objek JavaScript JSON.
  * **PENTING**: Jika endpoint mengembalikan teks biasa (bukan format JSON yang valid, contoh: `"Hey ya! Great to see you here..."`), proses ini akan gagal dan menghasilkan error: `SyntaxError: Unexpected token 'H'... is not valid JSON`.
  * Oleh karena itu, pastikan endpoint mengarah ke rule mock `/API/user` yang sudah Anda setel di Beeceptor agar mengembalikan JSON yang valid (misalnya `{"body": "Success"}`).

* **`.then(function (json))`**:
  * Jika konversi JSON berhasil, fungsi ini akan dijalankan.
  * Nilai properti dari JSON (misalnya `json.body`) akan ditampilkan ke elemen HTML `<h1 id="response"></h1>`.

### 5. Penanganan Error (`.catch`)
Jika terjadi kesalahan selama proses (seperti kegagalan jaringan, endpoint tidak ditemukan, atau error parsing JSON seperti di atas), rantai Promise akan beralih ke blok `.catch()`. Pesan kesalahan/error tersebut kemudian akan ditampilkan langsung pada elemen `<h1 id="response"></h1>`.
