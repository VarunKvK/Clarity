'use client'

import React from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButton from '@/components/mini_components/PaypalButton';
import { useToast } from '@/hooks/use-toast';

const pricePlan = [
    {
        name: "Free",
        price: 0,
        features: [
            "3 PDFs per month",
            "Summarize the PDFs",
            "Limited to 1 generation note",
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
            "Help center access"
        ]
    },
    {
        name: "Starter",
        price: 4.99,
        features: [
            "15 PDFs per month",
            "Summarize the PDFs",
            "Limited to 2 generation notes",
            "Notion Integration",
            "Help center access"
        ]
    },
];

const Pricing = () => {
    const { toast } = useToast();

    const handlePaymentSuccess = async (details, planName) => {
        const { email_address } = details.payer;
        // console.log(details);
        // console.log(planName);
        try {
            const response = await fetch("/api/subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email_address, plan: planName }),
            });
            if (response.ok) {
                toast({
                    title: "Payment Successful",
                    description: `Thank you for your payment for the ${planName} plan.`,
                });
                console.log("Transaction details:", details);
            } else {
                throw new Error("Failed to update subscription in database");
            }
        } catch (error) {
            console.error("Payment success error:", error);
            toast({
                variant: "destructive",
                title: "Payment Error",
                description: "Could not update subscription. Please contact support.",
            });
        }
    };

    const handlePaymentError = (error) => {
        toast({
            variant: "destructive",
            title: "Payment Failed",
            description: "An issue occurred while processing your payment. Please try again.",
        });
        console.error("Payment error:", error);
    };

    return (
        <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
            <div className="mx-auto xl:max-w-6xl lg:max-w-4xl md:max-w-2xl max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col gap-6">
                <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="font-bold text-[2rem] text-center">
                        Organize <span className="text-[#cf0] text-[2.5rem]">PDFs</span> and create notes for acing exams.
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Simple, minimal pricing focused mainly for students
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center md:gap-8 w-full">
                    {pricePlan.map((plan, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl border ${plan.name === "Pro" ? "border-[#cf0]" : "border-gray-200"
                                } p-6 shadow-sm ring-1 ${plan.name === "Pro" ? "ring-[#cf0]" : ""
                                } sm:px-8 lg:p-12`}
                        >
                            <div className="text-center">
                                <h2 className="text-lg font-medium text-white">
                                    {plan.name}
                                    <span className="sr-only"> Plan</span>
                                </h2>
                                <p className="mt-2 sm:mt-4">
                                    <strong className="text-3xl font-bold text-white sm:text-4xl">
                                        {plan.price === 0 ? "Free" : `${plan.price}$`}
                                    </strong>
                                    {plan.price !== 0 && (
                                        <span className="text-sm font-medium text-white-400">
                                            /month
                                        </span>
                                    )}
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
                            {plan.price !== 0 && (
                                <div className="mt-8">
                                    <PayPalButton
                                        price={plan.price}
                                        onSuccess={(details) => handlePaymentSuccess(details, plan.name)}
                                        onError={handlePaymentError}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </PayPalScriptProvider>
    );
};

export default Pricing;
