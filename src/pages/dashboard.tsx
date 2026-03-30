import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BanknoteArrowDown, Calendar, Sparkle, Sparkles, TrendingDown, Wallet, X } from "lucide-react"
import { DashboardChart } from "./charts/areachart"
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "@/store/authstore";
import { useDataStore } from "@/store/datastore";
import { useEffect, useState } from "react";
import { TotalRevenueChart } from "./charts/piechart";
import { Skeleton } from "@/components/ui/skeleton";
import { useAiStore } from "@/store/aistore";
import DOMPurify from "dompurify"

export const Dashboard = () => {

    //Variable
    const [aianalyse, setaianalyse] = useState<string>("");
    //Store
    const { name, email, id, type } = useAuthStore();
    const { fetchdata, total, income, outcome, loadingdata } = useDataStore();
    const { Aianalyse, loadingai } = useAiStore();

    //Functions
    useEffect(() => {
        fetchdata(id ?? "");
    }, [])

    const Aianalytics = async () => {
        try {
            const data = await Aianalyse(total ?? 0, income ?? 0, outcome ?? 0);
            if (data.success) {
                setaianalyse(data.data);
            }
        }
        catch (err: unknown) {
            if (err instanceof Error) {

                const axiosError = err as any;
                const error = axiosError.response?.data?.message || err.message;
                setaianalyse(error)
            } else {
                setaianalyse("An unexpected error occurred.")
            }
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-medium">Dashboard Overview</h1>
                <p className="text-medium text-muted-foreground">Welcome {name}!</p>
            </div>
            <div className="flex justify-start">
                <Button disabled={loadingai} onClick={Aianalytics} className="rounded-lg"><Sparkle className={loadingai ? "animate-spin" : ""} /> {loadingai ? "Analysing..." : "Ai Insights"}</Button>
            </div>
            <AnimatePresence mode="wait">
                {loadingai ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 rounded-xl border text-sm leading-relaxed"
                    >
                        <div className="flex text-[15px] items-center gap-2 mb-2 font-semibold">
                            <Sparkles size={14} /> AI Analysis
                        </div>
                        <section className="space-y-2">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-full" />
                        </section>
                        <section className="space-y-2 mt-4">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </section>
                    </motion.div>
                ) : aianalyse ? (
                    <motion.div
                        key="response"
                        className="relative p-4 rounded-xl border text-sm leading-relaxed"
                    >
                        <div className="flex text-[15px] items-center gap-2 mb-2  font-semibold">
                            <Sparkles size={14} /> AI Analysis
                        </div>
                        <div className="text-muted-foreground rounded-xl">
                            {(() => {
                                const cleanHtml = DOMPurify.sanitize(aianalyse);
                                return (
                                    <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
                                );
                            })()}
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-3 max-md:grid-cols-1 gap-3"
            >
                {loadingdata ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i} className="h-40 flex flex-col justify-between">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <Skeleton className="h-6 w-1/2" />
                                <Skeleton className="h-6 w-6 rounded-full" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Skeleton className="h-10 w-3/4" />
                                <Skeleton className="h-4 w-1/3" />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-xl font-bold">Total Budget Usage</CardTitle>
                                <Wallet className="text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="max-md:text-xl text-2xl font-bold text-blue-600">
                                    {total ?? 0} Ks
                                </CardTitle>
                                <CardDescription className="flex gap-1 mt-2 font-medium">
                                    <Calendar size={20} />{new Date().toLocaleDateString()}
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-xl font-bold">Income</CardTitle>
                                <BanknoteArrowDown className="text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="max-md:text-xl text-2xl font-bold text-green-500">
                                    {income ?? 0} Ks
                                </CardTitle>
                                <CardDescription className="flex gap-1 mt-2 font-medium">
                                    <Calendar size={20} />{new Date().toLocaleDateString()}
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-xl font-bold">Outcome</CardTitle>
                                <TrendingDown className="text-orange-600" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="max-md:text-xl text-2xl font-bold text-orange-600">
                                    - {outcome ?? 0} Ks
                                </CardTitle>
                                <CardDescription className="flex gap-1 mt-2 font-medium">
                                    <Calendar size={20} />{new Date().toLocaleDateString()}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </>
                )}
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="w-full flex max-md:flex-col gap-3">
                <DashboardChart />
                <TotalRevenueChart />
            </motion.div>
        </div >
    )
}

