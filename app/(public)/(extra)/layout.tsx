import { Footer } from "@/components/footer";
import { DesktopHeader } from "@/components/header/desktop-header";

export default function ExtraLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DesktopHeader />
      <main className="min-h-screen container mx-auto py-10">{children}</main>
      <Footer />
    </>
  );
}
