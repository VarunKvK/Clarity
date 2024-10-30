'use client';

import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import WhyPage from "@/components/WhyPage";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { isSignedIn } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isSignedIn) {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user data.");
          }

        } catch (error) {
          console.error("Error fetching user data:", error);
          toast({
            variant: "destructive",
            title: "Error in signing in",
            description: "An issue occurred while signing in. Please try again.",
          });
        }
      };

      fetchData();
    }

    // const fetchNotion=async()=>{
    //   const response=await fetch("/api/notion",
    //     {
    //       method:"GET",
    //       headers:{
    //         "Content-Type":"application/json",
    //         Accept:"application/json",
    //       },
    //     }
    //   )
    //   console.log(await response.json())
    // }

    // fetchNotion()
  }, [isSignedIn, toast]);

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
