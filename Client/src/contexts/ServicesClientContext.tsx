"use client";

import React, { createContext } from "react";
import ServiceClient from "../ServicesClient/servicesClient";
const ServicesClientContext = createContext<ServiceClient | null>(null);
import dotenv from "dotenv";
dotenv.config();
export const ServicesClientContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    const baseURL:string|undefined= process.env.NEXT_PUBLIC_URL;
    if(!baseURL){
        return null;
    }
  const serviceClientInstance = ServiceClient.getInstance(baseURL);

  return (
    <ServicesClientContext.Provider value={serviceClientInstance}>
      {children}
    </ServicesClientContext.Provider>
  );
};
export default ServicesClientContext;
