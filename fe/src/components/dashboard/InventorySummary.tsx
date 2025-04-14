
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock } from "lucide-react";

export function InventorySummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Package className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quantity in Hand</p>
              <p className="text-2xl font-bold">868</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Clock className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">To be received</p>
              <p className="text-2xl font-bold">200</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
