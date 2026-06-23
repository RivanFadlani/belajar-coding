import { useState, useRef } from 'react';

export default function HowRefWork() {
  const [renderCount, setRenderCount] = useState(0);

  // 1. Variabel Biasa
  let variabelBiasa = 0;

  // 2. useRef
  const variabelRef = useRef(0);

  const jalankanAksi = () => {
    // variable biasa akan terhapus dan ter-reset kembali ke nilai awal setiap kali komponen di-render ulang
    variabelBiasa = variabelBiasa + 1;

    // Sementara useRef memiliki kemampuan untuk mengingat nilainya
    // sehingga nilainya tidak akan hilang atau ter-reset meskipun komponen di-render berkali-kali.
    variabelRef.current = variabelRef.current + 1;

    console.log("Variabel Biasa:", variabelBiasa); // Selalu mencetak: 1
    console.log("Variabel Ref:", variabelRef.current); // Mencetak: 1, 2, 3, 4 (terus bertambah)

    // Kita paksa render pakai useState
    setRenderCount(renderCount + 1);
    console.log("=== useState : ", renderCount)
  };

  return (
    <div>
      <h2>Cara kerja Ref</h2>
      <p>Lihat Console</p>
      <button onClick={jalankanAksi}>Klik Aku</button>
    </div>
  )
}
