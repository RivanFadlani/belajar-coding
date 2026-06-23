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

---

## 3. Alur Komunikasi Handler Antar Komponen

Handler (callback) dikirim dari **NoteApp** sebagai props, lalu diteruskan melewati komponen perantara hingga mencapai komponen yang membutuhkannya. Setiap handler memiliki pola komunikasi yang berbeda.

```text
+---------------------+
|      NoteApp        |  (State Owner)
|                     |
|  handleAddNote      |<--- Menerima: text (string)
|  handleChangeNote   |<--- Menerima: note (object hasil jadi dari anak)
|  handleChangeDelete |<--- Menerima: note (object)
+---------------------+
    |         |         |
    v         v         v
+----------+  +----------+
| NoteForm |  | NoteList |
+----------+  +----------+
                  |
                  v
              +----------+
              |   Note   |
              +----------+
```

### A. Handler `onAddNote` (Add)

| Komponen | Peran |
|---|---|
| **NoteApp** | Mendefinisikan `handleAddNote(text)` → `dispatch({ action: 'ADD_NOTE', text })` |
| **NoteForm** | Menerima props `onAddNote`. Saat submit, memanggil `onAddNote(localText)`. |

**Alur data:** `string text` ➝ `NoteForm.onAddNote(text)` ➝ `NoteApp.handleAddNote(text)` ➝ `dispatch`

### B. Handler `onChange` (Edit Text / Checklist)

Handler ini memiliki **pola komunikasi dua langkah**, di mana komponen anak mengolah event DOM terlebih dahulu sebelum mengirim hasilnya ke induk.

| Komponen | Peran |
|---|---|
| **NoteApp** | Mendefinisikan `handleChangeNote(note)` → `dispatch({ ...note, action: 'CHANGE_NOTE' })` |
| **NoteList** | Meneruskan props `onChange` tanpa modifikasi ke `<Note />` |
| **Note** | Menerima event DOM, membuat objek note baru, lalu memanggil `onChange(newNote)` |

**Alur data:**

```
Event DOM (e.target.value / e.target.checked)
  ➝ Note.handleChangeText(e) atau Note.handleChangeDone(e)
  ➝ Membuat objek baru: { ...note, text: e.target.value } / { ...note, done: e.target.checked }
  ➝ onChange(newNote)
  ➝ NoteApp.handleChangeNote(newNote)
  ➝ dispatch({ ...newNote, action: 'CHANGE_NOTE' })
```

### C. Handler `onDelete` (Delete)

| Komponen | Peran |
|---|---|
| **NoteApp** | Mendefinisikan `handleChangeDelete(note)` → `dispatch({ action: 'DELETE_NOTE', id: note.id })` |
| **NoteList** | Meneruskan props `onDelete` tanpa modifikasi ke `<Note />` |
| **Note** | Saat tombol Delete diklik, memanggil `onDelete(note)` dengan object note utuh |

**Alur data:**

```
note object (dari iterasi NoteList)
  ➝ Note.onClick ➝ onDelete(note)
  ➝ NoteApp.handleChangeDelete(note)
  ➝ dispatch({ action: 'DELETE_NOTE', id: note.id })
```

### Poin Penting:

- **NoteApp hanya menerima data olahan (processed data), bukan raw event DOM.** Komponen anak (`Note`) bertanggung jawab mengekstrak nilai dari event sebelum mengirimkannya ke atas.
- **NoteList bertindak sebagai *pass-through* / perantara** — ia tidak mengubah data atau callback, hanya meneruskannya ke anak.
- **NoteApp menggunakan `...note` (spread operator)** untuk membongkar properti objek note ke dalam objek action yang dikirim ke reducer.

#### Kesimpulan Untuk Handler

Di dalam fungsi handleChangeNote, parameter note adalah sebuah objek catatan tunggal yang dikirim dari komponen Note.jsx. 
Penggunaan ...note (spread operator) berfungsi untuk menyebarkan (membongkar) semua properti yang ada di dalam objek note tersebut ke dalam objek action yang dikirim ke dispatch.
Jika objek note yang diterima berisi:

```javascript
{
  id: 0,
  text: "Learn HTML (diubah)",
  done: true
}
```

Maka, ...note akan membongkar seluruh isi properti tersebut sehingga panggilan dispatch akan menghasilkan objek seperti ini:

```javascript
dispatch({
  id: 0,
  text: "Learn HTML (diubah)",
  done: true,
  action: 'CHANGE_NOTE' // (atau type: 'CHANGE_NOTE')
})
```

Dengan cara ini, reducer (notesReducer) bisa langsung mengakses properti action.id, action.text, dan action.done (atau action.type jika sudah diperbaiki) secara langsung dari objek action tersebut.

