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
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useTheme } from "@/components/ui/themeprovider";
import { useAuthStore } from "@/store/authstore";
import { useGoogleLogin, type TokenResponse } from "@react-oauth/google";
import { ArrowRight, DoorOpenIcon, Sun, Moon, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export const Login = () => {
    //Theme
    const {
        theme,
        setTheme
    } = useTheme();
    const toggletheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    //Navigation
    const navigate = useNavigate();


    //State
    const [useremail, setuseremail] = useState<string>("");
    const [password, setpassword] = useState<string>("");

    //Store
    const {
        userlogin,
        loadinglogin,
        googlelogin,
        loadinggoogle
    } = useAuthStore();


    //Function

    const login = async () => {
        try {
            const data = await userlogin(useremail, password);
            if (data.success) {
                toast.success(data.message)
                setTimeout(() => {
                    navigate("/app/dashboard", { replace: true })
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

    const googleauth: any = useGoogleLogin({
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
            < Toaster position="top-right" />
            <div className="flex min-h-screen w-full items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => navigate("/")}><DoorOpenIcon />Back</Button>
                            <Button variant="outline" onClick={toggletheme}>
                                {theme === "light" ? <Sun /> : <Moon />}
                            </Button>
                        </div>
                        <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
                        <CardDescription>
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Field>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="example@gmail.com" value={useremail} onChange={(e) => setuseremail(e.target.value)} className="h-10" />
                            </div>
                        </Field>
                        <Field>
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <a href="#" className="text-xs text-primary hover:underline underline-offset-4">
                                        Forgot password?
                                    </a>
                                </div>
                                <Input id="password" type="password" className="h-10" placeholder="Enter Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                            </div>
                        </Field>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full h-10 font-medium group" onClick={login}>
                            {loadinglogin ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}</Button>
                        <p className="text-center text-sm text-slate-500">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="text-primary font-semibold hover:underline underline-offset-4">
                                Sign up
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