import { Product } from "@/actions/product";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useMemo } from "react";

export const DetailCard = ({ product }: { product: Product }) => {
 
    // Helper function to parse specifications with proper TypeScript types
    type SpecificationRecord = Record<string, string>;
  
    const parseSpecifications = useCallback((specs: unknown): SpecificationRecord | null => {
      if (!specs) return null;
      
      // If it's already an object with string values, return as is
      if (typeof specs === 'object' && specs !== null && !Array.isArray(specs)) {
        // Verify all values are strings
        const isValid = Object.values(specs).every(v => typeof v === 'string');
        return isValid ? specs as SpecificationRecord : null;
      }
      
      // If it's a string, try to parse it as JSON
      if (typeof specs === 'string') {
        try {
          const parsed = JSON.parse(specs);
          
          // Handle array format: [{key: string, value: string}]
          if (Array.isArray(parsed)) {
            return parsed.reduce<SpecificationRecord>((acc, item) => {
              if (item && typeof item === 'object' && 'key' in item && 'value' in item) {
                const key = String(item.key);
                const value = String(item.value);
                if (key && value) {
                  acc[key] = value;
                }
              }
              return acc;
            }, {});
          }
          
          // Handle direct object format
          if (parsed && typeof parsed === 'object') {
            return Object.entries(parsed).reduce<SpecificationRecord>((acc, [key, value]) => {
              if (key && value !== undefined && value !== null) {
                acc[key] = String(value);
              }
              return acc;
            }, {});
          }
          
          // If it's a single value, treat it as the value with a default key
          return { 'Specifications': String(parsed) };
        } catch (e) {
          console.error('Failed to parse specifications:', e);
          // If parsing fails, return as a simple key-value with 'Specifications' as key
          return { 'Specifications': specs };
        }
      }
      
      return null;
    }, []);
  
    // Memoize the parsed specifications
    const specifications = useMemo(() => 
      parseSpecifications(product.specifications),
      [product.specifications, parseSpecifications]
    );
 
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
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            ) : (
              <p className="text-slate-500 italic">No description available.</p>
            )}
          </TabsContent>

          <TabsContent value="specifications" className="m-0">
          {specifications && Object.keys(specifications).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex">
                      <p className="font-medium text-sm w-1/3">{key}:</p>
                      <p className="text-sm text-muted-foreground flex-1">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No specifications available.</p>
              )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};
