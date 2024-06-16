"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "../_component/css/satoshi.css"
//import "../dashboard/css/style.css"
import React, { useEffect, useState } from "react";
import Loader from "@/Components/common/Loader";
import DefaultLayout from "../_component/DefaultLayout";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    // const pathname = usePathname();

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <div className="dark:bg-boxdark-2 dark:text-bodydark">
                    <DefaultLayout>
                        {loading ? <Loader /> : children}
                    </DefaultLayout>

                </div>
            </body>
        </html>
    );
}
