import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const salesData = [
  {
    product: "Wireless Mouse",
    sku: "WM-001",
    apr1: 15,
    apr2: 12,
    apr3: 18,
    apr4: 20,
    apr5: 17,
    apr6: 15,
  },
  {
    product: "Mechanical Keyboard",
    sku: "MK-002",
    apr1: 8,
    apr2: 10,
    apr3: 9,
    apr4: 11,
    apr5: 13,
    apr6: 11,
  },
  {
    product: "USB-C Charger",
    sku: "UC-003",
    apr1: 20,
    apr2: 22,
    apr3: 18,
    apr4: 24,
    apr5: 21,
    apr6: 24,
  },
  {
    product: "Bluetooth Speaker",
    sku: "BS-004",
    apr1: 5,
    apr2: 7,
    apr3: 6,
    apr4: 8,
    apr5: 9,
    apr6: 11,
  },
  {
    product: "HD Webcam",
    sku: "WC-005",
    apr1: 12,
    apr2: 14,
    apr3: 13,
    apr4: 15,
    apr5: 16,
    apr6: 19,
  },
];

export default function SaleDataInput() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sales Data</h1>
      </div>

      <div className="flex gap-4 mb-6">
        <Input placeholder="Product" className="max-w-[200px]" />
        <Input placeholder="SKU" className="max-w-[200px]" />
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Apr 1</TableHead>
              <TableHead>Apr 2</TableHead>
              <TableHead>Apr 3</TableHead>
              <TableHead>Apr 4</TableHead>
              <TableHead>Apr 5</TableHead>
              <TableHead>Apr 6</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.sku}</TableCell>
                <TableCell>{row.apr1}</TableCell>
                <TableCell>{row.apr2}</TableCell>
                <TableCell>{row.apr3}</TableCell>
                <TableCell>{row.apr4}</TableCell>
                <TableCell>{row.apr5}</TableCell>
                <TableCell>{row.apr6}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex gap-4 mt-4">
        <Button variant="ghost" className="hover:bg-gray-100">
          Daily
        </Button>
        <Button variant="ghost" className="hover:bg-gray-100">
          Weekly
        </Button>
        <Button variant="ghost" className="hover:bg-gray-100">
          Monthly
        </Button>
      </div>
    </div>
  );
}
