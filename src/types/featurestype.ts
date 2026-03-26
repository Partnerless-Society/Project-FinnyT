import type { LucideProps } from "lucide-react";
import type React from "react";

export interface Features {
    id : number,
    title : string,
    desc : string,
    props : React.FC<LucideProps>
}

export interface steps {
    id : number,
    title : string,
    desc : string
}

export interface list {
    id : number,
    desc : string
}

export interface carouselitems {
    id : number,
    user : string,
    comment : string
}