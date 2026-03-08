import { Button } from "@/components/ui/button"
import { Currency, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/ui/themeprovider"
import { useRef } from "react";

export const Home = () => {

    const { theme, setTheme } = useTheme();
    const homeRef = useRef<HTMLDivElement | null>(null);
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const functionsRef = useRef<HTMLDivElement | null>(null);

    const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    const toggletheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <>
            <header className="flex border-b border-gray-500 justify-between items-center w-full px-5 py-3">
                <div className="flex items-center gap-2">
                    <Currency />
                    <h1 className="text-2xl font-medium">Financial</h1>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => scrollTo(homeRef)}>Home</button>
                    <button onClick={() => scrollTo(aboutRef)}>About</button>
                    <button onClick={() => scrollTo(functionsRef)}>Functions</button>
                </div>
                <div className="flex gap-3">
                    <Button className="rounded-full" variant="outline" onClick={toggletheme}>
                        {theme === "light" ? <Sun /> : <Moon />}
                    </Button>
                    <Button>SignUp</Button>
                </div>
            </header>
            <section ref={homeRef} className="flex min-h-screen justify-center items-center px-15">
                <div className="flex flex-col gap-3 text-center">
                    <h1 className="text-4xl">Experience The Ai Powered Financial Management.</h1>
                    <p className="">Financial is a bla bla bla</p>
                    <div className="flex gap-3 justify-center items-center">
                        <Button>Start</Button>
                        <Button>Start</Button>
                    </div>
                </div>
            </section>
            <section ref={aboutRef} className="flex min-h-screen justify-center items-center x-15">
               
            </section>
        </>
    )
}