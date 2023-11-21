type Props = {
    children: React.ReactNode;
  };
  
  function GameTimeIdLayout({ children }: Props) {
    return (
      <main>
        <div>{children}</div>
      </main>
    );
  }
  
  export default GameTimeIdLayout;
  