import TeamProfile from "./team/TeamProfile";
import PlayerPage from "./players/page";

export default async function SettingsPage() {
  
  return (
    <div>
      <TeamProfile />
      <PlayerPage />
    </div>
  );
}