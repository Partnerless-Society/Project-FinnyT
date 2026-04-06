import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authstore";
import { useServiceStore } from "@/store/servicestore";
import { User2, User, Plus, Mail, Key, EyeOff, Eye, Trash } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const Setting = () => {

    //Store
    const {
        servicedata,
        testconnection,
        loadingservice,
        servicefetch,
        loadingfetch,
        Servicedelete
    } = useServiceStore();
    const {
        id
    } = useAuthStore();

    //States
    const [email, setEmail] = useState<string>("");
    const [key, setKey] = useState<string>("");
    const [open, setopen] = useState<boolean>(false);
    const [opendelete, setopendelete] = useState<boolean>(false);
    const [show, setshow] = useState<boolean>(false);
    const [refresh, setrefresh] = useState<boolean>(false);

    //Functions
    useEffect(() => {
        servicefetch(id ?? "")
    }, [refresh])

    const test = async () => {
        try {
            const result = await testconnection(id ?? "", email, key);
            if (result.success) {
                toast.success(result.message);
            }
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                const axiosError = err as any;
                const error = axiosError.response?.data?.message || err.message;
                toast.error(error);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
        finally {
            setrefresh(prev => !prev)
        }
    }


    const servicedelete = async () => {
        try {
            const result = await Servicedelete(id ?? "");
            if (result.success) {
                toast.success(result.message);
            }
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                const axiosError = err as any;
                const error = axiosError.response?.data?.message || err.message;
                toast.error(error);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
        finally {
            setrefresh(prev => !prev)
            setopendelete(prev => !prev);
        }
    }

    return (
        <>
            <Toaster position="top-right" />

            <Dialog open={opendelete} onOpenChange={setopendelete}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Delete Service Account</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete your service account? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setopendelete(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={servicedelete}>
                            {loadingservice ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={open} onOpenChange={setopen}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Test Google Connection</DialogTitle>
                        <DialogDescription>
                            Enter your service account email and private key.

                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail size={14} /> Service Account
                            </Label>
                            <Input
                                placeholder="Service Account Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="key" className="flex items-center gap-2">
                                <Key size={14} /> Service Key
                            </Label>
                            <div className="relative">
                                <Input
                                    placeholder="Private Key"
                                    type={show ? "text" : "password"}
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setshow(prev => !prev)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {!show ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button onClick={test}>
                            {loadingservice ? "Testing...." : "Test Connection"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex flex-col">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-medium">Your Service Account</h1>
                </div>
                {loadingfetch ? (
                    <>
                        <div className="mt-4 flex items-center space-x-4 justify-between p-4 rounded-xl shadow-md border">
                            <div className="flex gap-2 items-center">
                                <Skeleton className="h-6 w-6 rounded-full" />

                                <Skeleton className="h-4 w-40 rounded-md" />
                            </div>

                            <Skeleton className="h-4 w-20 rounded-md" />
                        </div>
                        <div className="mt-4 flex items-center space-x-4 justify-between p-4 rounded-xl shadow-md border">
                            <div className="flex gap-2 items-center">
                                <Skeleton className="h-6 w-6 rounded-full" />

                                <Skeleton className="h-4 w-40 rounded-md" />
                            </div>

                            <Skeleton className="h-4 w-20 rounded-md" />
                        </div>
                        <div className="mt-4 flex items-center space-x-4 justify-between p-4 rounded-xl shadow-md border">
                            <div className="flex gap-2 items-center">
                                <Skeleton className="h-6 w-6 rounded-full" />

                                <Skeleton className="h-4 w-40 rounded-md" />
                            </div>

                            <Skeleton className="h-4 w-20 rounded-md" />
                        </div>
                        <div className="mt-4 flex items-center space-x-4 justify-between p-4 rounded-xl shadow-md border">
                            <div className="flex gap-2 items-center">
                                <Skeleton className="h-6 w-6 rounded-full" />

                                <Skeleton className="h-4 w-40 rounded-md" />
                            </div>

                            <Skeleton className="h-4 w-20 rounded-md" />
                        </div>
                    </>)
                    :
                    (servicedata && servicedata.email ? (
                        <div className="mt-4 flex items-center space-x-4 justify-between p-4 rounded-xl shadow-md border">
                            <div className="flex gap-2 items-center">
                                <User2 size={25} />
                                <p className="text-muted-foreground">{servicedata.email?.substring(0, 30) + "...com"}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Button onClick={() => setopendelete(prev => !prev)} variant="destructive"><Trash /></Button>
                                <p className="text-muted-foreground">{new Date(servicedata.date).toLocaleDateString()}</p>
                            </div>
                        </div>

                    ) : (
                        <div className="mt-4 flex flex-col gap-2 items-center justify-around h-64 border-card border rounded-xl p-6 text-center">
                            <User size={35} />
                            <h2 className="text-xl font-semibold mb-2">
                                No Service Account Yet
                            </h2>
                            <p className="text-muted-foreground mb-4">
                                You haven’t added any service account. Please create one to get started.
                            </p>
                            <Button onClick={() => setopen(prev => !prev)}>Add Service Account <Plus /></Button>
                        </div>
                    ))}
            </div>
        </>
    )
}