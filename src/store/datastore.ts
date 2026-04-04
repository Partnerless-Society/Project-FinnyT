import { dataapi } from "@/api/dataapi";
import type { datacreate } from "@/types/datatype";
import { create } from "zustand";

export const useDataStore = create<datacreate>((set) => ({
    //Variable
    loadingdata: false,
    loadingcreatedata: false,
    loadingincomeoutcome: false,
    loadingchart: false,
    years: [],
    monthlyreport: [],
    incomechart: [],
    outcomechart: [],
    incometable: [],
    outcometable: [],
    total: null,
    income: null,
    outcome: null,

    //StateClear
    reset: () => set({
        incomechart: [],
        outcomechart: [],
        incometable: [],
        outcometable: [],
        years: [],
        monthlyreport: [],
        income: null,
        outcome: null,
        loadingdata: false,
        loadingcreatedata: false,
        loadingincomeoutcome: false,
        loadingchart: false,
    }),

    //Functions
    fetchdata: async (
        id: string
    ) => {
        try {
            const result = await dataapi.fetchdata(id);
            set({
                income: result.income,
                outcome: result.outcome
            })
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({ loadingdata: false })
        }
    },
    createdata: async (
        id: string,
        type: string,
        amount: Number,
        category: string,
        source: string
    ) => {
        try {
            set({ loadingcreatedata: true });
            const result = await dataapi.datacreate(
                id,
                type,
                amount,
                category,
                source
            )
            return result;
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({ loadingcreatedata: false });
        }
    },
    fetchdataincome: async (
        id: string
    ) => {
        try {
            set({ loadingincomeoutcome: false })
            const result = await dataapi.fetchtrackincome(id);
            set({
                incometable: result.data
            })
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({
                loadingincomeoutcome: false
            })
        }
    },
    fetchdataoutcome: async (
        id: string
    ) => {
        try {
            set({ loadingincomeoutcome: false })
            const result = await dataapi.fetchtrackoutcome(id);
            set({
                outcometable: result.data
            })
        }
        catch (err: unknown) {
            throw err;
        }
        finally {
            set({
                loadingincomeoutcome: false
            })
        }
    },
    fetchchartincome: async (
        id: string
    ) => {
        try {
            set({ loadingchart: true })
            const result = await dataapi.fetchchartincome(id);
            set({
                incomechart: result.data
            })
        }
        catch (err: unknown) {
            throw err
        }
        finally {
            set({
                loadingchart: false
            })
        }
    },
    fetchchartoutcome: async (
        id: string
    ) => {
        try {
            set({ loadingchart: true })
            const result = await dataapi.fetchchartoutcome(id);
            set({
                outcomechart: result.data
            })
        }
        catch (err: unknown) {
            throw err
        }
        finally {
            set({
                loadingchart: false
            })
        }
    },
    fetchyears: async (
        id: string
    ) => {
        try {
            const result = await dataapi.fetchyears(id);
            set({ years: result.years })
        }
        catch (err: unknown) {
            throw err;
        }
    },
    fetchmonthlyreport: async (
        id: string,
        year: number
    ) => {
        try {
            const result = await dataapi.fetchanalyticschart(id, year);
            set({
                monthlyreport: result.data
            })
        }
        catch (err: unknown) {
            throw err;
        }
    }
}))