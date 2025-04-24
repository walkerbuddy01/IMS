import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";

const shippingData = [
  {
    country: "USA",
    freightType: "Air",
    timeframeDays: 10,
    timeframeWeeks: 1.4,
  },
  {
    country: "China",
    freightType: "Sea",
    timeframeDays: 20,
    timeframeWeeks: 2.8,
  },
  {
    country: "Germany",
    freightType: "Express",
    timeframeDays: 30,
    timeframeWeeks: 4.2,
  },
  {
    country: "Australia",
    freightType: "Truck",
    timeframeDays: 15,
    timeframeWeeks: 2.1,
  },
];

export default function ShippingLeadTime() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shipping Lead Time</h1>
        <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
          + Add new route
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>Freight Type</TableHead>
              <TableHead>Time Frame( Days )</TableHead>
              <TableHead>Time Frame( Weeks )</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shippingData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.freightType}</TableCell>
                <TableCell className="bg-yellow-50">
                  {row.timeframeDays}
                </TableCell>
                <TableCell>{row.timeframeWeeks}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

