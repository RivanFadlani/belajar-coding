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
import Counter from "../form/Counter";
import NoState from "../form/CounterTanpaState";

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

      <SayHelloForm />

      {/* State Terisolasi dan Private */}
      {/* Akan ter-render terpisah, tidak akan sama state-nya */}
      <Counter />
      <Counter />
      {/* Ini Component Counter tanpa menggunakan State */}
      <NoState />
    </Container>
  </StrictMode >
)
