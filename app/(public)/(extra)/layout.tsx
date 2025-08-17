import { Footer } from "@/components/footer";
import Header from "@/components/header/header";

export default function ExtraLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen container mx-auto py-10">{children}</main>
      <Footer />
    </>
  );
}
