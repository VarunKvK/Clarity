"use client";
import React from "react";
import { SparklesCore } from "../ui/sparkles";
import { FlipWords } from "../ui/flip-words";

export default function Loading() {
    const words = ["organized", "efficient", "smart", "streamlined", "intuitive", "focused", "study-friendly", "productive", "optimized", "clean", "powerful", "seamless"];

    return (
        <div
            className="h-[100vh] relative w-full bg-[#111] flex flex-col items-center justify-center overflow-hidden rounded-md">
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
            <FlipWords words={words} className="md:text-7xl text-3xl lg:text-6xl font-normal text-center text-white relative z-20" />
        </div>
    );
}
