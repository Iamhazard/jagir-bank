import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useCurrentRole = () => {
  const session = useSession();

  useEffect

  return session.data?.user?.role;

};
