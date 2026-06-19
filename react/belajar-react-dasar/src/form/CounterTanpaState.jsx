export default function NoState() {
  let counter = 0

  function handleClick() {
    counter++
    console.info("Counter +1", counter)
  }

  return <button onClick={handleClick}>Count? {counter}</button>
}
