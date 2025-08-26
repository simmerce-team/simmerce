import { Footer } from "@/components/footer";
import { DesktopHeader } from "@/components/header/desktop-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DesktopHeader />
      <main className="min-h-screen container mx-auto md:pt-5 pb-20 md:py-10">{children}</main>
      <Footer />
    </>
  );
}
