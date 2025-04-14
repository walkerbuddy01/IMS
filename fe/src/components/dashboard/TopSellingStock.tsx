
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const topSellingItems = [
  { id: 1, name: "Product A", sales: 84, revenue: "$4,200" },
  { id: 2, name: "Product B", sales: 76, revenue: "$3,800" },
  { id: 3, name: "Product C", sales: 65, revenue: "$3,250" },
  { id: 4, name: "Product D", sales: 52, revenue: "$2,600" },
  { id: 5, name: "Product E", sales: 47, revenue: "$2,350" },
];

export function TopSellingStock() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top Selling Stock</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topSellingItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">{item.sales}</TableCell>
                <TableCell className="text-right">{item.revenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
