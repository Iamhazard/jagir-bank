/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
export const dynamic = 'force-dynamic'


import { getLoggedInUser } from "@/actions/bankUseractions";
import MobileNav from "@/Components/wallet/WalletMobileNavbar";
import WalletSidebar from "@/Components/wallet/WSideBar";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-ibm-plex-serif'
})



export default async function WalletLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) redirect('/sign-in')
    return (
        <main className="flex h-screen w-full font-inter">
            <WalletSidebar user={loggedIn} />
            <div className="flex size-full flex-col">
                <div className="flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden">
                    <img src="/icons/logo.svg" width={30} height={30} alt="logo" />
                    <div>
                        <MobileNav user={loggedIn} />
                    </div>
                </div>
                {children}
            </div>
        </main>
    );
}