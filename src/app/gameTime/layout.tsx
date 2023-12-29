export default function GameTimeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-row sm:flex-col h-full w-full overflow-y-scroll">
      {children}
    </main>
  );
}