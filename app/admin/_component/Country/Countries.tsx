


export interface CountryData {
    [key: string]: {
        country: string;
        region: string;
    };
}

interface TableOneProps {
    countries: CountryData;
}

const CountryTable = ({ countries }: TableOneProps) => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                Countries
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            S.N
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Country Name
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Region
                        </h5>
                    </div>
                </div>

                {Object.entries(countries).map(([code, country], index) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${index === Object.keys(countries).length - 1
                            ? ""
                            : "border-b border-stroke dark:border-strokedark"
                            }`}
                        key={code}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <p className="hidden text-black dark:text-white sm:block">
                                {index + 1}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{country.country}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">{country.region}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountryTable;
