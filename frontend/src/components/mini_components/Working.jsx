"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export function HowItWorksDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      {/* Step 1: Upload Your Materials */}
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-[#cf0] min-h-[400px] lg:min-h-[300px]"
        className="">
        <div className="max-w-xs">
          <h2
            className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-black">
            Step 1: Upload Your Materials
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-900">
            Start by uploading your PDFs, lecture notes, or any other study materials. Clarity will instantly recognize and process the content for you.
          </p>
        </div>
        {/* <Image
          src="/placeholder-image.png"
          width={500}
          height={500}
          alt="Upload materials"
          className="absolute -right-4 lg:-right-[40%] filter grayscale -bottom-10 object-contain rounded-2xl bg-gray-300" /> */}
      </WobbleCard>

      {/* Step 2: AI-Driven Organization */}
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-[#1111]">
        <h2
          className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Step 2: AI-Driven Organization
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Clarity’s AI helps you tag, categorize, and organize your content into clear sections, making it easy to find what you need.
        </p>
      </WobbleCard>

      {/* Step 3: Get Custom Notes & Questions */}
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-3 bg-[#cf0] min-h-[400px] lg:min-h-[500px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2
            className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-[#111]">
            Step 3: Get Custom Notes & Questions
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-[#111]">
            Generate concise notes and personalized practice questions from your materials. Whether you need a quick review or in-depth practice, Clarity has you covered.
          </p>
        </div>
        {/* <Image
          src="/placeholder-image.png"
          width={500}
          height={500}
          alt="Custom notes"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl bg-gray-400" /> */}
      </WobbleCard>
    </div>
  );
}
