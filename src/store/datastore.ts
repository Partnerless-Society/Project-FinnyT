import { dataapi } from "@/api/dataapi";
import type { datacreate } from "@/types/datatype";
import { create } from "zustand";

export const useDataStore = create<datacreate>((set) => ({
    //Variable
    loadingdata: false,
    total : null,
    income : null,
    outcome : null,

    //Functions
    fetchdata: async (
        id: string
    ) => {
        try {
           const result = await dataapi.fetchdata(id);
           set({
              total : result.total,
              income : result.income,
              outcome : result.outcome
           })
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({loadingdata : false})
        }
    }
}))