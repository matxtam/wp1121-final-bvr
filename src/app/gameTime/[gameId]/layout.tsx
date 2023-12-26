type Props = {
    children: React.ReactNode;
  };
  
  function GameTimeIdLayout({ children }: Props) {
    return (
      <main className="h-screen w-full">
        <div>{children}</div>
      </main>
    );
  }
  
  export default GameTimeIdLayout;
  