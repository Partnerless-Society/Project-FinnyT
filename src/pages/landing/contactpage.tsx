import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ui/themeprovider"
import { DoorOpenIcon, Moon, Send, Sun } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/authstore"
import { toast, Toaster } from "sonner"
import { Spinner } from "@/components/ui/spinner"
export const ContactPage = () => {

    //Store
    const {
        supportmessage,
        loadingsupport
    } = useAuthStore();

    //Theme
    const {
        theme,
        setTheme
    } = useTheme();
    const toggletheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    //States
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    //Navigate
    const navigate = useNavigate();

    //Function
    const send = async () => {
        try {
            const result = await supportmessage(name, email, message);
            if (result.success) {
                toast.success(result.message);
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
            setName("");
            setEmail("");
            setMessage("");
        }
    }

    return (
        <>
            <Toaster position="top-right" />
            <div className="flex flex-col justify-center items-center h-screen max-w-xl mx-auto p-8">
                <div className="w-full flex justify-between">
                    <Button variant="outline" onClick={() => navigate("/")}><DoorOpenIcon /> Back</Button>
                    <Button variant="outline" onClick={toggletheme}>
                        {theme === "light" ? <Sun /> : <Moon />}
                    </Button>
                </div>
                <h1 className="text-3xl font-semibold mb-2">Contact Us</h1>
                <p className="mb-6 text-muted-foreground text-center">Have a question or feedback?</p>
                <div className="w-full mt-2">
                    <label className="mb-2 block text-sm font-medium">Name</label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                    />
                </div>

                <div className="w-full mt-2">
                    <label className="mb-2 block text-sm font-medium">Email</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </div>

                <div className="w-full mt-2">
                    <label className="mb-2 block text-sm font-medium">Message</label>
                    <Textarea
                        value={message}
                        className="w-full h-30 resize-none"
                        style={{ scrollbarWidth: "none" }}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message..."
                    />
                </div>

                <div className="flex items-center gap-2 mt-5">
                    <Button onClick={send}>
                        {loadingsupport ? <><Spinner /> Sending....</> : <><Send /> Send </>}
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => {
                            setName("")
                            setEmail("")
                            setMessage("")
                        }}
                    >
                        Clear
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ContactPage