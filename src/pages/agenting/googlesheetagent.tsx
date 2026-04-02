import { Button } from "@/components/ui/button"
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
import { Eye, EyeOff, Key, Mail, User } from "lucide-react";
import { useState } from "react";

export const GoogleSheetagent = () => {
    const [email, setEmail] = useState<string>("");
    const [key, setKey] = useState<string>("");
    const [open, setopen] = useState<boolean>(false);
    const [show, setshow] = useState<boolean>(false);
    return (
        <>
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
                        <Button>
                            Test Connection
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="flex flex-col">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-medium">GoogleSheet Agenting</h1>
                    <p className="text-muted-foreground">Welcome To Ai-Powered GoogleSheet Automation Agent.</p>
                </div>
                <div className="mt-3">
                    <Button onClick={() => setopen(prev => !prev)}>Connection Test</Button>
                </div>
            </div>
        </>
    )
}