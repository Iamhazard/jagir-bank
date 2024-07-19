"use client"

import React, { useEffect } from "react";

import ECommerce from "../_component/E-commerce";
import withAdmin from "../_component/AdminOrder";

const DefaultDashboard = () => {



    return (
        <>
            <ECommerce />
        </>
    );
};

export default withAdmin(DefaultDashboard)
