import Profile from "./Profile";
import ProfileAddress from "./ProfileAddress";
import { ProfileContext } from "./ProfileContext";

export default function ProfileApp() {
  return (
    <div>
      {/* Mengubah data context */}
      {/* Secara otomatis semua Component dibawahnya akan mendapat nilai sesuai yang kita ubah di Context Provider */}
      <ProfileContext.Provider value="ripunn">
        <h1>Profile App</h1>
        <ProfileAddress />
        <Profile />
      </ProfileContext.Provider>
    </div>
  )
}
