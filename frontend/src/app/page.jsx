'use client';

import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import WhyPage from "@/components/WhyPage";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full h-auto">
      <Header />
      <WhyPage />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
