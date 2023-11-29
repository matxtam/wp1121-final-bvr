// import TeamProfile from "./_components/TeamProfile";
type Props = {
  children: React.ReactNode;
};

function SettingsLayout({ children }: Props) {
  return (
    <main>
      {/* <TeamProfile /> */}
      <div>{children}</div>
    </main>
  );
}

export default SettingsLayout;
