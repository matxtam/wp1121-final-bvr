import TeamProfile from "./_components/TeamProfile";
import PlayerListTable from "./_components/PlayerListTable";
async function SettingsPage() {
  return (
    <div>
      <nav className="sticky top-0 flex flex-col items-center justify-between border-b bg-blue-400 p-2 text-slate-50">SettingsPage</nav>
      <TeamProfile />
      <PlayerListTable />
    </div>
  );
}
export default SettingsPage;
