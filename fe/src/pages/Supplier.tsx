
import { useState } from "react";
import { Plus, ArrowDown, Eye, Edit, Trash, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import AddSupplierDialog from "@/components/supplier/AddSupplierDialog";
import { SupplierTableDropdown, PaymentTermsDropdown, RowActionDropdown } from "../components/supplier/SupplierTableDropdown";

const suppliers = [
  { name: "Richard Martin", country: "USA", contact: "7087745658", email: "richard@gmail.com", payment: "Deposit + 30 ETD", breakdown: "20% / 80%" },
  { name: "Tom Homan", country: "China", contact: "9867543658", email: "tomhoman@gmail.com", payment: "60 Days ETD", breakdown: "100%" },
  { name: "Veandir", country: "Australia", contact: "9867545656", email: "veandir@gmail.com", payment: "Deposit + 90 Days", breakdown: "30% / 70%" },
  { name: "Charin", country: "Germany", contact: "9267546457", email: "charin@gmail.com", payment: "Before Shipping", breakdown: "100%" },
  { name: "Hoffman", country: "Spain", contact: "9876545631", email: "hoffman@gmail.com", payment: "Deposit + 60 ETD", breakdown: "40% / 60%" },
  { name: "Faiden Juke", country: "France", contact: "9657546567", email: "faiden@gmail.com", payment: "Deposit + 30 ETD", breakdown: "20% / 80%" },
  { name: "Martin", country: "UK", contact: "9657546567", email: "martin@gmail.com", payment: "60 Days ETD", breakdown: "100%" },
  { name: "Joe Nike", country: "Italia", contact: "9657545769", email: "joenike@gmail.com", payment: "Deposit + 90 Days", breakdown: "30% / 70%" },
  { name: "Dender Luke", country: "Greece", contact: "9657546579", email: "dender@gmail.com", payment: "Before Shipping", breakdown: "100%" },
  { name: "Martin", country: "USA", contact: "9657545769", email: "martin@gmail.com", payment: "Deposit + 60 ETD", breakdown: "40% / 60%" },
  { name: "Joe Nike", country: "Spain", contact: "9657545769", email: "joenike@gmail.com", payment: "Deposit + 90 Days", breakdown: "30% / 70%" },
  { name: "Joe Nike", country: "UK", contact: "9657545769", email: "joenike@gmail.com", payment: "60 Days ETD", breakdown: "100%" },
];

export default function SuppliersList() {
  const [addOpen, setAddOpen] = useState(false);
  const [countryFilter, setCountryFilter] = useState("Country");
  const [actionOpen, setActionOpen] = useState(false);

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
              <Plus className="mr-2 h-5 w-5" />
              Add new Supplier
            </Button>
            <PaymentTermsDropdown
              value={countryFilter}
              setValue={setCountryFilter}
              options={["Country", "USA", "China", "UK", "Australia"]}
            />
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
              {suppliers.map((s, i) => (
                <TableRow key={i} className="hover:bg-[#f0f4fe]">
                  <TableCell className="font-medium text-[#1D2460]">{s.name}</TableCell>
                  <TableCell>{s.country}</TableCell>
                  <TableCell>{s.contact}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.payment}</TableCell>
                  <TableCell>{s.breakdown}</TableCell>
                  <TableCell>
                    <RowActionDropdown />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center px-4 py-2 border-t bg-[#f3f4fa]">
            <Button variant="outline" className="text-[#1D2460] border-[#d5d8e7]">Previous</Button>
            <div className="text-xs text-[#262b40]">Page 1 of 10</div>
            <Button variant="outline" className="text-[#1D2460] border-[#d5d8e7]">Next</Button>
          </div>
        </div>
      </div>
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-4xl h-fit rounded-2xl px-8 py-6">
          <AddSupplierDialog onClose={() => setAddOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}