import { createRoot } from "react-dom/client";
import { HelloWorld } from "./HelloWorld";
import { StrictMode } from "react";
import Container from "./Container"; import HelloWorldDua from "./HelloWorldDua";
{/* Memanggil Component Container */ }

// dapatkan id 'root' di file 'hello-world.html'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Container>
      {/* Component 'HelloWorld' akan otomatis masuk ke dalam parameter Component 'Container' */}
      <HelloWorld />
      {/* bisa menambahkan lebih dari satu children. jadi seperti menggunakan spread syntax di PARENT, padahal kita tidak setup itu di parameternya */}
      <HelloWorldDua />
    </Container>
  </StrictMode>
)
