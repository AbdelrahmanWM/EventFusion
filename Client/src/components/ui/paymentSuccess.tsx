'use client';
import React from 'react'
import Lottie from "lottie-react";
import successAnimation from "../../public/animations/payment.json";

export default function PaymentSuccessAnimation() {
  return (
    <div className="w-1/2 mx-auto">
    <Lottie animationData={successAnimation} />
  </div>
  )
}
