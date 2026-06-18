import Todo from "./Todo"

// Parent Component dari 'Todo.jsx'
// Menerima import dari Child, dan mengirim Prop ke Child Component
export default function TodoList() {
  return (
    <ul>
      {/* Kondisi isCompleted = true */}
      {/* Component Todo memiliki tag 'li' */}
      <Todo isCompleted={true} text="Learn HTML" />
      {/* isDeleted = true */}
      <Todo isCompleted={true} text="Learn CSS" isDeleted={true} />
      <Todo isCompleted={true} text="Learn JavaScript" />
      {/* Kondisi isCompleted = false */}
      <Todo isCompleted={false} text="Learn React" />
    </ul>
  )
}
