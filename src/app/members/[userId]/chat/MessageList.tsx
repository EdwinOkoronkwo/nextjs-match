'use client'

import React, {useCallback, useEffect, useRef, useState} from 'react'
import MessageBox from "@/app/members/[userId]/chat/MessageBox";
import {pusherClient} from "@/lib/pusher";
import {formatShortDateTime} from "@/lib/utils";
import {Channel} from "pusher-js";
import useMessageStore from "@/hooks/useMessageStore";

type MessageListProps = {
    initialMessages: {messages: MessageDto[], readCount: number};
    currentUserId: string;
    chatId: string;
}

export default function MessageList({initialMessages, currentUserId, chatId}: MessageListProps) {
    const channelRef = useRef<Channel | null>(null);
    const [messages, setMessages] = useState(initialMessages.messages);
    const updateUnreadCount = useMessageStore(state => state.updateUnreadCount);
    const setReadCount = useRef(false)

    useEffect(() => {
        if(!setReadCount.current){
            updateUnreadCount(-initialMessages.readCount);
            setReadCount.current = true;
        }
    }, [initialMessages.readCount, updateUnreadCount]);

    const handleNewMessage = useCallback((message: MessageDto) => {
        setMessages(prevState => [...prevState, message]);
    }, []);

    const handleReadMessages = useCallback((messageIds: string[]) => {
        setMessages(prevState => prevState.map(message => messageIds.includes(message.id)
        ? {...message, dateRead: formatShortDateTime(new Date())}
        : message))
    }, [])

    useEffect(() => {
        if(!channelRef.current){
            channelRef.current = pusherClient.subscribe(chatId);
            channelRef.current.bind("message:new", handleNewMessage);
            channelRef.current.bind("messages:read", handleReadMessages);
        }
        return () => {
            if(channelRef.current && channelRef.current.subscribed) {
                channelRef.current.unsubscribe();
                channelRef.current.unbind("message:new", handleNewMessage);
                channelRef.current.unbind("messages:read", handleReadMessages);
            }

        }
    }, [chatId, handleNewMessage, handleReadMessages]);

    return (
        <div>
            {messages.length === 0 ? 'No messages to display' : (
                <div>
                    {messages.map(message => (
                        <MessageBox message={message} key={message.id} currentUserId={currentUserId} />
                    ))}
                </div>
            )}
        </div>
    )
}
