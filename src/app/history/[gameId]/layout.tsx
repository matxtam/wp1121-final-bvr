export default function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-row">
      {children}
    </main>
  );
}