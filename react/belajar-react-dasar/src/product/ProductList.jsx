import { useEffect, useRef, useState } from "react"
import Product from "./Product"

export default function ProductList() {
  const [products, setProducts] = useState([])
  const loaded = useRef(false)

  // Bagaimana UseEffect dijalankan?
  // 1. React membaca kode JSX Component
  // 2. React me-render component ke DOM (layar)
  // 3. Component sudah selesai terpasang (mounted)
  // 4. useEffect dijalankan di latar belakang
  useEffect(() => {
    console.info("Call Use Effect")
    if (loaded.current === false) {
      fetch("/products.json")
        // 1. Jika request berhasil, response mentah dibaca dan diproses menjadi JSON (mengembalikan Promise baru)
        .then((response) => response.json())

        // 2. Setelah konversi JSON selesai, hasilnya ditangkap di param 'data', lalu disimpan ke state 'products' (memicu render ulang UI)
        .then((data) => setProducts(data))

        // 3. Mengubah nilai ref menjadi true agar pada render berikutnya, blok IF mendeteksi data sudah ada dan tidak melakukan fetch ulang
        .then(() => loaded.current = true)
    }

    // akan dijalankan ketika
    // Component dihilangkan (Unmounted), atau
    // ada useEffect selanjutnya (karena ada perubahan data di effect)
    return () => {
      console.info("Product List Component Unmounted")
    }
  })

  return (
    products.map((product) => (
      <Product key={product.id} product={product} />
    ))
  )
}
