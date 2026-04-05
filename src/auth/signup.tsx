import { authapi } from "@/api/authapi";
import { GoogleIcon } from "@/components/googleicon";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useTheme } from "@/components/ui/themeprovider";
import { useAuthStore } from "@/store/authstore";
import { useGoogleLogin, type TokenResponse } from "@react-oauth/google";
import { DoorOpenIcon, ArrowRight, Sun, Moon, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export const Signup = () => {
    //Theme
    const { theme, setTheme } = useTheme();
    const toggletheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    //Navigation
    const navigate = useNavigate();


    //State
    const [username, setusername] = useState<string>("");
    const [useremail, setuseremail] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [confirmpassword, setconfirmpassword] = useState<string>("");

    //Store
    const {
        usersignup,
        loadingsignup,
        googlelogin,
        loadinggoogle
    } = useAuthStore();

    //Function
    const signup = async () => {
        try {
            const data = await usersignup(username, useremail, password, confirmpassword);
            if (data.success) {
                toast.success(data.message)
                setTimeout(() => {
                    navigate("/login", { replace: true })
                }, 2000);
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
    }

    
        const googleauth : any = useGoogleLogin({
            onSuccess: async (response: TokenResponse) => {
                try {
                    const result = await authapi.googletoken(response);
                    console.log(result);
                    const feedback = await googlelogin(
                        result.name,
                        result.email,
                    )
                    toast.success(feedback.message);
                    setTimeout(() => {
                        navigate("/app/dashboard", { replace: true })
                    }, 2000);
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
            },
            onError: () => {
                toast.error("Google login fail!")
            }
        });

    return (
        <>
            <Toaster position="top-right" />
            <div className="flex min-h-screen w-full items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => navigate("/")}><DoorOpenIcon />Back</Button>
                            <Button variant="outline" onClick={toggletheme}>
                                {theme === "light" ? <Sun /> : <Moon />}
                            </Button>
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
                        <CardDescription>
                            Enter your email below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Field>
                            <div className="grid gap-2">
                                <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
                                <Input id="full-name" type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder="Enter Username" />
                            </div>
                        </Field>
                        <Field>
                            <div className="grid gap-2">
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" type="email" value={useremail} onChange={(e) => setuseremail(e.target.value)} placeholder="example@gmail.com" />
                            </div>
                        </Field>
                        <Field>
                            <div className="grid gap-2">
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input id="password" type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter Password" />
                            </div>
                        </Field>
                        <Field>
                            <div className="grid gap-2">
                                <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
                                <Input id="confirmpassword" type="password" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} placeholder="Enter Confirm Password" />
                            </div>
                        </Field>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full group" onClick={signup}>
                            {loadingsignup ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create account
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary font-semibold hover:underline underline-offset-4">
                                Sign in
                            </Link>
                        </p>
                        <div className="relative my-4 w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-card px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 w-full gap-4"> 
                            <Button onClick={googleauth} variant="outline" className="w-full rounded-full">
                                 {loadinggoogle ? <>
                                    <Spinner />
                                    Signing in...
                                </> : <>
                                    <GoogleIcon />
                                    Google
                                </>}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}