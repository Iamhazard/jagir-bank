
import SideBar from "@/Components/message/Sidebar/SideBar";

import UserList from "./_components/UserList";
import getUsers from "@/actions/getUser";
import JobsNavBar from "../jobs/_components/JobsNavbar";


export default async function UsersLayout({
    children
}: { children: React.ReactNode }) {
    const users = await getUsers()
    return (
        <div className="">
            <JobsNavBar />

            <SideBar>
                <div className=" ">
                    <UserList items={users} />
                    {children}
                </div>
            </SideBar>


        </div>

    )
}