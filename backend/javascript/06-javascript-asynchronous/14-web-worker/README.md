# Web Worker - MVP (Minimum Viable Product)

Repositori ini berisi contoh dasar (MVP) implementasi **Web Worker** dalam JavaScript untuk melakukan proses asinkron di latar belakang (*background thread*). Dengan Web Worker, kita dapat menjalankan proses yang berat tanpa memblokir *Main Thread* (UI thread), sehingga halaman web tetap responsif.

## Struktur File

- `web-worker_mvp.html`: Halaman HTML utama (*Main Thread*) yang berinteraksi dengan pengguna dan menginisialisasi Web Worker.
- `scripts/worker.js`: File JavaScript yang berjalan di latar belakang (*Worker Thread*) untuk melakukan komputasi berat.

---

## Cara Kerja Web Worker

Secara umum, interaksi antara *Main Thread* (HTML) dan *Worker Thread* (JS) dilakukan melalui mekanisme **Message Passing** menggunakan fungsi `postMessage()` dan event listener `message`.

Berikut adalah penjelasan detail cara kerja dari kedua file yang ada:

### 1. Di Sisi Main Thread (`web-worker_mvp.html`)

Dalam file `web-worker_mvp.html`, proses yang terjadi adalah sebagai berikut:

*   **Inisialisasi Worker:**
    ```javascript
    const worker = new Worker("scripts/worker.js");
    ```
    Baris ini membuat instance baru dari Web Worker dengan merujuk ke file `scripts/worker.js`. Sejak saat ini, worker berjalan di thread terpisah.

*   **Menerima Data dari Worker:**
    ```javascript
    worker.addEventListener("message", function (message) {
      console.info(message.data);
    });
    ```
    Main thread mendengarkan event `"message"` dari worker. Setiap kali worker mengirimkan data menggunakan `postMessage()`, fungsi callback ini akan dipicu dan menampilkan datanya di konsol browser (`console.info`).

*   **Mengirim Data ke Worker:**
    ```javascript
    document.getElementById("button-task").addEventListener("click", function () {
      worker.postMessage(100000);
    });
    ```
    Ketika pengguna mengklik tombol dengan ID `button-task`, main thread akan mengirim pesan berupa angka `100000` ke worker menggunakan `worker.postMessage(100000)`.

---

### 2. Di Sisi Worker Thread (`scripts/worker.js`)

Dalam file `scripts/worker.js`, proses yang terjadi adalah:

*   **Menerima Data dari Main Thread:**
    ```javascript
    addEventListener("message", function (message) {
      const total = message.data; // Menerima angka 100000 dari main thread
      ...
    });
    ```
    Worker mendengarkan pesan masuk dari main thread. Data yang dikirim (dalam hal ini `100000`) ditangkap melalui properti `message.data`.

*   **Melakukan Proses Berat & Mengirim Balik Data:**
    ```javascript
    for (let i = 0; i < total; i++) {
      const i = postMessage(i);
    }
    ```
    Di dalam worker, dilakukan perulangan sebanyak nilai `total` (`100000` kali). Pada setiap iterasi, worker mengirimkan nilai indeks saat ini `i` kembali ke main thread menggunakan fungsi global `postMessage(i)`.

---

## Alur Komunikasi (Sequence)

```
[ Main Thread (HTML) ]                       [ Worker Thread (worker.js) ]
         |                                                 |
         | --- Inisialisasi Worker (new Worker) ---------> | (Mulai berjalan di background)
         |                                                 |
         | --- Klik Tombol & Kirim Pesan (100000) -------> | (Diterima di addEventListener)
         |                                                 |
         |                                                 | --- Memulai perulangan 100k kali
         | <--- Kirim pesan hasil perulangan (postMessage) |
         |      (Menerima & menampilkan ke console.info)   |
```

## Keuntungan Menggunakan Web Worker dalam Contoh Ini

Jika proses perulangan sebanyak `100.000` kali ini dijalankan langsung di *Main Thread*, UI halaman web bisa mengalami *freezing* (macet/hang) sementara karena browser sibuk memproses perulangan tersebut, sehingga pengguna tidak bisa mengklik elemen lain. 

Dengan memindahkannya ke Web Worker (`scripts/worker.js`), proses perulangan berjalan di thread latar belakang (*background thread*). Halaman utama web tetap responsif, interaktif, dan mulus selama proses berlangsung.
