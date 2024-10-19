import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import WhyPage from "@/components/WhyPage";
import Image from "next/image";

export default function Home() {
  return (
    <div className="xl:max-w-6xl lg:max-w-4xl md:max-w-2xl max-w-2xl w-full h-screen">
      <Navbar/>
      <Header/>
      <WhyPage/>
      <HowItWorks/>
    </div>
  );
}
