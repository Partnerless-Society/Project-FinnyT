import {
    Wallet,
    TrendingUp,
    ReceiptText,
    PiggyBank,
    CreditCard,
    BadgeDollarSign,
    LayoutDashboard,
    Sun,
    Moon,
    BotMessageSquare
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
    SidebarGroupContent,
    SidebarFooter
} from "@/components/ui/sidebar";
import { Link, Outlet } from "react-router-dom";
import { useTheme } from "@/components/ui/themeprovider";

const navItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Agenting", url: "/agent", icon: BotMessageSquare },

];

export const Sidebarrrender = () => {
 const {theme, setTheme} = useTheme();

    const toggletheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    
    return (
        <SidebarProvider defaultOpen={false}>
            <Sidebar collapsible="icon" variant="floating">
                <SidebarHeader className="flex w-full justify-between">
                    <div className="flex w-full items-center">
                        <SidebarTrigger />
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xl fond-bold text-black dark:text-white"><BadgeDollarSign className="mr-2" /> FinnyT</SidebarGroupLabel>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild tooltip={item.title}>
                                            <Link to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenuButton onClick={toggletheme}>
                        {theme === "light" ? (<> <Sun /><span>Light</span> </>) : (<> <Moon /><span>Dark</span> </>)}
                    </SidebarMenuButton>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <div className="bg-background fixed py-2 px-3 top-0 left-0 w-full flex flex-row items-center gap-3 border-b md:hidden ">
                    <SidebarTrigger className="md:hidden" />
                    <h1 className="text-xl font-bold">FinnyT</h1>
                </div>
                <main className="flex flex-col px-5 py-15 md:py-4">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};