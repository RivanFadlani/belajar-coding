import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";

export default function Profile() {
  // Menggunakan context 'useContect()' dari <ProfileContext />
  const profile = useContext(ProfileContext)

  return (
    <div>
      <h2>Profile</h2>
      <p>Hello, {profile}</p>
    </div>
  )
}
