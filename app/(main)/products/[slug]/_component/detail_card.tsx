import { Product } from "@/actions/product";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DetailCard = ({ product }: { product: Product }) => {
  return (
    <Card>
      <Tabs defaultValue="description" className="w-full">
        <CardHeader className="border-b border-slate-100 pb-2">
          <TabsList className="grid w-full grid-cols-2 max-w-xs">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent className="pt-6">
          <TabsContent value="description" className="m-0">
            {product.description ? (
              <div className="prose prose-slate max-w-none">
                {product.description}
              </div>
            ) : (
              <p className="text-slate-500 italic">No description available.</p>
            )}
          </TabsContent>

          <TabsContent value="specifications" className="m-0">
            {product.specifications ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex gap-4 py-2 border-b border-slate-100 last:border-0 last:pb-0"
                  >
                    <span className="font-medium text-slate-700 min-w-[120px] capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <span className="text-slate-600">
                      {String(value) || "-"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic">
                No specifications available.
              </p>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};
