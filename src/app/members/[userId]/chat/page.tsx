
import React from 'react'
import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "@/app/members/[userId]/chat/ChatForm";
import {getMessageThread} from "@/app/actions/messageActions";
import MessageBox from "@/app/members/[userId]/chat/MessageBox";
import {getAuthUserId} from "@/app/actions/authActions";
import MessageList from "@/app/members/[userId]/chat/MessageList";
import {createChatId} from "@/lib/utils";

export default async function ChatPage({params}: {params: {userId: string}}) {
    const userId = await getAuthUserId()
    const awaitedParams = await params
    const messages = await getMessageThread(awaitedParams.userId);
    const chatId = createChatId(userId, awaitedParams.userId);

    return (
        <CardInnerWrapper
            header='Chat'
            body={
            <MessageList initialMessages={messages} currentUserId={userId} chatId={chatId} />
            }
            footer={<ChatForm />}
            />

    )
}
