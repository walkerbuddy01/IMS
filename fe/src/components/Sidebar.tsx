
import { Home, ShoppingCart, LineChart, BarChart3, ClipboardList, Package, Truck, Presentation, Users, Settings, LogOut, PackageSearch, ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const sidebarItems = [{
  icon: Home,
  label: "Dashboard",
  path: "/dashboard"
}, {
  icon: ShoppingCart,
  label: "Inventory",
  path: "/inventory"
}, {
  icon: LineChart,
  label: "Sale Forecast",
  path: "/sale-forecast"
}, {
  icon: BarChart3,
  label: "Inventory Forecast",
  path: "/inventory-forecast"
}, {
  icon: ClipboardList,
  label: "Product List",
  path: "/product-list"
}, {
  icon: PackageSearch,
  label: "Packing List",
  path: "/packing-list"
}, {
  icon: Truck,
  label: "Shipping Lead Time",
  path: "/shipping-lead-time"
}, {
  icon: Presentation,
  label: "Sale Data Input",
  path: "/sale-data-input"
}, {
  icon: Users,
  label: "Suppliers List",
  path: "/suppliers-list"
}];

export function AppSidebar() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Sidebar className="bg-[#1D2460] border-r-0">
      <SidebarHeader className="pb-4 bg-[#1d2460]">
        <div className="flex items-center justify-between p-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {open ? "KOVORA" : "K"}
          </h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-[#151d56] hidden md:flex"
            onClick={toggleSidebar}
          >
            {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#1d2460]">
        <SidebarMenu>
          {sidebarItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild tooltip={item.label} className="text-white hover:bg-[#151d56]">
                <NavLink to={item.path} className={({
                  isActive
                }) => isActive ? "bg-[#151d56] text-white" : "text-white"}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto bg-[#1d2460]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings" className="text-white hover:bg-[#151d56]">
              <NavLink to="/settings" className={({
                isActive
              }) => isActive ? "bg-[#151d56] text-white" : "text-white"}>
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Log Out" className="text-white hover:bg-[#151d56]">
              <NavLink to="/login" className="text-white">
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
