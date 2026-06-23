import { useState } from "react";
import Profile from "./Profile";
import ProfileAddress from "./ProfileAddress";
import { ProfileContext } from "./ProfileContext";
import ProfileForm from "./ProfileForm";

export default function ProfileApp() {
  // - Context hanya bisa diakses oleh Component Child yang terlibat dengan Context. 
  //   tidak bisa diakses oleh Component di atas atau yang sejajar dengan Component pemegang Context
  // - yang bisa mengubah context hanyalah pemegang dari context, tidak bisa diubah oleh child component
  // - jadi, jika kita ingin membuat data di Context bisa diubah dengan mudah, kita bisa menggunakan bantuan State
  const [name, setName] = useState("ripunn")

  return (
    <div>
      {/* Mengubah data context */}
      {/* Secara otomatis semua Component dibawahnya akan mendapat nilai sesuai yang kita ubah di Context Provider */}

      {/* mengambil default value context dari state */}
      <ProfileContext.Provider value={name}>
        <h1>Profile App</h1>
        <ProfileForm name={name} setName={setName} />
        <ProfileAddress />
        <Profile />
      </ProfileContext.Provider>
    </div>
  )
}
