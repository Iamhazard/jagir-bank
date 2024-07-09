"use client"

import React, { useEffect } from "react";
import { admin } from "@/actions/admin";
import toast from "react-hot-toast";
import ECommerce from "../_component/E-commerce";
import withAdmin from "../_component/AdminOrder";

const DefaultDashboard = () => {
    const onServerActionClick = () => {
        admin().then((data) => {
            if (data.error) {
                toast.error(data.error);
            }

            if (data.success) {
                toast.success(data.success);
            }
        });
    };


    return (
        <>

        </>
    );
};

export default DefaultDashboard
