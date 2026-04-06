import { Button } from "@/components/ui/button"
import { ArrowUp, BadgeDollarSign, CircleCheck, CookieIcon, HomeIcon, Menu, Moon, Sun, ToolboxIcon, X } from "lucide-react"
import { useTheme } from "@/components/ui/themeprovider"
import { useEffect, useRef, useState } from "react";
import { carousel, features, lists, step } from "@/features/features";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authstore";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

export const Home = () => {
    //Theme
    const { theme,
        setTheme
    } = useTheme();

    const toggletheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    //Navigation
    const navigate = useNavigate();

    //Store
    const {
        id,
        userfetch
    } = useAuthStore();

    //States
    const homeRef = useRef<HTMLDivElement | null>(null);
    const toolref = useRef<HTMLDivElement | null>(null);
    const workRef = useRef<HTMLDivElement | null>(null);
    const sessionRef = useRef<HTMLDivElement | null>(null);
    const reviewRef = useRef<HTMLDivElement | null>(null);
    const [menutoggle, setmenutoggle] = useState<boolean>(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [open,setopen] = useState<boolean>(false);

    //Function
    const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
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

    useEffect(() => {
        userfetch();
    }, []);

    return (
        <>
            <Drawer open={open} onOpenChange={setopen}>
                <DrawerContent className="p-4">
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader className="flex flex-col items-center text-center">
                            <div className="bg-primary/10 p-3 rounded-full mb-2">
                                <CookieIcon className="h-6 w-6 text-primary" />
                            </div>
                            <DrawerTitle className="text-xl">We use cookies</DrawerTitle>
                            <DrawerDescription>
                                We use cookies to enhance your experience during login, session persist, analyze site traffic, and serve better ads.
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className="flex justify-center flex-row gap-2 pt-2">
                            <Button variant="default" onClick={() => setopen(false)}>
                                Accept All
                            </Button>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
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
                    <BadgeDollarSign />
                    <h1 className="text-2xl font-medium">FinnyT</h1>
                    <div className="ml-5 flex gap-3 text-sm max-md:hidden">
                        <button onClick={() => scrollTo(homeRef)}>Home</button>
                        <button onClick={() => scrollTo(toolref)}>Tools</button>
                        <button onClick={() => scrollTo(workRef)}>How It Work?</button>
                        <button onClick={() => scrollTo(sessionRef)}>Why Choose Us?</button>
                        <button onClick={() => scrollTo(reviewRef)}>Review</button>
                    </div>
                </div>

                <div className="flex gap-3 max-md:hidden">
                    <Button className="rounded-full" variant="outline" onClick={toggletheme}>
                        {theme === "light" ? <Sun /> : <Moon />}
                    </Button>
                    {id ? <Button onClick={() => navigate("/app/dashboard")}>Dashboard</Button> : <Button onClick={() => navigate("/signup")}>SignUp</Button>}
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
                            <button onClick={() => scrollTo(workRef)}>How It Work?</button>
                            <button onClick={() => scrollTo(sessionRef)}>Why Choose Us?</button>
                            <button onClick={() => scrollTo(reviewRef)}>Review</button>

                            <Button className="rounded-full" variant="outline" onClick={toggletheme}>
                                {theme === "light" ? <Sun /> : <Moon />}
                            </Button>
                            {id ? <Button onClick={() => navigate("/app/dashboard")}>Dashboard</Button> : <Button onClick={() => navigate("/signup")}>SignUp</Button>}
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
            <section ref={homeRef} className="flex flex-col min-h-screen justify-center items-center px-25 max-md:px-15">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}>
                    <Button variant="outline" className="rounded-3xl animate-pulse"><CircleCheck className="text-green-500" /> Fast And Effective</Button>
                </motion.div>
                <div className="flex flex-col gap-3 text-center mt-5">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl max-md:text-4xl">Experience The Ai Powered Financial Management With Agenting.</motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >Automate your finances, predict future trends, and make confident decisions with intelligent AI-driven.{<br />}Trusted by businesses to simplify and scale financial operations.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex gap-3 justify-center items-center">
                        <Button onClick={() => navigate("/app/dashboard")}><HomeIcon /> Get Started Free</Button>
                    </motion.div>
                </div>
            </section>
            <section ref={toolref} className="flex min-h-screen justify-center items-center md:py-20 px-25 max-md:px-15 ">
                <div className="flex flex-col gap-3 max-md:mt-20">
                    <div className="max-md:flex-col flex items-center max-md:items-start gap-3">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ToolboxIcon className="size-10 text-blue-500" />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl text-start font-medium">
                            Powerful Tools To Support Finances
                        </motion.h1>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-7 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {features.map((element) => {
                            const Props = element.props;
                            return (
                                <motion.div key={element.id}
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full"
                                >
                                    <Card className="transition hover:scale-102 ">
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
                                </motion.div>
                            )
                        })}

                    </div>
                </div>
            </section >
            <section ref={workRef} className="flex justify-center items-center min-h-screen px-25 max-md:px-15">
                <div className="flex flex-col items-center gap-3 max-md:mt-20">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-medium text-center">How It Works?
                    </motion.h1>
                    <ol className="list-inside space-y-5 mt-5">
                        <AnimatePresence>
                            {lists.map((element) => (
                                <motion.li
                                    key={element.id}
                                    initial={{ opacity: 0, x: element.id % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5 }}
                                    className="list-decimal text-[17px] ">
                                    {element.desc}
                                </motion.li>
                            ))}
                        </AnimatePresence>

                    </ol>
                </div>
            </section >
            <section ref={sessionRef} className="flex justify-center items-center min-h-screen py-25 max-md:px-15 px-25">
                <div className="flex flex-col items-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-medium text-center">Why Choose Our AI Financial System?
                    </motion.h1>
                    <div className="relative w-full max-w-4xl mt-5">
                        <div className="absolute left-1/2 top-0  h-full w-0.5 bg-gray-400"></div>
                        {step.map((element) => (
                            <div key={element.id} className="grid grid-cols-2 gap-5 py-10 items-center">
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, x: element.id % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5 }}
                                        className={`${element.id % 2 == 0 ? "col-start-1 text-right pr-10" : "col-start-2 pl-10"}`}>
                                        <h2 className="font-semibold text-xl">{element.title}</h2>
                                        <p>{element.desc}</p>
                                    </motion.div>
                                </AnimatePresence>
                                <div className="absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-background dark:border-white border-gray-500 border rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section ref={reviewRef} className="flex justify-center items-center min-h-screen max-md:px-15 px-25">
                <div className="flex flex-col items-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-medium">What Our Users Say</motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="mt-5">
                        <Carousel
                            opts={{ align: "center", loop: false }}
                            className="w-full max-w-[80vw] relative"
                        >
                            <CarouselContent className="-ml-2 md:-ml-4">
                                {Array.from(carousel).map((element, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="pl-2 md:pl-4 basis-full max-sm:w-20 max-md:w-30 md:basis-1/2"
                                    >
                                        <div className="p-1">
                                            <Card className="w-full ">
                                                <CardContent className="pt-6 ">
                                                    <CardDescription className="text-sm text-accent-foreground">"{element.comment}"</CardDescription>
                                                </CardContent>
                                                <CardFooter>
                                                    <p className="text-xl text-muted-foreground font-medium">{element.user}</p>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="flex justify-center gap-4 mt-8 md:block">
                                <CarouselPrevious className="static md:absolute translate-y-0 md:-left-12" />
                                <CarouselNext className="static md:absolute translate-y-0 md:-right-12" />
                            </div>
                        </Carousel>
                    </motion.div>
                </div>
            </section>
            <section>

            </section>
            <footer className="w-full border-t bg-background py-15">
                <div className=" mx-auto px-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="md:col-span-3 space-y-6">
                            <h2 className="flex gap-2 items-center text-2xl font-bold tracking-tight text-primary">
                                <BadgeDollarSign />
                                FinnyT
                            </h2>
                            <p className="max-w-xs leading-relaxed">
                                Making financial intelligence accessible for everyone. Automate your tracking, gain insights, and grow your wealth.
                            </p>
                            {/*
                            <div className="flex gap-5">
                                <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
                                <a href="#" className="hover:text-primary transition-colors"><Github size={20} /></a>
                                <a href="#" className="hover:text-primary transition-colors"><Linkedin size={20} /></a>
                            </div> */}
                        </div>
                    </div>
                    <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-start gap-4">
                        <p className="text-sm ">
                            © {new Date().getFullYear()} FinnyT. All Rights Reserved.
                        </p>
                        <div className="flex gap-5 text-xs font-medium ">
                            <p onClick={() => setopen(true)} className="cursor-pointer hover:text-gray-500">Cookies</p>
                            <p onClick={() => navigate("/contact")} className="cursor-pointer hover:text-gray-500">Contact Support</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}