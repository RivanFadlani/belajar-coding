export default function Toolbar({ onClick }) {
  // jika tag child terkena event, maka parent akan dianggap terkena event juga-
  // karena, tag child berada di dalam parent. jadi seperti tag child bagian dari tag parent
  // untuk mencegahnya, kita bisa gunakan Event Propagation
  return (
    <div onClick={onClick} style={{ backgroundColor: "salmon" }}>
      <button onClick={onClick}>First</button>
      <button onClick={onClick}>Second</button>
    </div>
  )
}
