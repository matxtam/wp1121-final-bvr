type Props = {
    children: React.ReactNode;
  };
  
export default function SettingsLayout({ children }: Props) {
    return (
      <main>
        <div>{children}</div>
      </main>
    );
  }  