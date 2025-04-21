import { useState } from "react";
 import { Button } from "@/components/ui/button";
 import { PaymentTermsDropdown } from "./SupplierTableDropdown";
 
 interface Props {
   onClose: () => void;
 }
 
 const paymentOptions = [
   "Deposit",
   "Before Shipping",
   "30 Days ETD",
   "60 Days ETD",
   "90 Days ETD",
 ];
 
 export default function AddSupplierDialog({ onClose }: Props) {
   const [payment, setPayment] = useState("Payment Terms");
   const [percent, setPercent] = useState("");
   return (
     <div className="w-full flex flex-col items-center p-2">
       <h2 className="text-2xl font-semibold mb-6 text-center text-[#1D2460]">New Supplier</h2>
       <form className="w-full max-w-3xl grid grid-cols-3 gap-4">
         <div className="col-span-1">
           <label className="block mb-1 font-medium text-[#262b40]">Supplier Name</label>
           <input
             type="text"
             className="w-full border rounded-md px-3 py-2 bg-[#f3f4fa] outline-none"
             placeholder="Enter Supplier Name"
           />
         </div>
         <div className="col-span-1">
           <label className="block mb-1 font-medium text-[#262b40]">Supplier Address</label>
           <input
             type="text"
             className="w-full border rounded-md px-3 py-2 bg-[#f3f4fa] outline-none mb-2"
             placeholder="Line 1"
           />
           <input
             type="text"
             className="w-full border rounded-md px-3 py-2 mt-1 bg-[#f3f4fa] outline-none mb-2"
             placeholder="Line 2"
           />
           <input
             type="text"
             className="w-full border rounded-md px-3 py-2 mt-1 bg-[#f3f4fa] outline-none"
             placeholder="Suburb"
           />
         </div>
         <div className="col-span-1 grid grid-cols-2 gap-2">
           <div>
             <label className="block mb-1 font-medium text-[#262b40]">State</label>
             <input type="text" className="w-full border rounded-md px-3 py-2 bg-[#f3f4fa] outline-none" placeholder="Enter State" />
           </div>
           <div>
             <label className="block mb-1 font-medium text-[#262b40]">Country</label>
             <input type="text" className="w-full border rounded-md px-3 py-2 bg-[#f3f4fa] outline-none" placeholder="Enter Country" />
           </div>
           <div>
             <label className="block mb-1 font-medium text-[#262b40]">Postcode</label>
             <input type="text" className="w-full border rounded-md px-3 py-2 bg-[#f3f4fa] outline-none" placeholder="Enter Postcode" />
           </div>
         </div>
         <div className="col-span-1">
           <label className="block mb-1 font-medium text-[#262b40]">Main Contact</label>
           <input type="text" className="w-full border rounded-md px-3 py-2 bg-[#f3f4fa] outline-none" placeholder="Enter Main Contact" />
         </div>
         <div className="col-span-1">
           <label className="block mb-1 font-medium text-[#262b40]">Phone Number</label>
           <input type="text" className="w-full border rounded-md px-3 py-2 bg-[#f3f4fa] outline-none" placeholder="Enter Phone Number" />
         </div>
         <div className="col-span-1">
           <label className="block mb-1 font-medium text-[#262b40]">Email</label>
           <input type="email" className="w-full border rounded-md px-3 py-2 bg-[#f3f4fa] outline-none" placeholder="Enter Email" />
         </div>
         <div className="col-span-1 flex flex-col">
           <label className="block mb-1 font-medium text-[#262b40]">Payment Terms</label>
           <PaymentTermsDropdown value={payment} setValue={setPayment} options={paymentOptions} />
         </div>
         <div className="col-span-1 flex flex-col">
           <label className="block mb-1 font-medium text-[#262b40]">%</label>
           <input
             type="text"
             className="w-full border rounded-md px-3 py-2 bg-[#f3f4fa] outline-none"
             placeholder="%"
             value={percent}
             onChange={e => setPercent(e.target.value)}
           />
           <span className="text-xs mt-1 text-[#e20000]">Percentages must add up to 100%</span>
         </div>
       </form>
       <div className="flex gap-3 mt-8 justify-center">
         <Button variant="outline" className="px-6 py-2 text-[#262b40] border-[#d5d8e7]" type="button" onClick={onClose}>Save Draft</Button>
         <Button className="px-8 py-2 bg-[#45435b] hover:bg-[#1D2460] text-white font-semibold rounded" type="submit">
           Submit
         </Button>
       </div>
     </div>
   );
 }