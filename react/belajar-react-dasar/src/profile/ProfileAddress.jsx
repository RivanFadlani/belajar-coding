import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";

export default function ProfileAddress() {
  // Menggunakan context 'useContect()' dari <ProfileContext />
  const profile = useContext(ProfileContext)

  return (
    <div>
      <h2>Profile Address</h2>
      <p>Alamat {profile}</p>
    </div>
  )
}
