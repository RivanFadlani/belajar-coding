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

// 1. Trigger Render, terjadi karena dua hal
// 1.1 Inisialisasi awal Component, yang dilakukan menggunakan method render() *lanjut di Counter.jsx
createRoot(document.getElementById("root")).render(
  // 2. Render Component
  // 2.1 Pada proses inisialisasi awal, React akan memanggil Root Component (paling atas)
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

      {/* 2.2 Tapi, Pada saat proses render ulang, React hanya akan memanggil ulang Component yang state nya berubah */}
      {/*     Kalau terjadi proses render ulang di 'Counter 1', maka React akan memanggil ulang Component yang state-nya berubah saja. */}
      {/*     Jadi, cuma Component dengan State yang berubah saja yang akan di Render Ulang. */}
      {/*     Setelah proses Render selesai, React akan melakukan proses Commit ke DOM (Simpan perubahan ke DOM) */}
      <Counter /> {/* Counter 1 */}
      <Counter /> {/* Counter 2 */}
      <NoState />
    </Container>
  </StrictMode >
)
