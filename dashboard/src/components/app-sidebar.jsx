"use client";

import * as React from "react";
import {
  ChartPie,
  Users,
  Shield,
  BadgePercent,
  Settings2,
  Shirt,
  ChartColumnStacked,
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
          title: "Veiw Products",
          url: "/dashboard/products",
        },
        {
          title: "New Product",
          url: "/dashboard/products/create-product",
        },
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: ChartColumnStacked,
      isActive: false,
      items: [
        {
          title: "Veiw Categories",
          url: "/dashboard/categories",
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
          url: "#",
        },
        {
          title: "Create User",
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
          title: "Veiw Admins",
          url: "#",
        },
        {
          title: "Create admin",
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
          title: "Notifications",
          url: "#",
        },
        {
          title: "Veiw Cupons",
          url: "#",
        },
        {
          title: "Create Cupon",
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
          title: "Analytics",
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
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
