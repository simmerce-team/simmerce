import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";

export const ComingSoon = () => {
  return (
    <div className="md:min-h-[60vh] flex items-center justify-center bg-slate-50/30 p-4">
      <div className="text-center max-w-md w-full">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary-foreground flex items-center justify-center mb-4">
          <Info className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">
          Coming Soon
        </h1>
        <p className="text-slate-600 mb-6">
          This feature is currently under development and will be available
          soon.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
