import { createRoot } from "react-dom/client";
import { HelloWorld } from "./HelloWorld";
import { StrictMode } from "react";
import Container from "./Container";
import TodoList from "../todo-list/TodoList";

// dapatkan id 'root' di file 'hello-world.html'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Container>
      <HelloWorld />
      {/* Masukkan Component 'TodoList'*/}
      <TodoList />
    </Container>
  </StrictMode>
)
