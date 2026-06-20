import { useState } from "react"

// ==========================================
// 1. MENENTUKAN BLUEPRINT DATA AWAL
// ==========================================
// Objek ini berfungsi sebagai cetakan awal untuk state kita.
// Isinya adalah string kosong untuk properti 'name' dan 'message'.
const initialData = {
  name: "",
  message: ""
}

export default function ContactForm() {
  // ==========================================
  // 2. DEKLARASI STATE
  // ==========================================
  // React membuat state bernama 'contact' dan fungsi pengubahnya 'setContact'.
  // Saat pertama kali aplikasi berjalan (Initial Render), isi 'contact' adalah { name: "", message: "" }.
  const [contact, setContact] = useState(initialData)

  // ==========================================
  // 3. FUNGSI HANDLER KETIKA INPUT NAMA BERUBAH
  // ==========================================
  function handleNameChange(e) {
    // e.target.value menangkap huruf/karakter terbaru yang diketik oleh user.
    setContact({
      // (...contact) adalah Spread Operator. 
      // Fungsinya MENYALIN semua data lama di dalam objek agar tidak hilang (seperti isi 'message').
      ...contact,

      // Kemudian, kita menimpa (overwrite) khusus properti 'name' dengan value baru dari input.
      name: e.target.value
    })
    // ALUR SETELAH INI: State 'contact' berubah -> React mendeteksi perubahan -> Komponen di-render ulang!
  }

  // ==========================================
  // 4. FUNGSI HANDLER KETIKA INPUT PESAN BERUBAH
  // ==========================================
  function handleMessageChange(e) {
    setContact({
      // Sama seperti di atas, salin dulu semua data lama (termasuk 'name' yang sudah diketik).
      ...contact,

      // Lalu timpa properti 'message' dengan value baru dari input pesan.
      message: e.target.value
    })
    // ALUR SETELAH INI: State 'contact' berubah -> React mendeteksi perubahan -> Komponen di-render ulang!
  }

  // ==========================================
  // 5. PROSES RENDERING (MENAMPILKAN KE LAYAR)
  // ==========================================
  // Bagian ini akan dieksekusi ulang SETIAP KALI ada perubahan pada state 'contact'.
  return (
    <div>
      <h1>Contact Form</h1>
      <form>
        {/* Input ini disebut 'Controlled Component' karena nilainya dikendalikan penuh oleh State */}
        <input
          type="text"
          placeholder="Name"
          value={contact.name} // Menampilkan teks sesuai isi state 'contact.name' saat ini
          onChange={handleNameChange} // Ketika user mengetik, jalankan fungsi handler nama
        />
        <br />
        <input
          type="text"
          placeholder="Message"
          value={contact.message} // Menampilkan teks sesuai isi state 'contact.message' saat ini
          onChange={handleMessageChange} // Ketika user mengetik, jalankan fungsi handler pesan
        />
      </form>

      {/* ==========================================
          6. LIVE PREVIEW (TAMPILAN REAL-TIME)
          ==========================================
          Karena variabel di bawah ini mengambil langsung dari state 'contact',
          maka teks di layar akan langsung berubah secara real-time setiap kali user mengetik. */}
      <h1>Contact Detail</h1>
      <p>Name: {contact.name}</p>
      <p>Message: {contact.message}</p>
    </div>
  )
}
