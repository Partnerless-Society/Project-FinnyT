import { aiapi } from "@/api/aiapi";
import type { aicreate } from "@/types/aitype";
import { create } from "zustand";

export const useAiStore = create<aicreate>((set) => ({
    loadingai: false,
    Aianalyse: async (
        total: number,
        income: number,
        outcome: number,
        net : number
    ) => {
        try {
           set({loadingai : true});
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
    }
}))