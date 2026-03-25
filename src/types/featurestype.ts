import type { LucideProps } from "lucide-react";
import type React from "react";

export interface Features {
    id : number,
    title : string,
    desc : string,
    props : React.FC<LucideProps>
}