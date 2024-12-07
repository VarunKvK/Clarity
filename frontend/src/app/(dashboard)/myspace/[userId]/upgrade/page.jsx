"use client"

import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

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

const Upgrade = () => {
    const { userId } = useParams()
    const [userStats, setUserStats] = useState(null)
    useEffect(() => {
        const fetchUserStats = async () => {
            const res = await fetch(`/api/user`)
            const data = await res.json()
            setUserStats(data?.user)
        }
        fetchUserStats()
    }, [userId])

    return (
        <div className="w-full">
            <div className="flex items-center justify-between pt-8 px-6 pb-4">
                <div className="leading-tight">
                    <h1 className="text-[3rem] font-medium">
                        Upgrade Status
                    </h1>
                    <p className="text-gray-200 font-normal opacity-50">This is where you can upgrade your subscription.</p>
                </div>
            </div>
            <div className="p-6">
                <div className="bg-[#161616] rounded-lg p-4 flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <p className="text-white font-medium text-xl">
                            Features
                        </p>
                        {pricePlan.map((plan, index) => (
                            userStats?.subscriptionLevel === plan.name && (
                                <div key={index} className="px-6">
                                    {plan.features.map((feature, index) => (
                                        <ul key={index}>
                                            <li className="text-white font-normal list-disc">{feature}</li>
                                        </ul>
                                    ))}
                                </div>
                            )
                        ))}
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-medium text-5xl text-[#cf0]">
                            {userStats?.subscriptionLevel}
                        </p>
                        <p className="text-white font-normal opacity-50">Your current status</p>
                    </div>
                </div>
                <div className="flex items-center justify-center p-12">
                    <div className="flex flex-col gap-1">
                        <p className="text-white font-normal opacity-50">
                            You can {userStats?.subscriptionLevel === "Free" ? "upgrade" : "downgrade"} your subscription here.
                        </p>
                        <Link href={`/pricing`} className="font-medium text-5xl text-[#cf0] text-center underline underline-offset-4">
                            Upgrade
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upgrade