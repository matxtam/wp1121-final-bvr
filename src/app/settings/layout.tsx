// import TeamProfile from "./_components/TeamProfile";
type Props = {
  children: React.ReactNode;
};

export default function SettingsLayout({ children }: Props) {
  return (
    <main>
      {/* <TeamProfile /> */}
      <div>{children}</div>
    </main>
  );
}