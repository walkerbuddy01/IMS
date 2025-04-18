import { useState } from "react";
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

interface ProductFormProps {
  onClose: () => void;
}

export default function ProductForm({ onClose }: ProductFormProps) {
  const [activeTab, setActiveTab] = useState("product-details");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
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
                <Input id="product-title" placeholder="Enter product title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-sku">SKU</Label>
                <Input id="product-sku" placeholder="Enter product SKU" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-barcode">Barcode</Label>
                <Input
                  id="product-barcode"
                  placeholder="Enter product barcode"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input id="weight" placeholder="Enter product weight" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Input id="length" placeholder="Enter product length" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input id="width" placeholder="Enter product width" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input id="height" placeholder="Enter product height" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose supplier from brand's listse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supplier1">Supplier 1</SelectItem>
                <SelectItem value="supplier2">Supplier 2</SelectItem>
                <SelectItem value="supplier3">Supplier 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        {/* Shipping Details Tab */}
        <TabsContent value="shipping-details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="weight-shipping">Weight</Label>
                <Input
                  id="weight-shipping"
                  placeholder="Enter product weight"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="length-shipping">Length</Label>
                <Input
                  id="length-shipping"
                  placeholder="Enter product length"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="width-shipping">Width</Label>
                <Input id="width-shipping" placeholder="Enter product width" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height-shipping">Height</Label>
                <Input
                  id="height-shipping"
                  placeholder="Enter product height"
                />
              </div>
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
            <Input id="country-origin" placeholder="Enter country origin" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hs-code">HS code</Label>
            <Input id="hs-code" placeholder="Enter HS code" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customs-description">Customs Description</Label>
            <Textarea
              id="customs-description"
              placeholder="Customs Description"
              className="h-32"
            />
          </div>
        </TabsContent>

        {/* Inventory Planning Tab */}
        <TabsContent value="inventory-planning" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="warehouse">Warehouse</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warehouse1">Warehouse 1</SelectItem>
                <SelectItem value="warehouse2">Warehouse 2</SelectItem>
                <SelectItem value="warehouse3">Warehouse 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergency-stock">Emergency stock level</Label>
            <Input
              id="emergency-stock"
              placeholder="Enter the lowest stock level"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-lead-time">Product lead time</Label>
            <Input id="product-lead-time" placeholder="e.g. 14 days" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="moq">MOQ</Label>
              <Input id="moq" placeholder="Minimum order quantity" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cogs">COGs</Label>
              <Input id="cogs" placeholder="Cost of Goods Sold" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-terms">Payment terms</Label>
            <Select>
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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Freight solution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sea">SEA</SelectItem>
                <SelectItem value="air">AIR</SelectItem>
                <SelectItem value="lcl">LCL</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
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
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
