
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Download, Filter, Plus } from "lucide-react";

export default function Inventory() {
  const [activeTab, setActiveTab] = useState("global");
  
  const inventorySummary = [
    { title: "Categories", value: "14", subtext: "Last 7 days" },
    { title: "Total Product", value: "868", subtext: "Last 7 days", valueText: "$25000", valueSubtext: "Revenue" },
    { title: "Top Selling", value: "5", subtext: "Last 7 days", valueText: "$2500", valueSubtext: "Cost" },
    { title: "Low Stocks", value: "12", subtext: "Ordered", valueText: "2", valueSubtext: "Not in stock" },
  ];

  const inventoryItems = [
    { id: 1, sku: "AUS-vib-1234", title: "Visit", available: 3, reserved: 0, days: "916", incoming: 7, progress: 0, reorder: 2 },
    { id: 2, sku: "AUS-vib-1234", title: "Visit", available: 3, reserved: 0, days: "Out of stock", incoming: 7, progress: 0, reorder: 2 },
    { id: 3, sku: "AUS-vib-1234", title: "Visit", available: 3, reserved: 0, days: "916", incoming: 7, progress: 0, reorder: 2 },
    { id: 4, sku: "AUS-vib-1234", title: "Visit", available: 3, reserved: 0, days: "916", incoming: 7, progress: 0, reorder: 2 },
    { id: 5, sku: "AUS-vib-1234", title: "Visit", available: 3, reserved: 0, days: "Out of stock", incoming: 7, progress: 0, reorder: 2 },
    { id: 6, sku: "AUS-vib-1234", title: "Visit", available: 3, reserved: 0, days: "916", incoming: 7, progress: 0, reorder: 2 },
    { id: 7, sku: "AUS-vib-1234", title: "Visit", available: 3, reserved: 0, days: "916", incoming: 7, progress: 0, reorder: 2 },
    { id: 8, sku: "AUS-vib-1234", title: "Visit", available: 3, reserved: 0, days: "916", incoming: 7, progress: 0, reorder: 2 },
    { id: 9, sku: "AUS-vib-1234", title: "Visit", available: 3, reserved: 0, days: "916", incoming: 7, progress: 0, reorder: 2 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overall Inventory</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventorySummary.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-gray-600 font-medium">{item.title}</span>
                <div className="flex justify-between items-end mt-2">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">{item.value}</span>
                    <span className="text-sm text-gray-500">{item.subtext}</span>
                  </div>
                  {item.valueText && (
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold">{item.valueText}</span>
                      <span className="text-sm text-gray-500">{item.valueSubtext}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Products Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Product</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button className="gap-2 bg-blue-500 hover:bg-blue-600">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 border-b w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="global" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Global
              </TabsTrigger>
              <TabsTrigger 
                value="aus" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                AUS
              </TabsTrigger>
              <TabsTrigger 
                value="us" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                US
              </TabsTrigger>
              <TabsTrigger 
                value="uk" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                UK
              </TabsTrigger>
              <TabsTrigger 
                value="amazon" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Amazon
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0 p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="w-[150px]">SKU</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Reserved / Emergency SKU</TableHead>
                      <TableHead>Estimated Days Remaining</TableHead>
                      <TableHead>Incoming/ In Freight</TableHead>
                      <TableHead>PO In Progress</TableHead>
                      <TableHead>Days till reorder</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.available}</TableCell>
                        <TableCell>{item.reserved}</TableCell>
                        <TableCell className={item.days === "Out of stock" ? "text-red-500 font-medium" : ""}>
                          {item.days}
                        </TableCell>
                        <TableCell>{item.incoming}</TableCell>
                        <TableCell>{item.progress}</TableCell>
                        <TableCell>{item.reorder}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between p-4 border-t">
                <Button variant="outline" size="sm">Previous</Button>
                <div className="text-sm text-gray-500">Page 1 of 10</div>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
