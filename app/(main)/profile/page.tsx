import type { Metadata } from "next";
import ProfileClient from "./profile-client";

export const metadata: Metadata = {
  title: "Your Profile | Simmerce",
  description: "View and manage your personal details.",
  alternates: { canonical: "/profile" },
  openGraph: {
    url: "/profile",
    title: "Your Profile | Simmerce",
    description: "View and manage your personal details.",
  },
};

export default function ProfilePage() {
  return <ProfileClient />;
}
