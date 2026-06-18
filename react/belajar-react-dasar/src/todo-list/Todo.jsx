// Child Component dari 'TodoList.jsx'
// Hanya menerima Prop dari Parent Component
export default function Todo({ text, isCompleted, isDeleted = false }) {
  //conditional, akan mengembalikan component sesuai kondisi
  // === Menggunakan if-else untuk membuat kondisi pada Component
  if (isDeleted) {
    // === Null Component
    // Kalau isDeleted = true, maka kembalikan nilai null (Tidak mengembalikan Component apapun)
    // Default Value dari Props isDeleted = false
    return null
  } else {
    return (
      <li>
        {/* === Menggunakan Ternary Operator, agar lebih ringkas */}
        {isCompleted ? <del>{text}</del> : text}

        {/* === Bisa juga menggunakan logical AND && */}
        {/* Tampilkan {text}. Setelah itu, cek apakah isCompleted itu benar (true)? */}
        {/* Jika ya, tampilkan juga teks 'Check'. Jika tidak, jangan tampilkan apa-apa lagi. */}

        {/* {text} {isCompleted && 'Check'} */}

      </li>
    )
  }
}
