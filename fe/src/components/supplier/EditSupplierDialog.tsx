
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PaymentTermsDropdown } from "./SupplierTableDropdown";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EditSupplierDialogProps {
  supplier: {
    name: string;
    country: string;
    contact: string;
    email: string;
    payment: string;
    breakdown: string;
  };
  onClose: () => void;
}

const paymentOptions = [
  "Deposit",
  "Before Shipping",
  "30 Days ETD",
  "60 Days ETD",
  "90 Days ETD",
];

export default function EditSupplierDialog({ supplier, onClose }: EditSupplierDialogProps) {
  const [payment, setPayment] = useState(supplier.payment);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-8 text-center text-[#1D2460]">Edit Supplier</h2>
      
      <form className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-[#403E43]">Supplier Name</Label>
            <Input 
              defaultValue={supplier.name}
              placeholder="Enter Supplier Name"
              className="mt-1 w-full bg-white border border-gray-200"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-[#403E43]">Supplier Address</Label>
            <div className="grid grid-cols-3 gap-4 mt-1">
              <Input placeholder="Line 1" className="bg-white border border-gray-200" />
              <Input placeholder="Line 2" className="bg-white border border-gray-200" />
              <Input placeholder="Suburb" className="bg-white border border-gray-200" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-[#403E43]">State</Label>
              <Input placeholder="Enter State" className="mt-1 bg-white border border-gray-200" />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#403E43]">Country</Label>
              <Input 
                defaultValue={supplier.country}
                placeholder="Enter Country" 
                className="mt-1 bg-white border border-gray-200" 
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#403E43]">Postcode</Label>
              <Input placeholder="Enter Postcode" className="mt-1 bg-white border border-gray-200" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-[#403E43]">Main Contact</Label>
              <Input 
                defaultValue={supplier.contact}
                placeholder="Enter Main Contact" 
                className="mt-1 bg-white border border-gray-200" 
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#403E43]">Phone Number</Label>
              <Input placeholder="Enter Phone Number" className="mt-1 bg-white border border-gray-200" />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#403E43]">Email</Label>
              <Input 
                defaultValue={supplier.email}
                placeholder="Enter Email" 
                className="mt-1 bg-white border border-gray-200" 
                type="email" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-[#403E43]">Payment Terms</Label>
              <PaymentTermsDropdown value={payment} setValue={setPayment} options={paymentOptions} />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#403E43]">%</Label>
              <Input
                defaultValue={supplier.breakdown}
                placeholder="%"
                className="mt-1 bg-white border border-gray-200"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="min-w-[120px] bg-[#F1F0FB] text-[#403E43] border-[#d5d8e7]"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="min-w-[120px] bg-[#45435b] hover:bg-[#1D2460] text-white"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
