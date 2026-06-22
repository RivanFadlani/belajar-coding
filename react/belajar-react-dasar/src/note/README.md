# Dokumentasi Note App (React)

Aplikasi ini adalah implementasi sederhana dari pengelola catatan (*Note App*) menggunakan React. Aplikasi ini mendemonstrasikan konsep **unidirectional data flow** (aliran data satu arah), **state management** terpusat menggunakan `use-immer`, serta pemisahan komponen menjadi kontainer (*Smart Component*) dan presentasional (*Dumb Component*).

---

## 1. Urutan Render & Hirarki Komponen

Komponen di-render secara hirarki dari atas ke bawah (*Top-to-Bottom*). Berikut adalah bagan struktur komponen yang terbentuk:

```text
[main.jsx] (Entry Point)
   └── <StrictMode>
         └── <NoteApp /> (Komponen Utama / State Owner)
               ├── <NoteForm /> (Form Input Catatan)
               └── <NoteList /> (Daftar Catatan)
                     └── <Note /> (Item Catatan Individual - berulang sejumlah data catatan)
```

### Penjelasan Alur Render:
1. **`main.jsx`**: Merupakan gerbang masuk aplikasi. Komponen ini langsung memanggil dan me-render `<NoteApp />`.
2. **`NoteApp.jsx`**: Menginisialisasi state global dan merender komponen form input (`<NoteForm />`) serta kontainer daftar catatan (`<NoteList />`).
3. **`NoteList.jsx`**: Menerima array catatan dari `NoteApp` lalu melakukan perulangan (`.map()`) untuk me-render komponen `<Note />` untuk masing-masing item catatan yang ada.
4. **`Note.jsx`**: Komponen paling ujung yang merender detail setiap catatan (checkbox status selesai, teks catatan, tombol edit/save, dan tombol hapus).

---

## 2. Aliran Data & Asal-usul Props

React menggunakan prinsip **Unidirectional Data Flow** (Aliran Data Satu Arah). Data/state mengalir dari atas ke bawah (*props*), sedangkan aksi perubahan mengalir kembali ke atas (*callback event*).

```text
                +-------------------+
                |      NoteApp      | <---+ (Memicu update state)
                +-------------------+     |
                 /                 \      |
 (Kirim Props   /                   \     | (Kirim Event /
  & Callback)  v                     v    |  Callback)
         +----------+           +----------+
         | NoteForm |           | NoteList |
         +----------+           +----------+
                                     |
                         (Meneruskan |
                           Props)    v
                                +----------+
                                |   Note   |
                                +----------+
```

### A. Sumber Data Utama (State Owner)
Seluruh data catatan disimpan secara terpusat di komponen **`NoteApp`** menggunakan state `notes` (melalui hook `useImmer`). Komponen ini bertindak sebagai **Single Source of Truth** (sumber kebenaran tunggal).

---

### B. Distribusi Props & Cara Kerjanya

#### 1. Komponen `NoteForm`
* **Props yang Diterima:** `onAddNote`
* **Asal Props:** Diberikan oleh **`NoteApp`** (berupa referensi ke fungsi `handleAddNote`).
* **Cara Kerja:**
  * User mengetik catatan baru yang disimpan di state lokal `text`.
  * Ketika tombol **Add** diklik, `NoteForm` memanggil fungsi `onAddNote(text)`.
  * Aksi ini memicu fungsi `handleAddNote` di `NoteApp` untuk menambahkan data baru ke dalam state global `notes`.

#### 2. Komponen `NoteList`
* **Props yang Diterima:** `notes`, `onChange`, `onDelete`
* **Asal Props:** Diberikan langsung oleh **`NoteApp`**:
  * `notes`: Berasal dari state `notes` di `NoteApp`.
  * `onChange`: Berupa referensi ke fungsi `handleChangeNote` di `NoteApp`.
  * `onDelete`: Berupa referensi ke fungsi `handleChangeDelete` di `NoteApp`.
* **Cara Kerja:** Komponen ini bertindak sebagai perantara (*bridge*). Dia mengulang (mapping) array `notes` lalu menyalurkan kembali data item tersebut beserta callback-nya ke masing-masing komponen `<Note />`.

#### 3. Komponen `Note`
* **Props yang Diterima:** `note`, `onChange`, `onDelete`
* **Asal Props:** Diteruskan oleh **`NoteList`** saat proses iterasi (`.map()`):
  * `note`: Berisi satu objek data catatan spesifik saat iterasi (contoh: `{ id: 1, text: "Learn React", done: false }`).
  * `onChange` & `onDelete`: Callback yang diwariskan dari `NoteApp` melalui `NoteList`.
* **Cara Kerja:**
  * Komponen `<Note />` membaca data dari props `note` untuk ditampilkan ke layar.
  * Ketika user menandai selesai (mencentang checkbox) atau mengubah teks (melalui mode edit), `<Note />` memanggil fungsi `onChange(newNote)` dengan membawa objek catatan baru yang sudah diperbarui nilainya.
  * Ketika user menekan tombol hapus, `<Note />` memanggil `onDelete(note)`.
  * Kedua aksi di atas akan mengalir kembali ke atas menuju **`NoteApp`** untuk memperbarui state utama, yang kemudian memicu render ulang aplikasi dengan data terbaru.
