import { Footer } from "@/components/footer";
import Header from "@/components/header/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen container mx-auto pt-5 pb-20 md:py-10">{children}</main>
      <Footer />
    </>
  );
}
