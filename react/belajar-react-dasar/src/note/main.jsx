/**
 * @file main.jsx
 * @description Entry point utama untuk aplikasi catatan (Note App).
 * File ini bertanggung jawab untuk me-render komponen root utama (<NoteApp />)
 * ke dalam elemen DOM HTML dengan ID 'root' menggunakan React 18 createRoot API.
 * Komponen dibungkus dengan <StrictMode> untuk membantu mengidentifikasi potensi masalah pada aplikasi selama masa pengembangan.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NoteApp from "./NoteApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NoteApp />
  </StrictMode>
)
