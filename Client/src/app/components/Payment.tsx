"use client";
import React, { useEffect, useState } from "react";
import CheckoutPage from "./CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment() {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(parseFloat((Math.random() * 100).toFixed(2)));
  }, []);

  // const amount = 199.99

  return (
    <section className="bg-muted h-screen pt-10">
      <div className="max-w-6xl mx-auto p-10 text-slate-100 text-center border-black rounded-md bg-gradient-to-tr from-[#253239] to-[#818181]">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Client</h1>
          <h2 className="text-2xl">
            has requested
            <span className="font-bold"> ${amount}</span>
          </h2>
        </div>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      </div>
    </section>
  );
}
