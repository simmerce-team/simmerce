import { Business } from "@/actions/business";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "date-fns";
import {
    Building2,
    Calendar,
    MapPin
} from "lucide-react";

export default function SellerDetail({ seller }: { seller: Business }) {
  return (
    <Card>
        <CardContent>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="hidden md:flex w-24 h-24 rounded-full bg-accent items-center justify-center text-3xl font-bold text-primary">
          {seller.name?.charAt(0) || "B"}
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h1 className="md:text-2xl text-xl font-bold flex items-center gap-2">
              {seller.name}
            </h1>
            {seller.gst_number && (
              <div className="flex items-center text-sm bg-sidebar-accent text-primary px-3 py-1 rounded-full">
                <span className="font-medium">GST:</span> {seller.gst_number}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-sidebar-accent-foreground">
            {seller.business_type && (
              <div className="flex items-center">
                <Building2 className="w-4 h-4 mr-1" />{" "}
                {seller.business_type?.name}
              </div>
            )}
            <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />{" "}
                {seller.city?.name + ", " + seller.city?.state?.name}
              </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" /> Member since{" "}
              {formatDate(seller.created_at, "MMMM yyyy")}
            </div>
          </div>


          {seller.description && (
            <div className="mt-4">
              <p className="text-sm text-sidebar-accent-foreground">{seller.description}</p>
            </div>
          )}
        </div>
      </div>
      </CardContent>
    </Card>
  );
}
