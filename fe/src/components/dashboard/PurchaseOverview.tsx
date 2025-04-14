
import { FileText, Clock, Ban, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PurchaseOverview() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Purchase Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <FileText className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Purchase</p>
            <p className="text-2xl font-bold">$832</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <Clock className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Coast</p>
            <p className="text-2xl font-bold">$832</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-purple-50 p-3 rounded-lg">
            <Ban className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Cancel</p>
            <p className="text-2xl font-bold">$832</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-amber-50 p-3 rounded-lg">
            <RefreshCcw className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Return</p>
            <p className="text-2xl font-bold">$832</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
