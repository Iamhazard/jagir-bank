import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/Components/Navbar/Navbar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JagirBank.com",
  description:
    "A online platform that connects businesses or individuals with freelancers",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <div className="main">
            <div className="gradient" />
          </div>
          <NavBar />
          <Toaster />
          <main className=" relative overflow-hidden">{children}</main>
        </body>
      </html>
    </SessionProvider>
  );
}
