import { Button } from "@/components/ui/button"
import { ArrowUp, Book, CircleCheck, Currency, HomeIcon, Menu, Moon, Sun, Toolbox, ToolboxIcon, ToolCase, ToolCaseIcon, X } from "lucide-react"
import { useTheme } from "@/components/ui/themeprovider"
import { useEffect, useRef, useState } from "react";
import { features } from "@/features/features";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export const Home = () => {

    const { theme, setTheme } = useTheme();
    const homeRef = useRef<HTMLDivElement | null>(null);
    const toolref = useRef<HTMLDivElement | null>(null);
    const functionsRef = useRef<HTMLDivElement | null>(null);
    const [menutoggle, setmenutoggle] = useState<boolean>(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    const toggletheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);

            if (menutoggle) {
                setmenutoggle(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [menutoggle]);

    return (
        <>
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="fixed bottom-5 right-5 p-2 z-100 rounded-full shadow-lg bg-background border border-gray-500 transition"
                    >
                        <ArrowUp />
                    </motion.button>
                )}
            </AnimatePresence>
            <header className="fixed top-0 flex border-b bg-background border-gray-500 justify-between z-50 items-center w-full px-5 py-3">
                <div className="flex items-center gap-2">
                    <Currency />
                    <h1 className="text-2xl font-medium">FazeIn</h1>
                </div>
                <div className="flex gap-3 max-md:hidden">
                    <button onClick={() => scrollTo(homeRef)}>Home</button>
                    <button onClick={() => scrollTo(toolref)}>Tools</button>
                    <button onClick={() => scrollTo(functionsRef)}>Functions</button>
                </div>
                <div className="flex gap-3 max-md:hidden">
                    <Button className="rounded-full" variant="outline" onClick={toggletheme}>
                        {theme === "light" ? <Sun /> : <Moon />}
                    </Button>
                    <Button>SignUp</Button>
                </div>
                <div className="md:hidden" onClick={() => setmenutoggle(prev => !prev)}>
                    {menutoggle ? <X /> : <Menu />}
                </div>
                <AnimatePresence>
                    {menutoggle && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-14 left-0 w-full bg-background text-foreground z-50 border-b border-border flex flex-col items-end gap-4 p-5"
                        >
                            <button onClick={() => scrollTo(homeRef)}>Home</button>
                            <button onClick={() => scrollTo(toolref)}>Tools</button>
                            <button onClick={() => scrollTo(functionsRef)}>Functions</button>
                            <Button className="rounded-full" variant="outline" onClick={toggletheme}>
                                {theme === "light" ? <Sun /> : <Moon />}
                            </Button>
                            <Button>SignUp</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
            <section ref={homeRef} className="flex flex-col min-h-screen justify-center items-center px-25 max-md:px-15">
                <Button variant="outline" className="rounded-3xl animate-bounce"><CircleCheck className="text-green-500" /> Fast And Effective</Button>
                <div className="flex flex-col gap-3 text-center mt-5">
                    <h1 className="text-5xl max-md:text-4xl">Experience The Ai Powered Financial Management.</h1>
                    <p className="">Automate your finances, predict future trends, and make confident decisions with intelligent AI-driven.{<br />}Trusted by businesses to simplify and scale financial operations.
                    </p>
                    <div className="flex gap-3 justify-center items-center">
                        <Button><HomeIcon /> Get Started Free</Button>
                        <Button><Book /> Book a Demo</Button>
                    </div>
                </div>
            </section>
            <section ref={toolref} className="flex min-h-screen justify-center items-center px-25 max-md:px-15 ">
                <div className="flex flex-col gap-3 max-md:mt-20">
                    <div className="max-md:flex-col flex items-center max-md:items-start gap-3">
                        <ToolboxIcon className="size-10 text-blue-500" />
                        <h1 className="text-3xl text-start font-medium">Powerful Tools To Support Finances</h1>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {features.map((element) => {
                            const Props = element.props;
                            return (
                                <Card key={element.id} className="transition hover:scale-102">
                                    <CardHeader>
                                        <CardTitle>{element.title}</CardTitle>
                                        <CardAction>
                                            <Button variant="outline" className="p-2">
                                                <Props />
                                            </Button></CardAction>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>{element.desc}</CardDescription>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>
            <section>

            </section>
        </>
    )
}