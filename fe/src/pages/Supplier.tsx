import AddSupplierDialog from "@/components/supplier/AddSupplierDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  RowActionDropdown,
  SupplierTableDropdown,
} from "../components/supplier/SupplierTableDropdown";
import axios from "axios";


export default function SuppliersList() {
  const [addOpen, setAddOpen] = useState(false);
  const [countryFilter, setCountryFilter] = useState("Country");
  const [actionOpen, setActionOpen] = useState(false);
  const [suppliers, setSupplier] = useState([]);

  const fetchingSuppliers = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BE_URL + "/api/v1/supplier"
      );

      console.log(response.data.data);

      setSupplier(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchingSuppliers();
  }, []);

  return (
    <div className="bg-[#f3f4fa] min-h-screen px-8 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg lg:text-2xl font-medium">Suppliers</h1>
          <div className="flex gap-3">
            <Button
              className="bg-[#1D2460] hover:bg-[#283a9d] text-white font-medium rounded-md px-6 py-2"
              onClick={() => setAddOpen(true)}
            >
              <Plus className="mr-1 h-5 w-5" />
              Add new Supplier
            </Button>
            <Select
              value={countryFilter}
              onValueChange={(value) => setCountryFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose supplier" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray([
                  "Country",
                  "USA",
                  "China",
                  "UK",
                  "Australia",
                ]) &&
                  ["Country", "USA", "China", "UK", "Australia"].map(
                    (countryOption) => (
                      <SelectItem value={countryOption}>
                        {countryOption}
                      </SelectItem>
                    )
                  )}
              </SelectContent>
            </Select>
            <SupplierTableDropdown open={actionOpen} setOpen={setActionOpen} />
          </div>
        </div>
        <div className="rounded-lg shadow-sm border bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#f3f4fa]">
                <TableHead>Supplier Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Contact Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead>% Breakdown</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(suppliers) &&
                suppliers.map((s, i) => (
                  <TableRow key={i} className="hover:bg-[#f0f4fe]">
                    <TableCell className="font-medium text-[#1D2460]">
                      {s.name}
                    </TableCell>
                    <TableCell>{s.country}</TableCell>
                    <TableCell>{s.phone}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.paymentTerms}</TableCell>
                    <TableCell>{s.percentage}</TableCell>
                    <TableCell>
                      <RowActionDropdown />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center px-4 py-2 border-t bg-[#f3f4fa]">
            <Button
              variant="outline"
              className="text-[#1D2460] border-[#d5d8e7]"
            >
              Previous
            </Button>
            <div className="text-xs text-[#262b40]">Page 1 of 10</div>
            <Button
              variant="outline"
              className="text-[#1D2460] border-[#d5d8e7]"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-4xl h-fit rounded-2xl px-8 py-6">
          <AddSupplierDialog fetchingSuppliers={fetchingSuppliers} onClose={() => setAddOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
