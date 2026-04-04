import { aiapi } from "@/api/aiapi";
import type { aicreate } from "@/types/aitype";
import { create } from "zustand";

export const useAiStore = create<aicreate>((set) => ({
    //Variable
    loadingai: false,
    loadingagent: false,
    loadingagentsheet: false,

    
    //Functions
    Aianalyse: async (
        total: number,
        income: number,
        outcome: number,
        net: number
    ) => {
        try {
            set({ loadingai: true });
            const result = await aiapi.aianalyse(
                total,
                income,
                outcome,
                net
            )
            return result;
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({ loadingai: false })
        }
    },
    Aiagent: async (
        form: FormData
    ) => {
        try {
            set({ loadingagent: true });
            const result = await aiapi.aiagent(form);
            return result;
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({ loadingagent: false })
        }
    },
    Aiagentsheetcreate: async (
        id: string,
        url: string,
        prompt: string
    ) => {
        try {
            set({ loadingagentsheet: true });
            const result = await aiapi.aiagentsheetcreate(id, url, prompt);
            return result;
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({ loadingagentsheet: false })
        }
    },
    Aiagentsheetupdate: async (
        id: string,
        url: string,
        prompt: string,
        row?: number,
        col?: number
    ) => {
        try {
            set({ loadingagentsheet: true })
            const result = await aiapi.aiagentsheetupdate(id, url, prompt, row, col);
            return result;
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({ loadingagentsheet: false })
        }
    },
    Aiagentsheetdelete: async (
        id: string,
        url: string,
        prompt: string,
        row?: number,
        col?: number
    ) => {
        try {
            set({ loadingagentsheet: true })
            const result = await aiapi.aiagentsheetdelete(id, url, prompt, row, col);
            return result;
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({ loadingagentsheet: false })
        }
    }
}))