let count = 0

export default function Row({ text, id }) {
  count++; {/* kalau hasil dari sebuah variable di luar scope dan value dari parameter berubah, maka tidak bisa disebut Pure Function */ }
  {/* Karena harus Pure Function, Ini berarti bahwa React Component yang kita buat harus selalu mengembalikan JSX yang sama dengan input yang sama */ }
  {/* count++ menjadi langsung berubah menjadi 2, karena adanya StrictMode yang merender 2x */ }
  return (
    <tr>
      {/* Jadi jangan gunakan variable count, karena data sudah berubah dan tidak sama lagi seperti awal */}
      <td>{id}</td>
      <td>{text}</td>
    </tr>
  )
}
