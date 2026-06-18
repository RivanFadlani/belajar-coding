export default function MyButton({ text, onSmash }) {
  // menerima event handler dari Props onSmash
  return (
    <button onClick={onSmash}>{text}</button>
  )
}
