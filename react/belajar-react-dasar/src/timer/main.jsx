import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Timer from "./Timer";
import HowRefWork from "./HowRefWork";

createRoot(document.getElementById("root"))
  .render(
    <StrictMode>
      <Timer />
      <HowRefWork />
    </StrictMode>
  )
