"use client"

import { useContext } from "react"
import ServicesClientContext from "@/contexts/ServicesClientContext"

export const useServicesClient = ()=>{
    const context = useContext(ServicesClientContext)
    if (!context){
        throw new Error("useServicesClient must be used within a ServicesClientProvider")
    }
    return context;
}