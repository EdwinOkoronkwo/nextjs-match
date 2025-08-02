import React from 'react'
import MessageSidebar from "@/app/messages/MessageSidebar";
import MessageTable from "@/app/messages/MessageTable";
import {getMessagesByContainer} from "@/app/actions/messageActions";

export default async function MessagesPage({searchParams}: {searchParams: Promise<{container: string}>}) {
    const {container} = await searchParams
    const {messages, nextCursor} = await getMessagesByContainer(container)
    console.log(messages)
    return (
        <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
            <div className={'col-span-2'}>
                <MessageSidebar />
            </div>
            <div className={'col-span-10'}>
               <MessageTable initialMessages={messages} nextCursor={nextCursor} />
            </div>
        </div>
    )
}
