"use client"

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import ECommerce from "../_component/E-commerce";
import withAdmin from "../_component/AdminOrder";

const DefaultDashboard = () => {

    useEffect(() => {
        const onApiRouteClick = () => {
            fetch("/api/admin").then((response) => {
                if (response.ok) {
                    toast.success("Allowed API Route!");
                } else {
                    toast.error("Forbidden API Route!");
                }
            });
        };

        onApiRouteClick();
    }, []);

    return (
        <>
            <ECommerce />
        </>
    );
};

export default withAdmin(DefaultDashboard);
