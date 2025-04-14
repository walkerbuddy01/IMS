
import { SalesOverview } from "@/components/dashboard/SalesOverview";
import { PurchaseOverview } from "@/components/dashboard/PurchaseOverview";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { OrderChart } from "@/components/dashboard/OrderChart";
import { TopSellingStock } from "@/components/dashboard/TopSellingStock";
import { LowQuantityStock } from "@/components/dashboard/LowQuantityStock";
import { InventorySummary } from "@/components/dashboard/InventorySummary";
import { ProductSummary } from "@/components/dashboard/ProductSummary";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Welcome back, Lyn! <span className="font-normal text-muted-foreground">Here's what's been happening in your business</span>
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SalesOverview />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <PurchaseOverview />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InventorySummary />
          <ProductSummary />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <OrderChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SalesChart />
        <div className="grid grid-cols-1 gap-6">
          <TopSellingStock />
          <LowQuantityStock />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
