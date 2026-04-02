import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authstore"
import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Agenting = () => {

    //Store
    const {
        name
    } = useAuthStore();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-3">
            <motion.div
             initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }} 
            className="flex flex-col gap-1">
                <h1 className="text-4xl font-medium">Agenting Features</h1>
                <p className="text-muted-foreground text-medium">Welcome {name}! This is the ai agenting playground.</p>
                <p className="text-muted-foreground text-medium">We support:</p>
                <ul className="list-disc list-inside text-muted-foreground">
                    <li>Email Agenting</li>
                    <li>Auto Update Googlesheet</li>
                    <li>More Features Coming Soon.</li>
                </ul>
                <div className="mt-3">
                    <Button onClick={() => navigate("/agent/email-agent")}>Go To Playground<PlayCircle/></Button>
                </div>
            </motion.div>
            <div>
                <h1>Going To Add Video Here</h1>
            </div>
        </div >
    )
}