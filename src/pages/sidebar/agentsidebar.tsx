import {
    BadgeDollarSign,
    Sun,
    Moon,
    LogOut,
    Github,
    SheetIcon,
    DoorOpen,
    Settings
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
    SidebarFooter,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/ui/themeprovider";
import { useAuthStore } from "@/store/authstore";
import { toast } from "sonner";
import { useDataStore } from "@/store/datastore";
import { GoogleIcon } from "@/components/googleicon";

const navItems = [
    { title: "GoogleSheet", url: "/agent/googlesheet-agent", icon: SheetIcon },
    { title: "Service Settings", url: "/agent/settings", icon: Settings },
];

export const Sidebarrrenderagent = () => {
    //Theme
    const { theme, setTheme } = useTheme();
    const toggletheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    //Navigation
    const navigate = useNavigate();

    //Store
    const { name,
        email,
        type,
        userlogout } = useAuthStore();
    const { reset } = useDataStore();

    //Function
    const handlelogout = async () => {
        try {
            const result = await userlogout();
            reset();
            if (result.success) {
                toast.success(result.message);
                navigate("/login", { replace: true })
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

    return (
        <SidebarProvider defaultOpen={false}>
            <Sidebar collapsible="icon" variant="floating">
                <SidebarHeader className="flex w-full justify-between">
                    <div className="flex justify-between w-full items-center">
                        <SidebarTrigger />
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xl fond-bold text-black dark:text-white"><BadgeDollarSign className="mr-2" />FinnyT-Agent</SidebarGroupLabel>
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
                    <SidebarMenuButton tooltip="Back" onClick={() => navigate("/app/dashboard")}>
                        <DoorOpen /> Back
                    </SidebarMenuButton>
                    <div className="flex items-center justify-between">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="border-t flex items-center w-full gap-2 py-2 hover:bg-black/15 rounded-lg">
                                    <Avatar className="shrink-0">
                                        <AvatarFallback className="bg-white border border-gray-400 font-medium text-black">
                                            {(() => {
                                                switch (type) {
                                                    case "finnyT":
                                                        return name?.substring(0, 1).toUpperCase();
                                                    case "google":
                                                        return <GoogleIcon/>;
                                                    case "guest":
                                                        return <Github />;
                                                }
                                            })()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col text-left truncate mr-5">
                                        <span className="text-sm font-medium">{name}</span>
                                        <span className="text-xs text-muted-foreground">{email}</span>
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="right" align="end" className="w-40">
                                <DropdownMenuLabel>{name} </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={toggletheme}>
                                    {theme === "light" ? (<> <Sun className="mr-2 h-4 w-4" /><span>Light</span> </>) : (<> <Moon className="mr-2 h-4 w-4" /><span>Dark</span> </>)}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handlelogout} >
                                    <LogOut className="mr-2 h-4 w-4 text-red-600" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <div className="z-50 bg-background fixed py-2 px-3 top-0 left-0 w-full flex flex-row items-center gap-3 border-b md:hidden ">
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