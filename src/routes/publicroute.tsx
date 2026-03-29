import { useAuthStore } from "@/store/authstore";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";

export const Publicroute = () => {
    //Store
    const { id, loadinguser, userfetch } = useAuthStore();

    //Function
    useEffect(() => {
        if (!id) {
            userfetch();
        }
    }, [id, userfetch]);
    
    if (loadinguser) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner className="size-10" />
            </div>
        );
    }

    return id ? <Navigate to="/app/dashboard" replace /> : <Outlet />;
};