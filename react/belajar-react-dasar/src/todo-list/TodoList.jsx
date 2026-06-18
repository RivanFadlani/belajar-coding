import Todo from "./Todo"

// Parent Component dari 'Todo.jsx'
// Menerima import dari Child, dan mengirim Prop ke Child Component
export default function TodoList() {
  // Membuat data array yang isinya object
  const data = [
    {
      // object id untuk id unique
      id: 1,
      text: "Learn HTML",
      isCompleted: true
    },
    {
      id: 2,
      text: "Learn CSS",
      isCompleted: true
    },
    {
      id: 3,
      text: "Learn JavaScript",
      isCompleted: true
    },
    {
      id: 4,
      text: "Learn React",
      isCompleted: false
    },
  ]


  return (
    <ul>
      {/* gunakan array.map() untuk data array menjadi Component */}
      {/* gunakan spread untuk menangkap semua object yang ada di array */}

      {/* kalau tidak memakai spread, maka akan seperti ini: */}
      {/* <Todo text={todo.text} isCompleted={todo.isCompleted} /> */}

      {/* Setiap Component perlu id unique menggunakan attr 'key' */}
      {data.map((todo) => (
        < Todo key={todo.id} {...todo} />)
      )}
    </ul>
  )
}
