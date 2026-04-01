import { aiapi } from "@/api/aiapi";
import type { aicreate } from "@/types/aitype";
import { create } from "zustand";

export const useAiStore = create<aicreate>((set) => ({
    loadingai: false,
    loadingagent: false,
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
    }
}))