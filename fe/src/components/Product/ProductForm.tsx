import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Package, Truck, ClipboardList } from "lucide-react";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { toast } from "sonner";
import axios from "axios";
import { freightOptionsI, supplierI, warehouseI } from "@/pages/ProductList";

interface ProductFormProps {
  freightOptions: freightOptionsI[];
  warehouses: warehouseI[];
  suppliers: supplierI[];
  onClose: () => void;
  fetchAllProducts: () => void;
}

export default function ProductForm({
  freightOptions,
  warehouses,
  suppliers,
  onClose,
  fetchAllProducts,
}: ProductFormProps) {
  const [form, setForm] = useState({
    title: "",
    sku: "",
    barcode: "",
    originalPrice: 0,
    cogs: 0,
    retail: 0,
    supplierId: "",
    warehouseId: "",
    emergencyStockLevel: 0,
    moq: 0,
    productionLeadTime: 0,
    freightId: "",
    paymentTerms: "",
    ProductImageUrl: "https://example.com/images/product1.jpg",
    status: "active",
    cartonWeight: 0,
    cartonLength: 0,
    cartonWidth: 0,
    cartonHeight: 0,
    countryOrigin: "",
    hsCode: "",
    customsDescription: "",
    productLength: 0,
    productWidth: 0,
    productHeight: 0,
    productWeight: 0,
  });

  const { mutate: createProduct } = useCreateProduct(
    () => {
      fetchAllProducts();
      toast.success("Product created!");
      onClose();
    },
    (err) => {
      fetchAllProducts();
      toast.error("Failed to create product");
      console.error(err);
    }
  );

  const [activeTab, setActiveTab] = useState("product-details");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = () => {
    createProduct(form);
   
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">New Product</h2>
        <Button variant="default" className="bg-green-500 hover:bg-green-600">
          Active
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger
            value="product-details"
            className="flex items-center gap-2"
          >
            <Package className="h-4 w-4" />
            <span>Product Details</span>
          </TabsTrigger>
          <TabsTrigger
            value="shipping-details"
            className="flex items-center gap-2"
          >
            <Truck className="h-4 w-4" />
            <span>Shipping Details</span>
          </TabsTrigger>
          <TabsTrigger
            value="inventory-planning"
            className="flex items-center gap-2"
          >
            <ClipboardList className="h-4 w-4" />
            <span>Inventory Planning Details</span>
          </TabsTrigger>
        </TabsList>

        {/* Product Details Tab */}
        <TabsContent value="product-details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center min-h-[200px]">
              {imageUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={imageUrl}
                    alt="Product"
                    className="w-full h-full object-contain"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setImageUrl(null)}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-2">Drag image here</p>
                  <Label
                    htmlFor="product-image"
                    className="text-sm text-blue-500 cursor-pointer hover:underline"
                  >
                    Browse Image
                  </Label>
                  <Input
                    id="product-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="product-title">Product Title</Label>
                <Input
                  id="product-title"
                  placeholder="Enter product title"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-sku">SKU</Label>
                <Input
                  id="product-sku"
                  placeholder="Enter product SKU"
                  value={form.sku}
                  onChange={(e) => handleChange("sku", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-barcode">Barcode</Label>
                <Input
                  id="product-barcode"
                  placeholder="Enter product barcode"
                  value={form.barcode}
                  onChange={(e) => handleChange("barcode", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                placeholder="Enter product weight"
                value={form.productWeight}
                onChange={(e) => handleChange("productWeight", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                placeholder="Enter product length"
                value={form.productLength}
                onChange={(e) => handleChange("productLength", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                placeholder="Enter product width"
                value={form.productWidth}
                onChange={(e) => handleChange("productWidth", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                placeholder="Enter product height"
                value={form.productHeight}
                onChange={(e) => handleChange("productHeight", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Select
              value={form.supplierId}
              onValueChange={(value) => handleChange("supplierId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose supplier" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(suppliers) &&
                  suppliers.map((supplier) => (
                    <SelectItem value={supplier._id}>
                      {supplier.address} {supplier.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        {/* Shipping Details Tab */}
        <TabsContent value="shipping-details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                "cartonWeight",
                "cartonLength",
                "cartonWidth",
                "cartonHeight",
              ].map((field, idx) => (
                <div className="space-y-2" key={field}>
                  <Label htmlFor={field}>{field.replace("shipping", "")}</Label>
                  <Input
                    id={field}
                    placeholder={`Enter product ${field
                      .replace("shipping", "")
                      .toLowerCase()}`}
                    value={form[field as keyof typeof form]}
                    onChange={(e) =>
                      handleChange(field as keyof typeof form, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/box.png"
                alt="Box dimensions"
                className="max-w-[240px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country-origin">Country origin</Label>
            <Input
              id="country-origin"
              placeholder="Enter country origin"
              value={form.countryOrigin}
              onChange={(e) => handleChange("countryOrigin", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hs-code">HS code</Label>
            <Input
              id="hs-code"
              placeholder="Enter HS code"
              value={form.hsCode}
              onChange={(e) => handleChange("hsCode", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customs-description">Customs Description</Label>
            <Textarea
              id="customs-description"
              placeholder="Customs Description"
              className="h-32"
              value={form.customsDescription}
              onChange={(e) =>
                handleChange("customsDescription", e.target.value)
              }
            />
          </div>
        </TabsContent>

        {/* Inventory Planning Tab */}
        <TabsContent value="inventory-planning" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="warehouse">Warehouse</Label>
            <Select
              value={form.warehouseId}
              onValueChange={(value) => handleChange("warehouseId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose warehouse" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(warehouses) &&
                  warehouses.map((warehouse) => (
                    <SelectItem value={warehouse._id}>
                      {warehouse.address} {warehouse.country}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergency-stock">Emergency stock level</Label>
            <Input
              id="emergency-stock"
              placeholder="Enter the lowest stock level"
              value={form.emergencyStockLevel}
              onChange={(e) =>
                handleChange("emergencyStockLevel", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-lead-time">Product lead time</Label>
            <Input
              id="product-lead-time"
              placeholder="e.g. 14 days"
              value={form.productionLeadTime}
              onChange={(e) =>
                handleChange("productionLeadTime", e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="moq">MOQ</Label>
              <Input
                id="moq"
                placeholder="Minimum order quantity"
                value={form.moq}
                onChange={(e) => handleChange("moq", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cogs">COGs</Label>
              <Input
                id="cogs"
                placeholder="Cost of Goods Sold"
                value={form.cogs}
                onChange={(e) => handleChange("cogs", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-terms">Payment terms</Label>
            <Select
              value={form.paymentTerms}
              onValueChange={(value) => handleChange("paymentTerms", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Payment terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="net30">Net 30</SelectItem>
                <SelectItem value="net60">Net 60</SelectItem>
                <SelectItem value="cod">Cash on Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="freight">Freight</Label>
            <Select
              value={form.freightId}
              onValueChange={(value) => handleChange("freightId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Freight solution" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(freightOptions) &&
                  freightOptions.map((freightOption) => (
                    <SelectItem value={freightOption._id}>
                      {freightOption.method} {freightOption.cost}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <div className="space-x-2">
          <Button variant="outline">Save as Draft</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
}
