"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogoutButton } from "./logout-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { SettingsIcon } from "lucide-react";
import { IconDropdown } from "react-day-picker";

export const UserButton = () => {
  const user = useCurrentUser();
  //console.log({ user })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem>
          <IconDropdown className="h-4 w-4 mr-2" />
          {user?.role || 'Client' || 'FreeLancee || "Admin'} profile
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
        <DropdownMenuItem>
          <SettingsIcon />
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
