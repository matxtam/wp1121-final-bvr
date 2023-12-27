import TeamProfile from "./team/TeamProfile";
// import PlayerListTable from "./_components/PlayerListTable";
import PlayerPage from "./players/page";
// import CreatePlayerButton from "./players/_components/CreatePlayerButton";

export default async function SettingsPage() {
  return (
    <div>
      <nav className="sticky top-0 flex flex-col items-center justify-between border-b bg-blue-400 p-2 text-slate-50">SettingsPage</nav>
      <TeamProfile />
      {/* <PlayerListTable /> */}
      <PlayerPage />
    </div>
  );
}