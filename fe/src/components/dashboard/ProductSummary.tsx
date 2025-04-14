
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, LayoutGrid } from "lucide-react";

export function ProductSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Number of Suppliers</p>
              <p className="text-2xl font-bold">31</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <LayoutGrid className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Number of Categories</p>
              <p className="text-2xl font-bold">21</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
