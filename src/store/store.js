import { create } from "zustand";

const useStore = create((set) => ({
    userUid: null,
    setUserUid: (uid) => set({ userUid: uid }), // Simplified setUserUid
}));

export default useStore;
