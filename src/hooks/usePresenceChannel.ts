import usePresenceStore from "@/hooks/usePresenceStore";
import {useCallback, useEffect, useRef} from "react";
import {Channel, Members} from "pusher-js";
import {pusherClient} from "@/lib/pusher";
import {updateLastActive} from "@/app/actions/memberActions";

export const usePresenceChannel = (userId: string | null, profileComplete: boolean) => {
    const {setMembers, add, remove} = usePresenceStore(state => ({
        setMembers: state.setMembers,
        add: state.add,
        remove: state.remove,
    }))

    const channelRef = useRef<Channel | null>(null);

    const handleSetMembers = useCallback((memberIds: string[]) => {
        setMembers(memberIds);
    }, [setMembers]);

    const handleAddMember = useCallback((memberId: string) => {
        add(memberId)
    }, [add])

    const handleRemoveMember = useCallback((memberId: string) => {
        remove(memberId)
    }, [remove])

    useEffect(() => {
        if (!userId || !profileComplete) return;
        if(!channelRef.current) {
            channelRef.current = pusherClient.subscribe("presence-next-match");
            channelRef.current.bind('pusher:subscription_succeeded', async (members: Members) => {
                handleSetMembers(Object.keys(members.members));
                await updateLastActive();
            })
            channelRef.current.bind('pusher:member_added', (member: Record<string, any>) => {
                handleAddMember(member.id)
            })
            channelRef.current.bind('pusher:member_removed', (member: Record<string, any>) => {
                handleRemoveMember(member.id)
            })
        }
        return () => {
            if(channelRef.current && channelRef.current.subscribed) {
                channelRef.current.unsubscribe();
                channelRef.current.unbind_all();
            }
        }
    }, [handleAddMember, handleRemoveMember, handleSetMembers, userId, profileComplete])
}