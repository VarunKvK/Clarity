import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { BookOpen, Brain, Home, SquarePen } from "lucide-react";


export function FeatureGrid() {
    return (
        <BentoGrid className="xl:max-w-6xl lg:max-w-4xl md:max-w-4xl mx-auto">
            {features.map((feature, i) => (
                <BentoGridItem
                    key={i}
                    title={feature.title}
                    description={feature.description}
                    header={feature.header}
                    icon={feature.icon}
                    className={i === 2 || i === 6 ? "md:col-span-2" : ""}
                />
            ))}
        </BentoGrid>
    );
}

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]  border border-white/[0] bg-[#000]"></div>
  );

const features = [
    {
        title: "AI-Assisted Study Notes",
        description: "Save time by letting Clarity create concise, custom notes from your uploaded materials. Our AI extracts the key points, helping you focus on what matters most.",
        header: <Skeleton />,
        icon: <Brain className="h-8 w-8 text-[#cf0]" />, 
    },
    {
        title: "Centralized Material Hub",
        description: "Organize and view the filenames of your study materials, PDFs, and notes in one clean, searchable space. Only the filenames are stored, providing a quick way to access and summarize your content.",
        header: <Skeleton />,
        icon: <Home className="h-8 w-8 text-[#cf0]" />, 
    },
    {
        title: "Personalized Practice Questions",
        description: "Automatically generate practice questions based on your study content, designed to test your understanding and reinforce learning.",
        header: <Skeleton />,
        icon: <SquarePen className="h-8 w-8 text-[#cf0]" />, 
    },
    {
        title: "Seamless Notion Integration",
        description: "Effortlessly sync your study materials and AI-generated notes with Notion. Keep everything organized and easily accessible in your favorite productivity tool.",
        header: <Skeleton />,
        icon: <BookOpen className="h-8 w-8 text-[#cf0]" />,
    },
];
