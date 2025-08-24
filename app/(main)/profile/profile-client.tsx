"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { Calendar, Loader2, LogOut, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) => (
  <div className="flex items-start space-x-4">
    <div className="mt-0.5">
      <Icon className="h-5 w-5 text-muted-foreground" />
    </div>
    <div className="flex-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm">{value || "Not provided"}</p>
    </div>
  </div>
);

export default function ProfileClient() {
  const { user, profile, isLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth?redirect=/profile");
    }
  }, [user, isLoading, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-slate-100">
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            View and manage your personal details
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <InfoItem
                icon={User}
                label="Full Name"
                value={profile?.full_name || ""}
              />
              <InfoItem icon={Mail} label="Email" value={user.email || ""} />
            </div>
            <div className="space-y-6">
              <InfoItem
                icon={Phone}
                label="Phone"
                value={profile?.phone || ""}
              />
              <InfoItem
                icon={Calendar}
                label="Account Created"
                value={format(new Date(user.created_at), "MMMM d, yyyy")}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="md:hidden flex items-center justify-between border-t bg-slate-50/5">
          <p className="text-sm text-slate-500">Click the button to sign out</p>
          <Button
            variant="destructive"
            onClick={handleSignOut}
            className="flex justify-center items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
