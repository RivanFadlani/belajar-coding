import { createRoot } from "react-dom/client";
import { HelloWorld } from "./HelloWorld";
import { StrictMode } from "react";
import Container from "./Container";
import TodoList from "../todo-list/TodoList";
import Table from "../table/Table";
import AlertButton from "../button/AlertButton";
import MyButton from "../button/MyButton";

// dapatkan id 'root' di file 'hello-world.html'
// StrictMode merender Component 2x
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Container>
      <HelloWorld />
      {/* Masukkan Component 'TodoList'*/}
      <TodoList />
      <Table />

      {/* Event Handler */}
      {/* mengirim props ke Child Component */}
      <AlertButton text="Click Me" message="You Click Me" />
      {/* Membuat Event Handler sebagai Props */}
      {/* Ingat, Attr di tag ini akan diproses oleh React menjadi Object Props */}
      <MyButton text="Smash Me" onSmash={() => alert("You Smash Me")} />
    </Container>
  </StrictMode >
)
