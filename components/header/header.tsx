import { BottomNav } from "@/components/navigation/bottom-nav";
import { DesktopHeader } from "./desktop-header";
import { MobileHeader } from "./mobile-header";

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 h-[60px] md:h-[70px] px-4 md:px-8">
        {/* Desktop Header - Shown on medium screens and up */}
        <div className="hidden md:block h-full">
          <DesktopHeader />
        </div>

        {/* Mobile Header - Shown on small screens */}
        <div className="block md:hidden h-full">
          <MobileHeader />
        </div>
      </header>

      {/* Bottom Navigation - Only shown on mobile */}
      <BottomNav />
    </>
  );
}

export default Header;
