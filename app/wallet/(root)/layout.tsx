import getCurrentUser from "@/actions/getCurrentUser";
import MobileNav from "@/Components/wallet/WalletMobileNavbar";

import WalletSidebar from "@/Components/wallet/WSideBar";
import dynamic from 'next/dynamic'
//import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function WalletRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn = await getCurrentUser();

    if (!loggedIn) redirect('/sign-in')

    return (
        <main className="flex h-screen w-full font-inter">
            <WalletSidebar user={loggedIn} />
            <div className="flex size-full flex-col">
                <div className="flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden">
                    <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
                    <div>
                        <MobileNav user={loggedIn} />
                    </div>
                </div>
                {children}
            </div>
        </main>
    );
}