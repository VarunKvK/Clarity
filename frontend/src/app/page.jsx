import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-6xl w-full h-screen">
      <Navbar/>
      <Header/>
    </div>
  );
}
