'use client'

import Filters from "@/components/navbar/Filters";
import {usePathname} from "next/navigation";

export default function FiltersWrapper() {
    const pathname = usePathname();

    if(pathname === '/members') return <Filters />;
    else return null;

}
