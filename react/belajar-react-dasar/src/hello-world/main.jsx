import { createRoot } from "react-dom/client";
import { HelloWorld } from "./HelloWorld";
import { StrictMode } from "react";
import Container from "./Container";
import TodoList from "../todo-list/TodoList";
import Table from "../table/Table";
import AlertButton from "../button/AlertButton";
import MyButton from "../button/MyButton";
import Toolbar from "../button/Toolbar";
import SeachForm from "../form/SearchForm";
import SayHelloForm from "../form/Form";

// dapatkan id 'root' di file 'hello-world.html'
// StrictMode merender Component 2x
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Container>
      <HelloWorld />
      <TodoList />
      <Table />

      <AlertButton text="Click Me" message="You Click Me" />
      <MyButton text="Smash Me" onSmash={() => alert("You Smash Me")} />

      <Toolbar onClick={(e) => {
        e.stopPropagation()
        alert("You Click Toolbar")
      }} />

      <SeachForm />

      {/* Side Effect */}
      <SayHelloForm />
    </Container>
  </StrictMode >
)
