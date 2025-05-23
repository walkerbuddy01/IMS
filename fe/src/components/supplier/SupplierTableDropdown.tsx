import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Upload, Download, Edit, Eye, Trash } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditSupplierDialog from "./AddSupplierDialog";

export function SupplierTableDropdown({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  return (
    <div className="relative">
      <Button
        variant="outline"
        className="px-5 py-2 font-medium text-[#262b40] flex gap-2 bg-white border"
        onClick={() => setOpen(!open)}
      >
        Actions
        <ArrowDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-lg shadow-lg bg-white border z-50">
          <button className="block w-full text-left px-4 py-2 text-[#222757] text-sm font-medium rounded-t-lg bg-[#f3f4fa] hover:bg-[#ebeef7]">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4" /> Export
            </div>
          </button>
          <button className="block w-full text-left px-4 py-2 text-[#262b40] text-sm hover:bg-[#f3f4fa]">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Import
            </div>
          </button>
          <button className="block w-full text-left px-4 py-2 text-[#262b40] text-sm hover:bg-[#f3f4fa]">
            Update Products
          </button>
          <button className="block w-full text-left px-4 py-2 text-[#262b40] text-sm hover:bg-[#f3f4fa] rounded-b-lg">
            Update Bundles
          </button>
        </div>
      )}
    </div>
  );
}


interface RowActionDropdownProps {
  supplier: {
    name: string;
    country: string;
    contact: string;
    email: string;
    payment: string;
    breakdown: string;
  };
}

export function RowActionDropdown() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center text-[#8c95b7] font-medium px-0"
        onClick={() => setOpen(!open)}
      >
        Actions
        <ArrowDown
          className={`ml-1 h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </Button>
      {open && (
        <div className="absolute left-0 mt-2 min-w-[120px] rounded-lg shadow-lg bg-white border z-50">
          <div className="w-full">
            <button className="flex w-full items-center px-4 py-2 text-[#8c95b7] text-sm hover:bg-[#f3f4fa]">
              <Eye className="mr-2 h-4 w-4" /> View
            </button>
            <button
              className="flex w-full items-center px-4 py-2 text-[#8c95b7] text-sm hover:bg-[#f3f4fa]"
              onClick={() => {
                setOpen(false);
                setEditOpen(true);
              }}
            >
              <Edit className="mr-2 h-4 w-4" /> Edit
            </button>
            <button className="flex w-full items-center px-4 py-2 text-[#e55656] text-sm hover:bg-[#fbeaea]">
              <Trash className="mr-2 h-4 w-4" />{" "}
              <span className="font-normal">Delete</span>
            </button>
          </div>
        </div>
      )}

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-4xl h-fit p-0">
          {/* <EditSupplierDialog
            // supplier={supplier}
            onClose={() => setEditOpen(false)}
          /> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
