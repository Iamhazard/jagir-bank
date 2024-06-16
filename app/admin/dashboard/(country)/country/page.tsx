'use client'
import Breadcrumb from "@/app/admin/_component/Breadcrumbs/Breadcrumb";
import CountryTable, { CountryData } from "@/app/admin/_component/Country/Countries";
import { useEffect, useState } from "react";






const CountryPage = () => {

    const [countries, setCountries] = useState<CountryData>({});

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://api.first.org/data/v1/countries");
                const data = await response.json();
                const formattedData: CountryData = {};
                Object.keys(data.data).forEach((key) => {
                    formattedData[key] = {
                        country: data.data[key].country,
                        region: data.data[key].region,
                    };
                });
                setCountries(formattedData);
            } catch (error) {
                console.error("Error fetching country data:", error);
            }
        };

        fetchCountries();
    }, []);
    return (
        <>
            <Breadcrumb pageName="Country" />

            <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
                <div className="flex flex-col gap-7.5">
                    {/* <!-- Alerts Item --> */}
                    <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                        <CountryTable countries={countries} />
                    </div>
                    {/* <!-- Alerts Item --> */}

                    {/* <!-- Alerts Item --> */}

                </div>
            </div>
        </>
    );
};

export default CountryPage;
