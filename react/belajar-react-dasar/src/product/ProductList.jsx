import { useEffect, useState } from "react"
import Product from "./Product"

export default function ProductList() {
  const [products, setProducts] = useState([])
  // Ref dependencies: ubah loaded dari Ref menjadi State
  const [loaded, setLoaded] = useState(false)

  function handleLoad() {
    console.info("Handle Loaded")
    setLoaded(true) // Saat tombol diklik, state loaded berubah -> memicu render ulang komponen -> karena nilai 'loaded' berubah,
    //                 useEffect baru akan dipicu setelah render selesai
  }

  function handleUnload() {
    console.info("Handle Unload")
    setLoaded(false) // Saat tombol diklik, state loaded berubah -> memicu render ulang komponen -> karena nilai 'loaded' berubah,
    //                  useEffect baru akan dipicu setelah render selesai
  }

  useEffect(() => {
    console.info("=== Call Use Effect With []")
  }, [])
  // Array kosong pada dependencies berarti useEffect HANYA akan dijalankan 1 kali saja di awal (saat komponen pertama kali muncul/mounted).
  // Setelah itu, efek ini tidak akan pernah dijalankan lagi, meskipun komponen mengalami render ulang berkali-kali akibat perubahan state lain.

  // Bagaimana UseEffect dijalankan?
  // 1. React membaca kode JSX Component
  // 2. React me-render component ke DOM (layar)
  // 3. Component sudah selesai terpasang (mounted)
  // 4. useEffect dijalankan di latar belakang
  // 5. useEffect akan membaca dari dependencies dulu, baru setup jika dependencies ada perubahan state
  useEffect(() => {
    console.info("== Call Use Effect")

    // === ASYNC CODE DI EFFECT ===
    async function fetchProducts() {
      const response = await fetch("/products.json")
      const data = await response.json()
      setProducts(data)
    }

    if (loaded) {
      fetchProducts()
    }
    // === --- ===

    // akan dijalankan ketika
    // Component dihilangkan (Unmounted), atau
    // ada useEffect selanjutnya (karena ada perubahan data di effect)
    return () => {
      console.info("Product List Component Unmounted")
    }
    // parameter ke-dua: dependencies yang bentuknya adalah array
  }, [loaded]) // initialState = false
  // 1. Awalnya `loaded` bernilai false. Render pertama selesai -> useEffect dijalankan (karena ini render pertama).
  // 2. Tombol diklik -> setLoaded(true) dipanggil -> Komponen merender ulang dirinya (fungsi ProductList() dijalankan lagi).
  // 3. Setelah render kedua selesai, React mengecek array dependensi ini.
  // 4. Karena nilai `loaded` BERUBAH (dari false menjadi true), maka fungsi di dalam useEffect DIJALANKAN LAGI.
  // 5. Namun ketika tombol diklik lagi, maka useEffect tidak akan menjalankan ulang useEffect. karena state tidak ada perubahan nilai

  return (
    <>
      <h1>Product</h1>
      <button onClick={handleLoad}>Load Products</button>
      <button onClick={handleUnload}>Unload Products</button>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </>
  )
}
