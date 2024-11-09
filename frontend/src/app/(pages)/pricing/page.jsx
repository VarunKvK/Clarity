'use client'

import React from 'react';
import { PayPalScriptProvider,PayPalButtons } from "@paypal/react-paypal-js";
import PayPalButton from '@/components/mini_components/PaypalButton';
import { useToast } from '@/hooks/use-toast';


const pricePlan = [
    {
        name: "Starter",
        price: 4.99,
        features: [
            "5 PDFs per month",
            "Summarize the PDFs",
            "Limited to 2 generation notes",
            "Notion Integration",
            "Help center access"
        ]
    },
    {
        name: "Pro",
        price: 9.99,
        features: [
            "Unlimited PDFs",
            "Unlimited Summarize the PDFs",
            "Unlimited Create notes",
            "Unlimited Generate questions",
            "Notion Integration",
            "Email support",
            "Help center access",
        ]
    }
];

const Pricing = () => {
    const {toast}= useToast()
    const handlePaymentSuccess = (details) => {
        toast({
            title: "Payment Successful",
            description: `Thank you for your payment. Your plan is ${plan.name}.`,
        })
        console.log("Transaction details:", details);
    };

    // Handle payment error
    const handlePaymentError = (error) => {
        
        toast({
            variant:"destructive",
            title: "Payment Failed",
            description: "An issue occurred while processing your payment. Please try again.",
        })
        console.error("Payment error:", error);
    };

    return (
        <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="font-bold text-[2rem] text-center">Organize <span className="text-[#cf0] text-[2.5rem]">pdfs</span> and create notes for your acing exams.</h1>
                <p className="text-gray-500 font-medium">Simple, minimal pricing focusing mainly for students</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
                {pricePlan.map((plan, index) => (
                    <div
                        key={index}
                        className={`rounded-2xl border ${
                            plan.name === "Pro" ? "border-[#cf0]" : "border-gray-200"
                        } p-6 shadow-sm ring-1 ${
                            plan.name === "Pro" ? "ring-[#cf0]" : ""
                        } sm:px-8 lg:p-12`}
                    >
                        <div className="text-center">
                            <h2 className="text-lg font-medium text-white">
                                {plan.name}
                                <span className="sr-only"> Plan</span>
                            </h2>
                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-white sm:text-4xl">
                                    {plan.price}$
                                </strong>
                                <span className="text-sm font-medium text-white-400">
                                    /month
                                </span>
                            </p>
                        </div>
                        <ul className="mt-6 space-y-2">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5 text-[#cf0]"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                        />
                                    </svg>
                                    <span className="text-white-400">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8">
                                <PayPalButton
                                    price={plan.price}
                                    onSuccess={handlePaymentSuccess}
                                    onError={handlePaymentError}
                                />
                            </div>
                    </div>
                ))}
            </div>
        </div>
        </PayPalScriptProvider>
    );
};

export default Pricing;
