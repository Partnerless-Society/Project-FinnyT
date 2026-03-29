import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/authstore";
import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom";

export const Protectedroute = () => {
    const { userfetch, loadinguser, id } = useAuthStore();

    useEffect(() => {
        if (!id) {
            userfetch();
        }
    }, [id, userfetch]);

    if (loadinguser) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner className="size-10"/>
            </div>
        );
    }
    if (!id) {
        return <Navigate to="/login" />
    }
    return <Outlet />
}