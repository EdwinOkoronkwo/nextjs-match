import React from 'react'
import usePresenceStore from "@/hooks/usePresenceStore";
import {Badge} from "@nextui-org/badge";
import {Avatar} from "@nextui-org/react";

type PresenceAvatarProps = {
    userId?: string;
    src?: string | null;
}

export default function PresenceAvatar({userId, src}: PresenceAvatarProps) {
    const members = usePresenceStore(state => state.members);

    const isOnline = userId && members.indexOf(userId) !== -1;
    return (
        <Badge content="" color={"success"} shape={"circle"} isInvisible={!isOnline} >
            <Avatar src={src || '/images/user.png'} alt={'User Avatar'} />
        </Badge>
    )
}
