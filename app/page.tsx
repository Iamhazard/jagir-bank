import GuestSection from "@/Components/Guest";
import NavBar from "@/Components/Navbar/Navbar";

import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <NavBar />
      <div>
        <GuestSection />
      </div>
    </main>
  );
}
