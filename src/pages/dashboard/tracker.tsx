import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/store/authstore"
import { useDataStore } from "@/store/datastore"
import { Banknote, Bot, Keyboard, Plus, PlusCircle, Tag, TrendingDown, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"
import { AnimatePresence, motion } from "framer-motion";
import { useAiStore } from "@/store/aistore"

export const Tracker = () => {

    //Store
    const { createdata,
        fetchdataincome,
        fetchdataoutcome,
        incometable,
        outcometable,
        loadingcreatedata,
        loadingincomeoutcome } = useDataStore();
    const { id } = useAuthStore();
    const { Aiagent, loadingagent } = useAiStore();

    //States
    const [open, setopen] = useState<boolean>(false);
    const [type, settype] = useState<string>("");
    const [amount, setamount] = useState<number>();
    const [category, setcategory] = useState<string>("");
    const [source, setsource] = useState<string>("");
    const [refresh, setrefresh] = useState<boolean>(false);
    const [file, setfile] = useState<File | null>(null);
    const [aireply, setaireply] = useState<string>("");

    //Function
    const filepreview = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const photo = e.target.files?.[0];

        if (!photo) {
            return;
        }
        setfile(photo);
    }

    //AiAgent Data Add
    const Agentadd = async () => {
        const form = new FormData();
        form.append("id", id ?? "");
        form.append("file", file ?? "");

        try {
            const data = await Aiagent(form);
            setaireply(data.aireply);
            toast.success(data.message);
            setrefresh(prev => !prev);
        }
        catch (err: unknown) {
            if (err instanceof Error) {

                const axiosError = err as any;
                const error = axiosError.response?.data?.message || err.message;
                toast.error(error)
            } else {
                toast.error("An unexpected error occurred.")
            }
        }
    }

    //ManualInput
    const Add = async () => {
        try {
            const data = await createdata(id ?? "", type, amount ?? 0, category, source);
            if (data.success) {
                toast.success(data.message)
                setrefresh(prev => !prev);
            }
        }
        catch (err: unknown) {
            if (err instanceof Error) {

                const axiosError = err as any;
                const error = axiosError.response?.data?.message || err.message;
                toast.error(error)
            } else {
                toast.error("An unexpected error occurred.")
            }
        }
        finally {
            setopen(prev => !prev);
        }
    }
    //Functions
    useEffect(() => {
        if (id) {
            fetchdataincome(id);
            fetchdataoutcome(id);
        }

    }, [id, refresh]);

    //Pagination
    const [incomePage, setIncomePage] = useState(1);
    const [outcomePage, setOutcomePage] = useState(1);
    const itemsPerPage = 10;

    const currentIncomeData = incometable.slice((incomePage - 1) * itemsPerPage, incomePage * itemsPerPage);
    const currentOutcomeData = outcometable.slice((outcomePage - 1) * itemsPerPage, outcomePage * itemsPerPage);

    const totalIncomePages = Math.ceil(incometable.length / itemsPerPage);
    const totalOutcomePages = Math.ceil(outcometable.length / itemsPerPage);

    return (
        <>
            <Toaster position="top-right" />
            {/*Dialog */}
            <Dialog open={open} onOpenChange={setopen}>
                <DialogContent className="sm:max-w-106.25">
                    <Tabs>
                        <TabsList>
                            <TabsTrigger value="Manual" className="gap-2">
                                Manual Input <span><Keyboard /></span>
                            </TabsTrigger>
                            <TabsTrigger value="Ai" className="gap-2">
                                Ai Agent <span><Bot /></span>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="Manual">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2 text-2xl">
                                    Create Data Source
                                </DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label>Type</Label>
                                    <Select defaultValue={type} onValueChange={(value) => settype(value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="income">Income (+)</SelectItem>
                                            <SelectItem value="outcome">Outcome (-)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="title" className="flex items-center gap-2">
                                        <Tag size={14} /> Source
                                    </Label>
                                    <Input value={source} onChange={(e) => setsource(e.target.value)} id="title" placeholder="e.g. Name For Source" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="amount" className="flex items-center gap-2">
                                            <Banknote size={14} /> Amount
                                        </Label>
                                        <Input value={amount} onChange={(e) => setamount(Number(e.target.value))} id="amount" type="number" placeholder="0" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Category</Label>
                                        <Select value={category} onValueChange={(value) => setcategory(value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="food">Food</SelectItem>
                                                <SelectItem value="transport">Transport</SelectItem>
                                                <SelectItem value="work">Work</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button disabled={loadingcreatedata} onClick={Add}>
                                    {loadingcreatedata ?
                                        <>
                                            Adding...
                                        </> :
                                        <>
                                            Add <Plus />
                                        </>}
                                </Button>
                            </DialogFooter>
                        </TabsContent>
                        <TabsContent value="Ai">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2 text-2xl">
                                    Create Data With Ai
                                </DialogTitle>
                                <DialogDescription className="max-md:text-start">
                                   Note: Ai Agent May Not Be 100% Accurate.{<br/>} 
                                   Please Make Sure The Image Is Clear.
                                </DialogDescription>
                            </DialogHeader>
                            <label
                                htmlFor="fileUpload"
                                className="w-50 h-50 rounded-lg border border-double border-gray-400 mt-4 flex items-center justify-center cursor-pointer"
                            >
                                {file ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        className="w-50 h-50 object-cover"
                                    />
                                ) : "Click to upload"}
                            </label>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/png"
                                id="fileUpload"
                                onChange={filepreview}
                            />
                            <AnimatePresence mode="wait">
                                {loadingagent ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className=" rounded-xl text-sm mt-4 leading-relaxed"
                                    >
                                        <div className="flex text-[15px] items-center gap-2 mb-2  font-semibold">
                                            <Bot size={14} className="animate-bounce" /> Working On It ...
                                        </div>
                                        <section className="space-y-2">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-full" />
                                        </section>

                                    </motion.div>
                                ) : (
                                    aireply &&
                                    <motion.div
                                        key="response"
                                        className="relative rounded-xl mt-4 text-sm leading-relaxed"
                                    >
                                        <div className="flex text-[15px] items-center gap-2 mb-2  font-semibold">
                                            <Bot size={14} /> AI Agent Analysis
                                        </div>
                                        <section className="border rounded-lg p-3 space-y-2 text-muted-foreground">
                                            {aireply}
                                        </section>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <DialogFooter className="mt-4">
                                <Button disabled={loadingagent} onClick={Agentadd}>
                                    {loadingagent ?
                                        <>
                                            <Bot className="animate-bounce" /> Working On It...
                                        </> :
                                        <>
                                            Add <Plus />
                                        </>}
                                </Button>
                            </DialogFooter>
                        </TabsContent>
                    </Tabs>

                </DialogContent>
            </Dialog>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-medium">Track Overview</h1>
                    <p className="text-medium text-muted-foreground">Datas will reset at the end of the month.</p>
                </div>
                <Tabs defaultValue="Income" className="w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-between">
                        <TabsList>
                            <TabsTrigger value="Income" className="gap-2">
                                Income <span><TrendingUp /></span>
                            </TabsTrigger>
                            <TabsTrigger value="Outcome" className="gap-2">
                                Outcome <span><TrendingDown /></span>
                            </TabsTrigger>
                        </TabsList>
                        <Button onClick={() => setopen(prev => !prev)}>Add Data <PlusCircle /></Button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}>
                        <TabsContent value="Income" className="mt-4">
                            <Table className="border rounded-lg">
                                <TableHeader className="bg-muted/30">
                                    <TableRow>
                                        <TableHead>Source</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {loadingincomeoutcome ?
                                    <TableBody>
                                        {[...Array(5)].map((_, i) => (
                                            <TableRow key={i}>
                                                <TableCell><Skeleton className="h-4 w-25" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-15" /></TableCell>
                                                <TableCell className="text-right"><Skeleton className="h-4 w-17.5 ml-auto" /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    : <TableBody>
                                        {currentIncomeData.length > 0 ? (
                                            currentIncomeData.map((element) => (
                                                <TableRow key={element._id} className="cursor-default">
                                                    <TableCell className="font-medium">{element.source}</TableCell>
                                                    <TableCell>{element.category}</TableCell>
                                                    <TableCell className="text-muted-foreground text-xs">
                                                        {new Date(element.date).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className="text-right font-bold text-emerald-600">
                                                        + {Number(element.amount).toLocaleString()} Ks
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                                    No income recorded yet.
                                                </TableCell>
                                            </TableRow>
                                        )}

                                    </TableBody>
                                }
                            </Table>
                            {!loadingincomeoutcome && incometable.length > itemsPerPage && (
                                <div className="flex items-center justify-end space-x-2 py-4">
                                    <Button variant="outline" size="sm" onClick={() => setIncomePage(prev => Math.max(prev - 1, 1))} disabled={incomePage === 1}>
                                        Previous
                                    </Button>
                                    <div className="text-sm font-medium">
                                        Page {incomePage} of {totalIncomePages}
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => setIncomePage(prev => Math.min(prev + 1, totalIncomePages))} disabled={incomePage === totalIncomePages}>
                                        Next
                                    </Button>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="Outcome" className="mt-4">
                            <Table className="border rounded-lg">
                                <TableHeader className="bg-muted/30">
                                    <TableRow>
                                        <TableHead>Source</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {loadingincomeoutcome ?
                                    <TableBody>
                                        {[...Array(5)].map((_, i) => (
                                            <TableRow key={i}>
                                                <TableCell><Skeleton className="h-4 w-25" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-15" /></TableCell>
                                                <TableCell className="text-right"><Skeleton className="h-4 w-17.5 ml-auto" /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    : <TableBody>
                                        {currentOutcomeData.length > 0 ? (
                                            currentOutcomeData.map((element) => (
                                                <TableRow key={element._id} className="cursor-default">
                                                    <TableCell className="font-medium">{element.source}</TableCell>
                                                    <TableCell>{element.category}</TableCell>
                                                    <TableCell className="text-muted-foreground text-xs">
                                                        {new Date(element.date).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className="text-right font-bold text-orange-600">
                                                        - {Number(element.amount).toLocaleString()} Ks
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                                    No outcome recorded yet.
                                                </TableCell>
                                            </TableRow>
                                        )}

                                    </TableBody>
                                }
                            </Table>
                            {!loadingincomeoutcome && outcometable.length > itemsPerPage && (
                                <div className="flex items-center justify-end space-x-2 py-4">
                                    <Button variant="outline" size="sm" onClick={() => setOutcomePage(prev => Math.max(prev - 1, 1))} disabled={outcomePage === 1}>
                                        Previous
                                    </Button>
                                    <div className="text-sm font-medium">
                                        Page {outcomePage} of {totalOutcomePages}
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => setOutcomePage(prev => Math.min(prev + 1, totalOutcomePages))} disabled={outcomePage === totalOutcomePages}>
                                        Next
                                    </Button>
                                </div>
                            )}
                        </TabsContent>
                    </motion.div>
                </Tabs>
            </div>
        </>
    )
}