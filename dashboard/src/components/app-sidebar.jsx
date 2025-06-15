"use client";

import * as React from "react";
import {
  ChartPie,
  Users,
  Shield,
  BadgePercent,
  Settings2,
  Shirt,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import useAdminStore from "@/store/useAdminStore";
import { useEffect } from "react";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Products",
      url: "#",
      icon: Shirt,
      isActive: true,
      items: [
        {
          title: "Veiw products",
          url: "/dashboard/products",
        },
        {
          title: "Add product",
          url: "/dashboard/products/add-product",
        },
        {
          title: "Update product",
          url: "#",
        },
        {
          title: "Remove product",
          url: "#",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Veiw users",
          url: "/dashboard/products",
        },
        {
          title: "Upgrate user",
          url: "#",
        },
        {
          title: "Remove user",
          url: "#",
        },
      ],
    },
    {
      title: "Admins",
      url: "#",
      icon: Shield,
      items: [
        {
          title: "Veiw admins",
          url: "#",
        },
        {
          title: "Add admin",
          url: "#",
        },
        {
          title: "Remove admin",
          url: "#",
        },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      icon: BadgePercent,
      items: [
        {
          title: "New Offer Notification",
          url: "#",
        },
        {
          title: "New Cupon Notification",
          url: "#",
        },
        {
          title: "New Product Notification",
          url: "#",
        },
        {
          title: "New Sezon Notification",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartPie,
      items: [
        {
          title: "Revenue analytics",
          url: "#",
        },

        {
          title: "Product analytics",
          url: "#",
        },
        {
          title: "User engagement",
          url: "#",
        },
        {
          title: "Download report",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <NavUser  />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
