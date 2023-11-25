export default function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col p-12 gap-12">
      {children}
    </main>
  );
}