export default function GameTimeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full w-full overflow-y-scroll">
      {children}
    </main>
  );
}