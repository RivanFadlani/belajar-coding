export default function AlertButton({ text, message }) {
  function handleClick(e) {
    // Event Object
    // Sama saja seperti Event DOM di JavaScript
    console.info(e.target)
    alert(message)
  }

  return (
    <button onClick={handleClick}>{text}</button>
  )
}
