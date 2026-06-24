import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Online from "./Online";

createRoot(document.getElementById("root"))
  .render(
    <StrictMode>
      <Online />
    </StrictMode>
  )
