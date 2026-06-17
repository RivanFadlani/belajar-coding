import { createRoot } from "react-dom/client";
import { HelloWorld } from "./HelloWorld";
import { StrictMode } from "react";

// dapatkan id 'root' di file 'hello-world.html'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelloWorld />
    <HelloWorld />
    <HelloWorld />
  </StrictMode>
)
