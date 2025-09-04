import { Images } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <Image src={Images.logo} alt="Simmerce" width={48} height={48} />
          </div>
          <span className="text-2xl font-bold">Simmerce</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
