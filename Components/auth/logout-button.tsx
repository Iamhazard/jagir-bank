"use client";

import { useState } from "react";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      // Perform client-side logout
      await signOut({ redirect: false });

      // Call server action to clear server-side session
      await logout();

      // Redirect after successful logout
      router.push("/");
      router.refresh(); // Refresh the current route
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <span
      onClick={onClick}
      className={`cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
      style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
    >
      {isLoading ? "Logging out..." : children}
    </span>
  );
};