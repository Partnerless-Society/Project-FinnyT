import { serviceapi } from "@/api/serviceapi";
import type { servicecreate } from "@/types/servicetype";
import { create } from "zustand";

export const useServiceStore = create<servicecreate>((set) => (
    {
        //variable
        servicedata: null,
        loadingservice: false,
        loadingfetch: false,
        loadingurl: false,
        url: [],

        //State Clear
        resetservice: () => set({
            servicedata: null,
            loadingservice: false,
            loadingfetch: false,
            loadingurl: false,
            url: [],
        }),

        //Functions
        testconnection: async (
            id: string,
            email: string,
            key: string
        ) => {
            try {
                set({ loadingservice: true })
                const result = await serviceapi.testconnection(id, email, key);
                return result;
            }
            catch (err: unknown) {
                throw err;
            }
            finally {
                set({ loadingservice: false })
            }
        },
        servicefetch: async (
            id: string
        ) => {
            try {
                set({ loadingfetch: true })
                const result = await serviceapi.fetchserviceacc(id);
                set({
                    servicedata: result.data
                })
            }
            catch (err: unknown) {
                throw err;
            }
            finally {
                set({ loadingfetch: false })
            }
        },
        addurl: async (
            id: string,
            url: string
        ) => {
            try {
                set({ loadingurl: true });
                const result = await serviceapi.addurl(id, url);
                return result;
            }
            catch (err: unknown) {
                throw err;
            }
            finally {
                set({ loadingurl: false })
            }
        },
        fetchurl: async (
            id: string
        ) => {
            try {
                set({ loadingurl: true });
                const result = await serviceapi.fetchurl(id);
                set({
                    url: result.url
                })
            }
            catch (err: unknown) {
                throw err;
            }
            finally {
                set({ loadingurl: false })
            }
        },
        Servicedelete: async (
            id: string  
        ) => {
            try {
                set({ loadingservice: true })
                const result = await serviceapi.Serviceacdelete(id);
                set({
                    servicedata: null,
                    url: []
                })
                return result;
            }
            catch (err: unknown) {
                throw err;
            }
            finally {
                set({ loadingservice: false })
            }
        }
    }
))
