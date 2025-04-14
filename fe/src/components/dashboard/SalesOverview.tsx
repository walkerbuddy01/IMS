
import { DollarSign, BarChart, PieChart, DollarSign as Dollar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SalesOverview() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <BarChart className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Sales</p>
            <p className="text-2xl font-bold">$832</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-purple-50 p-3 rounded-lg">
            <DollarSign className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Revenue</p>
            <p className="text-2xl font-bold">$18,300</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-amber-50 p-3 rounded-lg">
            <PieChart className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Profit</p>
            <p className="text-2xl font-bold">$868</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <Dollar className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Cost</p>
            <p className="text-2xl font-bold">$17,432</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
