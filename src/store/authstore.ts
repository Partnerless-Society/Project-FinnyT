import { authapi } from "@/api/authapi";
import type { authcreate } from "@/types/authtype";
import { create } from "zustand";

export const useAuthStore = create<authcreate>((set) => ({
    loadingsignup: false,
    loadinglogin: false,
    usersignup: async (
        name: string,
        email: string,
        password: string,
        type: string
    ) => {
        try {
            set({ loadingsignup: true });
            const result = await authapi.usersignup(
                name,
                email,
                password,
                type
            )
            return result;
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({ loadingsignup: false })
        }
    },
    userlogin: async (
        email: string,
        password: string
    ) => {
        try {
            set({ loadinglogin: true })
            const result = await authapi.userlogin(
                email,
                password
            )
            return result;
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({ loadinglogin: false })
        }
    }
}))