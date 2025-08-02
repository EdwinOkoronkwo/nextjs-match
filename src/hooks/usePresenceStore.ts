import {create} from "zustand";
import {devtools} from "zustand/middleware";

type PresenceState = {
    members: string[];
    add: (id: string) => void;
    remove: (id: string) => void;
    setMembers: (ids: string[]) => void;
};

const usePresenceStore = create<PresenceState>()(
    devtools(
        (set) => ({
            members: [],
            add: (id) => set((state) => ({ members: [...state.members, id] })),
            remove: (id) => set((state) => ({ members: state.members.filter((member) => member !== id) })),
            setMembers: (ids) => set({ members: ids }),
        }),
        { name: 'PresenceStore' }
    )
);


export default usePresenceStore;