import { MobileHeader } from "@/components/header/mobile-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import ProfileClient from "./profile-client";

export default function ProfilePage() {
  return (
    <>
      <MobileHeader title="Profile" />
      <ProfileClient />
      <BottomNav />
    </>
  );
}
