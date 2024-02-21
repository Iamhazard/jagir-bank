
import Header from "../_components/Header";
import ConversationBody from "../_components/ConversationBody";
import Form from "../_components/Form";
import EmptyState from "@/Components/message/EmptyState";
import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";



interface IParams {
    conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {

    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);


    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        )
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation} />
                <ConversationBody initialMessages={messages} />

                <Form />
            </div>

        </div>
    )

}

export default ConversationId