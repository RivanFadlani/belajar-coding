export default function AlertButton({ text, message }) {
  // Membuat function handleClick()
  // Penamaan function untuk handle, best practice nya diawali dengan kata handle
  function handleClick() {
    // Membaca Props di Event Handler
    alert(message)
  }

  // event handlernya kurang lebih sama seperti yang ada di HTML
  return (
    <button onClick={handleClick}>{text}</button>
  )
}
