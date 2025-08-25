import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function SellerCTA() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <Card className="bg-gradient-to-r from-red-50 to-amber-50 border-red-100 overflow-hidden">
        <CardContent className="p-6 md:p-8 lg:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-sm font-medium">
                For Sellers
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                Grow your business with Simmerce
              </h1>
              <p className="text-gray-600">
                Join thousands of sellers who are growing their business with
                our platform. List your products, reach more customers, and
                boost your sales today.
              </p>
            </div>
            <Button
              variant="default"
              size="lg"
              className="mt-4 bg-red-600 hover:bg-red-700 text-white group w-full sm:w-auto"
              asChild
            >
              <a
                href={process.env.NEXT_PUBLIC_SELLER_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Selling Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
