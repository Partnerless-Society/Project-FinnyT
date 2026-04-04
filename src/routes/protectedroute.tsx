import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/authstore";
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom";

export const Protectedroute = () => {
    //Store
    const {
        loadinguser,
        id,
        userfetch 
    } = useAuthStore();

    //State
    const [isChecking, setIsChecking] = useState(true);

    //Functions
    useEffect(() => {
        const checkAuth = async () => {
            if (!id) {
                await userfetch();
            }
            setIsChecking(false);
        };
        checkAuth();
    }, [id, userfetch]);

    if (loadinguser || isChecking) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner className="size-10" />
            </div>
        );
    }

    if (!id) return <Navigate to="/login" replace />;

    return <Outlet />;
};