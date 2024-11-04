"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";

export default function Loading() {
    return (
        <div
            className="h-[90vh] relative w-full bg-[#111] flex flex-col items-center justify-center overflow-hidden rounded-md">
            <div className="w-full absolute inset-0 h-screen">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#cf0" />
            </div>
            <h1
                className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20 animate-pulse">
                Please Wait
            </h1>
        </div>
    );
}
