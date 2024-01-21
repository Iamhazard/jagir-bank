"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import GuestLogin from "./Guest";
// import LoginForm from "./Loginform";
// import RegisterForm from "./RegisterForm";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const Onclick = () => {
    console.log("Button clicked");
    router.push("/auth/guest");
  };
  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <GuestLogin />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={Onclick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
