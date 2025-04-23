import { useEffect, useState } from "react";
import { Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import ProductForm from "@/components/Product/ProductForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import axios from "axios";

interface Product {
  id: string;
  sku: string;
  name: string;
  type: string;
  tags: string;
  weight: string;
  declaredValue: string;
  cogValue: string;
  country: string;
  quantity: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    sku: "AUE-hg_98_c",
    name: "Classuc T-Shirt",
    type: "Apparel",
    tags: "cotton, t-shirt, unisex",
    weight: "0.25kg",
    declaredValue: "15 AUD",
    cogValue: "6 AUD",
    country: "Bangladesh",
    quantity: "120",
  },
  {
    id: "2",
    sku: "AUV-MUG-002",
    name: "Ceramic Mug 350ml",
    type: "Kitchenware",
    tags: "mug, ceramic, drinkware",
    weight: "0.45kg",
    declaredValue: "12 AUD",
    cogValue: "3.50 AUD",
    country: "China",
    quantity: "200",
  },
  {
    id: "3",
    sku: "AUV-BAG-003",
    name: "Eco Tote Bag",
    type: "Accessories",
    tags: "eco, cotton, reusable, shopping",
    weight: "0.30kg",
    declaredValue: "10 AUD",
    cogValue: "2.80 AUD",
    country: "India",
    quantity: "150",
  },
  {
    id: "4",
    sku: "AUE-hg_98_c",
    name: "Classuc T-Shirt",
    type: "Apparel",
    tags: "cotton, t-shirt, unisex",
    weight: "0.25kg",
    declaredValue: "15 AUD",
    cogValue: "6 AUD",
    country: "Bangladesh",
    quantity: "120",
  },
  {
    id: "5",
    sku: "AUV-MUG-002",
    name: "Ceramic Mug 350ml",
    type: "Kitchenware",
    tags: "mug, ceramic, drinkware",
    weight: "0.45kg",
    declaredValue: "12 AUD",
    cogValue: "3.50 AUD",
    country: "China",
    quantity: "200",
  },
  {
    id: "6",
    sku: "AUV-BAG-003",
    name: "Eco Tote Bag",
    type: "Accessories",
    tags: "eco, cotton, reusable, shopping",
    weight: "0.30kg",
    declaredValue: "10 AUD",
    cogValue: "2.80 AUD",
    country: "India",
    quantity: "150",
  },
  {
    id: "7",
    sku: "AUE-hg_98_c",
    name: "Classuc T-Shirt",
    type: "Apparel",
    tags: "cotton, t-shirt, unisex",
    weight: "0.25kg",
    declaredValue: "15 AUD",
    cogValue: "6 AUD",
    country: "Bangladesh",
    quantity: "120",
  },
  {
    id: "8",
    sku: "AUV-MUG-002",
    name: "Ceramic Mug 350ml",
    type: "Kitchenware",
    tags: "mug, ceramic, drinkware",
    weight: "0.45kg",
    declaredValue: "12 AUD",
    cogValue: "3.50 AUD",
    country: "China",
    quantity: "200",
  },
  {
    id: "9",
    sku: "AUV-BAG-003",
    name: "Eco Tote Bag",
    type: "Accessories",
    tags: "eco, cotton, reusable, shopping",
    weight: "0.30kg",
    declaredValue: "10 AUD",
    cogValue: "2.80 AUD",
    country: "India",
    quantity: "150",
  },
  {
    id: "10",
    sku: "AUE-hg_98_c",
    name: "Classuc T-Shirt",
    type: "Apparel",
    tags: "cotton, t-shirt, unisex",
    weight: "0.25kg",
    declaredValue: "15 AUD",
    cogValue: "6 AUD",
    country: "Bangladesh",
    quantity: "120",
  },
];

export interface freightOptionsI {
  _id: string;
  method: string;
  leadTimeDays: number;
  cost: number;
}

export interface warehouseI {
  _id: string;
  name: string;
  address: string;
  capacity: number;
  code: string;
  contactPerson: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  status: string;
  phone: string;
}

export interface supplierI {
  _id: string;
  name: string;
  address: string;
  contactPerson: string;
  paymentTerms: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  phone: string;
}

export default function ProductList() {
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "draft">(
    "all"
  );
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [freightOptions, setFreightOptions] = useState<freightOptionsI[] | []>(
    []
  );
  const [warehouses, setWarehouses] = useState<warehouseI[] | []>([]);
  const [suppliers, setSupplier] = useState<supplierI[] | []>([]);
  const [products, setProduct] = useState<supplierI[] | []>([]);

  const fetchingFreightOptions = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BE_URL + "/api/v1/freightOption"
      );

      setFreightOptions(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchingWarehouses = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BE_URL + "/api/v1/warehouse"
      );

      setWarehouses(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchingSuppliers = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BE_URL + "/api/v1/supplier"
      );

      setSupplier(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BE_URL + "/api/v1/product"
      );
      console.log(response.data.data);
      setProduct(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchingFreightOptions();
    fetchingWarehouses();
    fetchingSuppliers();
    fetchAllProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">Product List</h1>

        {/* Filter tabs */}
        <div className="flex space-x-4 pb-4">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            className={`w-32 ${filterStatus === "all" ? "bg-[#1D2460]" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "active" ? "default" : "outline"}
            className={`w-32 ${
              filterStatus === "active" ? "bg-[#1D2460]" : ""
            }`}
            onClick={() => setFilterStatus("active")}
          >
            Active
          </Button>
          <Button
            variant={filterStatus === "draft" ? "default" : "outline"}
            className={`w-32 ${filterStatus === "draft" ? "bg-[#1D2460]" : ""}`}
            onClick={() => setFilterStatus("draft")}
          >
            Draft
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div>{/* Table actions could be added here */}</div>
          <div className="flex gap-4">
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setActionsOpen(!actionsOpen)}
                className="flex items-center gap-2"
              >
                Actions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
                    actionsOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>

              {actionsOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Export
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Import
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Update Products
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Update Bundles
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={() => setIsAddProductOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>

            <Button variant="outline" className="p-2">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox />
              </TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Product Type</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Declared Value</TableHead>
              <TableHead>Cost of Goods Value</TableHead>
              <TableHead>Country of Manufacturer</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.tags}</TableCell>
                <TableCell>{product.dimensions.weight}</TableCell>
                <TableCell>{product.pricing.originalPrice}</TableCell>
                <TableCell>{product.pricing.cogs}</TableCell>
                <TableCell>{product.shipping.countryOrigin}</TableCell>
                <TableCell>{product.inventory.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <Button variant="outline">Previous</Button>
          <div className="text-sm text-gray-500">Page 1 of 10</div>
          <Button variant="outline">Next</Button>
        </div>
      </div>

      {/* Product Form Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-4xl h-[80vh] overflow-auto">
          <ProductForm
            freightOptions={freightOptions}
            warehouses={warehouses}
            suppliers={suppliers}
            onClose={() => setIsAddProductOpen(false)}
            fetchAllProducts={fetchAllProducts}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
