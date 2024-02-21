
import getUsers from "@/actions/getUser";
import ConversationLists from "./_components/ConversationLists";
import SideBar from "@/Components/message/Sidebar/SideBar";
import getConversations from "@/actions/getConversations";
import JobsNavBar from "../jobs/_components/JobsNavbar";


export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode,
}) {
    const conversations = await getConversations();
    const users = await getUsers();

    return (
        <>
            <JobsNavBar />
            <SideBar>

                <div className="h-full ">
                    <ConversationLists
                        initialItems={conversations}
                        users={users}
                    />
                    {children}
                </div>
            </SideBar>

        </>
    );
}