import TeamProfile from "./team/TeamProfile";
// import PlayerListTable from "./_components/PlayerListTable";
import PlayerPage from "./players/page";
// import CreatePlayerButton from "./players/_components/CreatePlayerButton";

export default async function SettingsPage() {
  
  return (
    <div>
      <TeamProfile />
      {/* <PlayerListTable /> */}
      <PlayerPage />
    </div>
  );
}