type Props = {
    children: React.ReactNode;
  };
  
export default function SettingsLayout({ children }: Props) {
    return (
      <html lang="en">
        <body className="bg-gray-100 flex flex-col h-screen overflow-hidden">
          <header className="flex flex-row justify-between items-center px-8 py-4 w-full bg-batra-300">
            <h1 className="text-2xl font-bold">We Need a Brand Name</h1>
          </header>
          <main className="h-full w-full overflow-y-scroll">
            {children}
          </main>
        </body>
      </html>
    );
  }  