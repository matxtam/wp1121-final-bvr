type Props = {
  children: React.ReactNode;
};

function GameTimeLayout({ children }: Props) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}

export default GameTimeLayout;
