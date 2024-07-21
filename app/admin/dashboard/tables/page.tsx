
import { Metadata } from "next";
import Breadcrumb from "../../_component/Breadcrumbs/Breadcrumb";
import TableOne from "../../_component/Tables/TableOne";
import TableTwo from "../../_component/Tables/TableTwo";
import TableThree from "../../_component/Tables/TableThree";
import TableFour from "../../_component/Tables/TableFour";


export const metadata: Metadata = {
    title: "Next.js Tables",
    description:
        "Tables about job post",
};

const TablesPage = () => {
    return (
        <>
            <Breadcrumb pageName="Tables" />

            <div className="flex flex-col gap-10">
                <TableOne />
                <TableTwo />
                {/* <TableThree /> */}


            </div>
        </>
    );
};

export default TablesPage;
