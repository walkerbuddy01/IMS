
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const lowStockItems = [
  { id: 1, name: "Product X", quantity: 5, status: "Critical" },
  { id: 2, name: "Product Y", quantity: 8, status: "Low" },
  { id: 3, name: "Product Z", quantity: 10, status: "Low" },
  { id: 4, name: "Product W", quantity: 7, status: "Low" },
  { id: 5, name: "Product V", quantity: 3, status: "Critical" },
];

export function LowQuantityStock() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Low Quantity Stock</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "Critical" ? "destructive" : "secondary"} 
                    className={item.status === "Critical" ? "" : "bg-yellow-500 hover:bg-yellow-600"}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
