import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateSupplier } from "@/hooks/useCreateSupplier";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  onClose: () => void;
  fetchingSuppliers: () => void;
}

const paymentOptions = [
  "Deposit",
  "Before Shipping",
  "30 Days ETD",
  "60 Days ETD",
  "90 Days ETD",
];

// {
//   "name": "Alpha Global Distributors",
//   "contactPerson": "Rajiv Mehta",
//   "email": "contact@alphaglobal.com",
//   "phone": "+91-9876543210",
//   "address": "221 Residency Road, Bengaluru, India",
//   "country": "India",
//   "paymentTerms": "Net 15",
//   "leadTime": 12
// }

export interface supplierDetailsI {
  supplierName: string;
  line1: string;
  line2: string;
  Suburb: string;
  state: string;
  country: string;
  postcode: string;
  contactPerson: string;
  paymentTerms: string;
  percentage: number;
  leadTime: number;
  phone: number;
  email: string;
}

export default function AddSupplierDialog({
  onClose,
  fetchingSuppliers,
}: Props) {
  const [formData, setFormData] = useState<supplierDetailsI>({
    supplierName: "",
    line1: "",
    line2: "",
    Suburb: "",
    state: "",
    country: "",
    postcode: "",
    contactPerson: "",
    paymentTerms: "",
    percentage: 0,
    phone: 0,
    email: "",
    leadTime: 0,
  });

  const { mutate: createSupplier } = useCreateSupplier(
    () => {
      fetchingSuppliers();
      toast.success("Product created!");
      onClose();
    },
    (err) => {
      toast.error("Failed to create product");
      console.error(err);
    }
  );

  function handleChange(field: keyof typeof formData, value: string | number) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-8 text-center text-[#1D2460]">
        New Supplier
      </h2>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          createSupplier(formData);
        }}
      >
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-[#403E43]">
              Supplier Name
            </Label>
            <Input
              placeholder="Enter Supplier Name"
              value={formData.supplierName}
              onChange={(e) => {
                handleChange("supplierName", e.target.value);
              }}
              className="mt-1 w-full bg-white border border-gray-200"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-[#403E43]">
              Supplier Address
            </Label>
            <div className="grid grid-cols-3 gap-4 mt-1">
              <Input
                placeholder="Line 1"
                value={formData.line1}
                onChange={(e) => {
                  handleChange("line1", e.target.value);
                }}
                className="bg-white border border-gray-200"
              />
              <Input
                placeholder="Line 2"
                value={formData.line2}
                onChange={(e) => {
                  handleChange("line2", e.target.value);
                }}
                className="bg-white border border-gray-200"
              />
              <Input
                placeholder="Suburb"
                value={formData.Suburb}
                onChange={(e) => {
                  handleChange("Suburb", e.target.value);
                }}
                className="bg-white border border-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-[#403E43]">
                State
              </Label>
              <Input
                placeholder="Enter State"
                value={formData.state}
                onChange={(e) => {
                  handleChange("state", e.target.value);
                }}
                className="mt-1 bg-white border border-gray-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#403E43]">
                Country
              </Label>
              <Input
                placeholder="Enter Country"
                value={formData.country}
                onChange={(e) => {
                  handleChange("country", e.target.value);
                }}
                className="mt-1 bg-white border border-gray-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#403E43]">
                Postcode
              </Label>
              <Input
                placeholder="Enter Postcode"
                value={formData.postcode}
                onChange={(e) => {
                  handleChange("postcode", e.target.value);
                }}
                className="mt-1 bg-white border border-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-[#403E43]">
                Main Contact
              </Label>
              <Input
                placeholder="Enter Main Contact"
                value={formData.contactPerson}
                onChange={(e) => {
                  handleChange("contactPerson", e.target.value);
                }}
                className="mt-1 bg-white border border-gray-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#403E43]">
                Phone Number
              </Label>
              <Input
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={(e) => {
                  handleChange("phone", e.target.value);
                }}
                className="mt-1 bg-white border border-gray-200"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#403E43]">
                Email
              </Label>
              <Input
                placeholder="Enter Email"
                value={formData.email}
                onChange={(e) => {
                  handleChange("email", e.target.value);
                }}
                className="mt-1 bg-white border border-gray-200"
                type="email"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="supplier">Payment Terms</Label>
              <Select
                value={formData.paymentTerms}
                onValueChange={(value) => handleChange("paymentTerms", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose supplier" />
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(paymentOptions) &&
                    paymentOptions.map((paymentOption) => (
                      <SelectItem value={paymentOption}>
                        {paymentOption}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-[#403E43]">%</Label>
              <Input
                placeholder="%"
                value={formData.percentage}
                onChange={(e) => handleChange("percentage", e.target.value)}
                className="mt-1 bg-white border border-gray-200"
              />
              <span className="text-xs mt-1 text-[#e20000] block">
                Percentages must add up to 100%
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={onClose}
            className="min-w-[120px] bg-[#F1F0FB] text-[#403E43] border-[#d5d8e7]"
          >
            Save Draft
          </Button>
          <Button
            className="min-w-[120px] bg-[#45435b] hover:bg-[#1D2460] text-white"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
