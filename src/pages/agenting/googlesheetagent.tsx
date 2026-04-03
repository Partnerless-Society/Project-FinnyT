
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/authstore";
import { useServiceStore } from "@/store/servicestore";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Bot, Edit3, FileSpreadsheet, Link, Link2, MessageCircle, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAiStore } from "@/store/aistore";
import { AnimatePresence, motion } from "framer-motion";

export const GoogleSheetagent = () => {

    //Store
    const {
        servicefetch,
        servicedata,
        loadingfetch,
        fetchurl,
        loadingurl,
        addurl,
        url,
    } = useServiceStore();
    const {
        id
    } = useAuthStore();
    const {
        Aiagentsheetcreate,
        loadingagentsheet
    } = useAiStore();

    //States
    const [urlcreate, seturlcreate] = useState<string>("");
    const [refresh, setrefresh] = useState<boolean>(false);
    const [openurl, setopenurl] = useState<boolean>(false);
    const [opencreate, setopencreate] = useState<boolean>(false);
    const [openupdate, setopenupdate] = useState<boolean>(false);
    const [opendelete, setopendelete] = useState<boolean>(false);
    const [prompt, setprompt] = useState<string>("");
    const [aireply, setaireply] = useState<string>("");

    //Functions
    useEffect(() => {
        servicefetch(id ?? "");
        fetchurl(id ?? "");
    }, [refresh])

    const addgooglesheeturl = async () => {
        try {
            const data = await addurl(id ?? "", urlcreate);

            if (data.success) {
                toast.success(data.message);
            }
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                const axiosError = err as any;
                const error = axiosError.response?.data?.message || err.message;
                toast.error(error);
            }
        }
        finally {
            setrefresh(prev => !prev);
        }
    }


    const sheetagentcreate = async () => {
        try {
            if (!url) {
                toast.error("Please add Google Sheet URL first.");
            }
            const data = await Aiagentsheetcreate(id ?? "", url ?? "", prompt);
            if (data.success) {
                setaireply(data.message);
            }
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                const axiosError = err as any;
                const error = axiosError.response?.data?.message || err.message;
                toast.error(error);
            }
        }
    }


    return (
        <>
            <Toaster position="top-right" />
            {/*Add Url */}
            <Dialog open={openurl} onOpenChange={setopenurl}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle className="flex justify-center items-center gap-2">Add Google Sheet URL <Link2 /></DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                            <Link size={14} /> URL
                        </Label>
                        <Input
                            placeholder="Add Google Sheet URL"
                            value={urlcreate}
                            onChange={(e) => seturlcreate(e.target.value)}
                        />
                    </div>
                    <DialogFooter className="mt-4">
                        <Button disabled={loadingurl} onClick={addgooglesheeturl}>
                            {loadingurl ? "Adding..." : "Add"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* Dialog For Create Agent */}
            <Dialog open={opencreate} onOpenChange={setopencreate}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Create Data</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Link size={14} /> URL
                            </Label>
                            <Input
                                placeholder="Google Sheet URL"
                                value={url ?? ""}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="key" className="flex items-center gap-2">
                                <MessageCircle size={14} /> Instructions To Do
                            </Label>
                            <Textarea value={prompt} onChange={(e) => setprompt(e.target.value)}
                                placeholder="Enter Instructions"
                                className="pr-10 resize-none h-24"
                            />
                        </div>
                    </div>
                    <AnimatePresence mode="wait">
                        {loadingagentsheet ? (
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
                                <section style={{scrollbarWidth : "none"}} className="border rounded-lg p-3 h-30 overflow-auto space-y-2 text-muted-foreground">
                                    {aireply}
                                </section>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <DialogFooter className="mt-4">
                        <Button onClick={sheetagentcreate} disabled={loadingagentsheet}>
                            {loadingagentsheet ? "Creating..." : "Create"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog For Update Agent */}
            <Dialog open={openupdate} onOpenChange={setopenupdate}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Update Data</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Link size={14} /> URL
                            </Label>
                            <Input
                                placeholder="Google Sheet URL"
                                value={url ?? ""}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="key" className="flex items-center gap-2">
                                <MessageCircle size={14} /> Instructions To Do
                            </Label>
                            <Textarea
                                placeholder="Enter Instructions"
                                className="pr-10 resize-none h-24"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="key" className="flex items-center gap-2">
                                    <MessageCircle size={14} />Enter Row(Optional)
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="Enter Row"
                                    className="pr-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="key" className="flex items-center gap-2">
                                    <MessageCircle size={14} />Enter Column(Optional)
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="Enter Column"
                                    className="pr-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button >
                            Update
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog For Delete Agent */}
            <Dialog open={opendelete} onOpenChange={setopendelete}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Delete Data</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Link size={14} /> URL
                            </Label>
                            <Input
                                placeholder="Google Sheet URL"
                                value={url ?? ""}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="key" className="flex items-center gap-2">
                                <MessageCircle size={14} /> Instructions To Do
                            </Label>
                            <Textarea
                                placeholder="Enter Instructions"
                                className="pr-10 resize-none h-24"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="key" className="flex items-center gap-2">
                                    <MessageCircle size={14} />Enter Row(Optional)
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="Enter Row"
                                    className="pr-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="key" className="flex items-center gap-2">
                                    <MessageCircle size={14} />Enter Column(Optional)
                                </Label>
                                <Input
                                    type="number"
                                    placeholder="Enter Column"
                                    className="pr-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button >
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex flex-col">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-medium">GoogleSheet</h1>
                    <p className="text-muted-foreground">Welcome To Ai-Powered GoogleSheet Automation Agent.</p>
                    <div className="mt-2">
                        <h1 className="text-lg font-medium">Google Sheet Agenting Capabilities</h1>
                        <p className="text-muted-foreground mt-2">With our Google Sheet Agent, you can automate data management, streamline workflows, and enhance productivity. Effortlessly create, read, update, and delete spreadsheet data, generate dynamic reports, and integrate with other tools to unlock the full potential of your Google Sheets.</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-4">
                <div className="flex gap-2">
                    <FileSpreadsheet className="text-green-600" />
                    <h2 className="text-xl font-bold">Sheet Tools</h2>
                </div>
                {url ?
                    <Select defaultValue={url}>
                        <SelectTrigger className="border px-2 py-1 h-auto rounded-md flex items-center gap-1 focus:ring-0">
                            <div className="flex items-center gap-1">
                                <SelectValue placeholder="URL" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={url}>Google Sheet Url</SelectItem>
                        </SelectContent>
                    </Select> :
                    <Button onClick={() => setopenurl(prev => !prev)}>Add Url <Link2 /></Button>
                }
            </div>
            {loadingfetch ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="h-30 flex flex-col justify-between">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <Skeleton className="h-4 w-15" />
                                <Skeleton className="h-4 w-4 rounded-full" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-3 w-full mb-2" />
                                <Skeleton className="h-3 w-[80%]" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                servicedata && (
                    <>
                        <div className="mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Card onClick={() => setopencreate(prev => !prev)} className="hover:border-green-500 transition-colors cursor-pointer">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="font-medium">Create</CardTitle>
                                        <Plus className="h-4 w-4 text-green-600" />
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">Add a new row or initialize a new sheet.</p>
                                    </CardContent>
                                </Card>
                                <Card onClick={() => setopenupdate(prev => !prev)} className="hover:border-amber-500 transition-colors cursor-pointer">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="font-medium">Update</CardTitle>
                                        <Edit3 className="h-4 w-4 text-amber-600" />
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">Modify existing cell values or range metadata.</p>
                                    </CardContent>
                                </Card>

                                <Card onClick={() => setopendelete(prev => !prev)} className="hover:border-red-500 transition-colors cursor-pointer">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="font-medium">Delete</CardTitle>
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">Remove rows or clear specific ranges permanently.</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </>
                )
            )
            }
        </>
    )
}