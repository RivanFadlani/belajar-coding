# Dokumentasi Aplikasi Daftar Influencer (`src/task`)

Folder ini berisi komponen-komponen React untuk aplikasi sederhana yang berfungsi mencatat dan menampilkan daftar nama influencer ("influencers yang berdampak"). Aplikasi ini menerapkan konsep *state management*, pengiriman data antar komponen (*props*), dan pemutasian state secara aman menggunakan library Immer.

---

## 📂 Struktur Berkas

Terdapat 4 berkas utama di dalam folder `src/task/`:
1. **`main.jsx`**: Berkas *entry point* (titik masuk utama) untuk merender aplikasi.
2. **`Task.jsx`**: Komponen induk (*parent component*) yang mengelola state utama aplikasi.
3. **`TaskForm.jsx`**: Komponen formulir untuk memasukkan nama influencer baru.
4. **`TaskList.jsx`**: Komponen penampil list untuk menyajikan daftar influencer yang telah ditambahkan.

---

## 🔄 Alur Kerja Aplikasi (Workflow)

Berikut adalah urutan alur kerja dari aplikasi ini saat digunakan oleh pengguna:

1. **Inisialisasi**: 
   - `main.jsx` berjalan pertama kali dan merender komponen induk `<Task />`.
   - Komponen induk `<Task />` menyiapkan state `influencers` berupa *array* kosong menggunakan `useImmer`.
   - Komponen induk merender `<TaskForm />` dan `<TaskList />`.

2. **Input Pengguna**:
   - Pengguna mengetik nama influencer pada kolom input di `<TaskForm />`.
   - State lokal `name` di dalam `<TaskForm />` terupdate secara real-time melalui event `onChange`.

3. **Pengiriman Data (Submit)**:
   - Pengguna menekan tombol **"Kirim"**.
   - Fungsi `handleClick` di dalam `<TaskForm />` dipicu. Fungsi ini menghentikan aksi bawaan browser (*prevent default*), memanggil fungsi callback `onSubmit` (yang merujuk pada `handleSubmit` di komponen induk) dengan menyertakan data `name`, kemudian mengosongkan kembali kolom input.

4. **Pembaruan State**:
   - Fungsi `handleSubmit` di `<Task />` menerima data nama dari komponen anak.
   - State `influencers` diperbarui dengan mendorong (*push*) nama baru tersebut ke dalam draft state menggunakan `useImmer`.

5. **Render Ulang & Sinkronisasi**:
   - Karena state `influencers` pada komponen induk berubah, React secara otomatis memicu render ulang untuk komponen `<Task />` beserta komponen anaknya, `<TaskList />`.
   - `<TaskList />` menerima array `influencers` terbaru melalui props, melakukan pemetaan (*mapping*), dan menampilkannya sebagai elemen daftar (`<li>`) baru di layar.

---

## 🛠️ Penjelasan Detail Setiap Berkas

### 1. `main.jsx`
Berkas ini bertugas sebagai penghubung antara React dan DOM HTML. 
```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Task from "./Task";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Task />
  </StrictMode>
)
```
- Menggunakan `createRoot` untuk merender komponen induk `<Task />` ke dalam elemen HTML dengan ID `root`.
- Dibungkus dengan `<StrictMode>` untuk membantu mendeteksi potensi masalah dalam aplikasi selama masa pengembangan.

### 2. `Task.jsx`
Komponen utama penampung state (*Stateful Component*).
```javascript
import { useImmer } from "use-immer"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"

export default function Task() {
  const [influencers, setInfluencers] = useImmer([])

  function handleSubmit(name) {
    setInfluencers(draft => {
      draft.push(name)
    })
  }

  return (
    <div>
      <TaskForm onSubmit={handleSubmit} />
      <TaskList influencers={influencers} />
    </div>
  )
}
```
- **State `influencers`**: Menyimpan daftar nama influencer. Menggunakan `useImmer` alih-alih `useState` biasa agar pemutasian state (seperti penggunaan `.push()`) dapat ditulis dengan gaya mutasi langsung tanpa melanggar prinsip *immutability* React.
- **Fungsi `handleSubmit`**: Bertindak sebagai *handler* saat data baru dikirimkan oleh komponen anak (`TaskForm`). Ia mendorong data baru tersebut ke dalam `draft` state Immer.
- **Render**: Merender `<TaskForm>` dengan melewatkan prop callback `onSubmit`, dan `<TaskList>` dengan melewatkan prop data `influencers`.

### 3. `TaskForm.jsx`
Komponen formulir input yang mengelola state lokalnya sendiri secara mandiri (*Controlled Component*).
```javascript
import { useState } from "react"

export default function TaskForm({ onSubmit }) {
  const [name, setName] = useState("")

  function handleChange(e) {
    setName(e.target.value)
  }

  function handleClick(e) {
    e.preventDefault()
    onSubmit(name)
    setName('')
  }

  return (
    <div>
      <h1>influencers yang berdampak</h1>
      <form>
        <input type="text" value={name} onChange={handleChange} />
        <button onClick={handleClick}>Kirim</button>
      </form>
    </div>
  )
}
```
- **State `name`**: Menyimpan string teks yang sedang diketik oleh pengguna di kolom input.
- **`handleChange`**: Menangkap perubahan ketikan dan memperbarui state `name`.
- **`handleClick`**: Mencegah halaman melakukan *refresh* saat tombol ditekan, mengeksekusi prop callback `onSubmit(name)` untuk mengirimkan data ke komponen induk, lalu mengosongkan input kembali (`setName('')`).

### 4. `TaskList.jsx`
Komponen presentasional murni (*Stateless/Presentational Component*) yang bertugas menampilkan data dalam bentuk list.
```javascript
export default function TaskList({ influencers = [] }) {
  return (
    <div>
      <h2>List</h2>
      <ul>
        {influencers.map((influencer, index) => (
          <li key={index}>{influencer}</li>
        ))}
      </ul>
    </div>
  )
}
```
- Menerima prop `influencers` (diberikan nilai default berupa array kosong `[]` untuk menghindari error jika prop tidak terdefinisi).
- Menggunakan metode `.map()` untuk mengonversi setiap elemen di dalam array menjadi baris daftar `<li>`.
- Menggunakan `index` array sebagai nilai `key` unik untuk setiap elemen agar React dapat melakukan rekonsiliasi DOM dengan efisien.

---

## 🚀 Teknologi & Library yang Digunakan

* **React**: Library JavaScript untuk membangun antarmuka pengguna berbasis komponen.
* **Immer (`use-immer`)**: Library pembantu untuk bekerja dengan *immutable state* dengan cara yang lebih intuitif dan ringkas.
