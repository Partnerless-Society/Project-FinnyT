import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/store/authstore"
import { useDataStore } from "@/store/datastore"
import { Banknote, Plus, PlusCircle, Tag, TrendingDown, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { toast, Toaster } from "sonner"

export const Tracker = () => {

    //Store
    const { createdata, fetchdataincome, fetchdataoutcome, incometable, outcometable, loadingcreatedata, loadingincomeoutcome } = useDataStore();
    const { id } = useAuthStore();

    //States
    const [open, setopen] = useState<boolean>(false);
    const [type, settype] = useState<string>("");
    const [amount, setamount] = useState<number>();
    const [category, setcategory] = useState<string>("");
    const [source, setsource] = useState<string>("");
    const [refresh, setrefresh] = useState<boolean>(false);

    //Function
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
    useEffect(() => {
        if (id) {
            fetchdataincome(id);
            fetchdataoutcome(id);
        }

    }, [id, refresh]);

    return (
        <>
            <Toaster position="top-right" />
            <Dialog open={open} onOpenChange={setopen}>
                <DialogContent className="sm:max-w-106.25">
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
                </DialogContent>
            </Dialog>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-medium">Track Overview</h1>
                    <p className="text-medium text-muted-foreground"></p>
                </div>
                <Tabs defaultValue="Income" className="w-full">
                    <div className="flex justify-between">
                        <TabsList>
                            <TabsTrigger value="Income" className="gap-2">
                                Income <span><TrendingUp /></span>
                            </TabsTrigger>
                            <TabsTrigger value="Outcome" className="gap-2">
                                Outcome <span><TrendingDown /></span>
                            </TabsTrigger>
                        </TabsList>
                        <Button onClick={() => setopen(prev => !prev)}>Add Data <PlusCircle /></Button>
                    </div>
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
                                    {incometable.length > 0 ? (
                                        incometable.map((element) => (
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
                                    {outcometable.length > 0 ? (
                                        outcometable.map((element) => (
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
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}