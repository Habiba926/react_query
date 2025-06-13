"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./Navbar";

export default function Layout({children}){
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            <div className="py-5 px-10">
                {children}
            </div>
        </QueryClientProvider>
    )
}