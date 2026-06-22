import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CounterApp } from "./CounterApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CounterApp />
  </StrictMode>
)
