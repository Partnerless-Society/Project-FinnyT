import { authapi } from "@/api/authapi";
import type { authcreate } from "@/types/authtype";
import { create } from "zustand";

export const useAuthStore = create<authcreate>((set) => ({
    //Variable
    loadingsignup: false,
    loadinglogin: false,
    loadinguser: false,
    id: null,
    name: null,
    email: null,
    type: null,

    //Functions
    usersignup: async (
        name: string,
        email: string,
        password: string,
        confirmpassword: string
    ) => {
        try {
            set({ loadingsignup: true });
            const result = await authapi.usersignup(
                name,
                email,
                password,
                confirmpassword
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
    },
    userfetch: async () => {
        set({ loadinguser: true });
        try {
            const result = await authapi.userfetch();
            set({
                email: result.data.email,
                name: result.data.name,
                id: result.data.id,
                type: result.data.type,
            });
        } catch (err: unknown) {
            set({
                id: null,
                name: null,
                email: null,
                type: null,
            });
        
        } finally {
            set({ loadinguser: false });
        }
    },
    userlogout: async () => {
        try {
            const result = await authapi.userlogout();
            set({
                id: null,
                name: null,
                email: null,
                type: null,
            });
            return result;
        }
        catch (err: unknown) {
            throw err;
        }
        finally{
            set({ loadinguser: false });
        }
    }
}))