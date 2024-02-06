import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/Components/Navbar/Navbar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import Providers from "@/Components/AIbot/Providers";

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
        <Providers>
          <body className={inter.className}>
            <div className="main" />

            <Toaster />

            <div className="flex-grow flex-1">{children}</div>
          </body>
        </Providers>
      </html>
    </SessionProvider>
  );
}
