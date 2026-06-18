import { createRoot } from "react-dom/client";
import { HelloWorld } from "./HelloWorld";
import { StrictMode } from "react";
import Container from "./Container";
import TodoList from "../todo-list/TodoList";
import Table from "../table/Table";

// dapatkan id 'root' di file 'hello-world.html'
// StrictMode merender Component 2x
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Container>
      <HelloWorld />
      {/* Masukkan Component 'TodoList'*/}
      <TodoList />
      <Table />
    </Container>
  </StrictMode >
)
