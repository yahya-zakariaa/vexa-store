"use client";

import { User, Bell, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useAdminStore from "@/store/useAdminStore";
import { Skeleton } from "./ui/skeleton";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { logout } = useAuthStore();
  const router = useRouter();
  const { getMe, admin } = useAdminStore();

  useEffect(() => {
    if (admin?.name) return;
    getMe();
  }, [admin]);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {admin?.name ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg me-2">
                  {admin?.image && (
                    <imageImage src={admin?.avatar} alt={admin?.name} />
                  )}
                  <AvatarFallback className="rounded-lg flex items-center justify-center">
                    {admin.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{admin?.name}</span>
                  <span className="truncate text-xs">{admin?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) mt-9 ms-2 min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg me-1">
                    <AvatarImage src={admin?.image} alt={admin?.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{admin?.name}</span>
                    <span className="truncate text-xs">{admin?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await logout();
                  return router.push("/");
                }}
                className="text-red-500 font-medium [hover]:text-red-500 flex items-center"
              >
                <LogOut className="text-red-500 mb-[-3px]" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Skeleton className={"me-2 h-[48px] w-full rounded-lg"} />
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
