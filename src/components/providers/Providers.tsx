'use client'

import React, {ReactNode, useCallback, useEffect} from 'react'
import {HeroUIProvider} from "@heroui/system";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {usePresenceChannel} from "@/hooks/usePresenceChannel";
import {useNotificationChannel} from "@/hooks/useNotificationChannel";
import useMessageStore from "@/hooks/useMessageStore";
import {getUnreadMessageCount} from "@/app/actions/messageActions";

// export default function Providers({children, userId}: {children: ReactNode, userId: string | null}) {
//     const updateUnreadCount = useMessageStore(state => state.updateUnreadCount);
//
//     useEffect(() => {
//         if (userId) {
//             getUnreadMessageCount().then(updateUnreadCount);
//         }
//     }, [userId, updateUnreadCount]);
//
//     usePresenceChannel();
//     useNotificationChannel(userId);
//
//     return (
//         <HeroUIProvider>
//             <ToastContainer position="top-right" hideProgressBar className="z-50" />
//             {children}
//         </HeroUIProvider>
//     );
// }



export default function Providers({children, userId, profileComplete}:
{children: ReactNode, userId: string | null, profileComplete: boolean}) {
    const {updateUnreadCount} = useMessageStore(state => ({
        updateUnreadCount: state.updateUnreadCount,
    }));

    const setUnreadCount = useCallback((amount: number) => {
        updateUnreadCount(amount)
    }, [updateUnreadCount]);

    useEffect(() => {
        if(userId){
            getUnreadMessageCount().then(count => {
                setUnreadCount(count)
            })
        }
    }, [setUnreadCount, userId]);

    usePresenceChannel(userId, profileComplete);
    useNotificationChannel(userId, profileComplete)
    return (
        <HeroUIProvider>
            <ToastContainer position="top-right" hideProgressBar className="z-50"/>
            {children}
        </HeroUIProvider>
    )
}


