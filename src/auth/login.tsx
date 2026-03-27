import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/ui/themeprovider";
import { Github, Chrome, ArrowRight, DoorOpenIcon, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const toggletheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    return (
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
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="example@gmail.com" className="h-10" />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <a href="#" className="text-xs text-primary hover:underline underline-offset-4">
                                Forgot password?
                            </a>
                        </div>
                        <Input id="password" type="password" className="h-10" placeholder="Enter Password" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full h-10 font-medium group">
                        Sign In
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-center text-sm text-slate-500">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="text-primary font-semibold hover:underline underline-offset-4">
                            Sign up
                        </Link>
                    </p>
                    <div className="relative  my-4 w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background rounded-lg px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-4">
                        <Button variant="outline" className="w-full h-10 hover:bg-slate-50">
                            <Github className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline" className="w-full h-10 hover:bg-slate-50">
                            <Chrome className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>

                </CardFooter>
            </Card>

        </div>
    )
}