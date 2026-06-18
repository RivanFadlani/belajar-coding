export default function SeachForm() {
  return (
    <form>
      <input type="text" />
      <button onClick={e => {
        // Prevent Default
        // Berfungsi untuk menghentikan default action dari form ketika submit
        // Contohnya: browser akan terefresh jika form di submit
        e.preventDefault()
        alert("You Search")
      }}>Button</button>
    </form>
  )
}
