import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
    _id: string,
    clerkId: string,
    fullname: string,
    username: string,
    description: string,
    imageUrl: string,
    bannerImageUrl: string,
    savedRecipe: Array<string>,
    followers: Array<string>,
    following: Array<string>,
    role: string,
    createdAt?: string,
    updatedAt?: string
}

interface UserStore {
    userData: User | null,
    setUser: (userData: User) => void
    clearUser: () => void
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => (
            {
            userData: null,
            setUser: (userData) => set({ userData: userData}),
            clearUser: () => set({ userData: null})
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)