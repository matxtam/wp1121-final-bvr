export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-row overflow-hidden h-full">
      {children}
    </main>
  );
}