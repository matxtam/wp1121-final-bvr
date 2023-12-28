// import Navbar from "./_components/Navbar";
export default function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col px-12 pb-24 gap-12 overflow-y-scroll scroll-smooth">
      {children}
    </main>
  );
}