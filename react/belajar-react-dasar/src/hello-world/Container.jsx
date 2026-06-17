// Destructuring Parameter untuk menangkap Props Children
export default function Container({ children }) {
  return (
    <div>
      <h1>Ini Header Container</h1>
      {/* Children akan tampil di sini */}
      {children}
      <footer>
        <p>Copyright (c) 2026 Author. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
