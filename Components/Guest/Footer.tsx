"use client";
import React, { useState } from "react";
import FooterList from "./FooterList";

const Footer: React.FC = () => {
  const [footerLists] = useState([
    {
      title: "For Clients",
      links: [
        "How to Hire",
        "Talent Marketplace",
        "Project Catalog",
        "Talent Scout",
        "Enterprise",
        "Payroll Services",
        "Direct Contracts",
        "Hire Worldwide",
        "Hire in the Nepal",
      ],
    },
    {
      title: "For Talents",
      links: [
        "How to Find Work",
        "Direct Contracts",
        "Find Freelance Jobs Worldwide",
        "Find Freelance Jobs in the Nepal",
      ],
    },
    {
      title: "Resources",
      links: [
        "Help & Support",
        "Success Stories",
        "JagirBank Reviews",
        "Resources",
        "Blog",
        "Community",
      ],
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Leadership",
        "Investor Relations",
        "Careers",
        "JagirBank Foundation",
        "Press",
        "Contact Us",
        "Trust, Safety & Security",
      ],
    },
  ]);

  return (
    <div className=" py-3 px-5 bg-Green text-white mt-14">
      <div className="  mx-auto">
        <div className="container cursor-pointer mx-auto md:flex justify-between md:border-b md:border-twilight mb-6">
          {footerLists.map((list, i) => (
            <div key={i}>
              <FooterList list={list} i={i} />
            </div>
          ))}
        </div>

        {/* copyright */}
        <div className=" mx-[150px]">
          <h4 className=" text-sm">&copy; 2023 jagirBank </h4>
          <h5 className="text-sm text-gray-300">Cloned by Hazard</h5>
        </div>
      </div>
    </div>
  );
};

export default Footer;
