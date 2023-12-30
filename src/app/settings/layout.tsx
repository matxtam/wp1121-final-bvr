// import TeamProfile from "./_components/TeamProfile";
type Props = {
  children: React.ReactNode;
};

export default function SettingsLayout({ children }: Props) {
  return (
    <main className="h-full overflow-hidden flex flex-col">
      {/* <TeamProfile /> */}

        {children}

    </main>
  );
}