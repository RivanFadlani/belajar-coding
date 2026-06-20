// 1. Mengimpor 'useImmer' dari library 'use-immer'.
// Library ini bertugas mendengarkan perubahan "tiruan" lalu mengubahnya menjadi state baru yang aman bagi React.

import { useImmer } from "use-immer"
const initialData = {
  name: "",
  message: ""
}

export default function ContactForm() {
  // 2. Mengganti useState dengan useImmer.
  // Cara kerjanya mirip: 'contact' adalah data state-nya, dan 'setContact' adalah fungsi pengubahnya.
  const [contact, setContact] = useImmer(initialData)
  function handleNameChange(e) {
    // 3. DI SINI KEAJAIBAN IMMER TERJADI:
    // Ketimbang bikin objek baru pake {...contact}, kita memasukkan fungsi dengan parameter bernama 'draft'.
    setContact(draft => {
      // 'draft' adalah "Kertas Coretan" (Proxy) yang disediakan Immer, berisi salinan dari state 'contact' saat ini.
      // Di dalam coretan ini, kamu DILEGALKAN untuk mengubah data secara langsung (mutasi) seperti JavaScript biasa.
      draft.name = e.target.value

      // CARA KERJA DI BALIK LAYAR IMMER:
      // Setelah baris di atas selesai dieksekusi, Immer akan memeriksa "coretan" pada 'draft'.
      // Immer melihat: "Oh, si user cuma ngubah properti 'name' menjadi value baru."
      // Secara otomatis, Immer akan membuatkan OBJEK BARU yang berisi data 'message' lama + 'name' yang baru,
      // lalu menyerahkannya ke React untuk memicu re-render. State asli kamu tetap aman dan tidak rusak!
    })
  }

  function handleMessageChange(e) {
    // 4. EFEK KEUNTUNGAN MENGGUNAKAN IMMER:
    // Kamu tidak perlu takut kehilangan data 'name' yang sudah diketik sebelumnya.
    // Immer tahu kalau kamu HANYA menyentuh properti 'message', jadi properti lainnya otomatis dipertahankan.
    setContact(draft => {
      draft.message = e.target.value
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
