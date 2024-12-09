"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const OnboardingScreen = () => {
  const router = useRouter();

  const navigateTo = (role: string) => {
    if (role === "admin") {
      router.push("/dashboard");
    } else if (role === "user") {
      router.push("/frontend");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pricesageBlackTwo text-white px-4">
      <Card className="border-none max-w-sm md:max-w-lg w-full bg-pricesageBlackTwo rounded-sm 
      shadow-2xl shadow-[rgba(255,255,255,0.1)] p-4 md:p-10 space-y-8">
        <div className="flex items-center justify-center mx-auto">
          <Image src="/images/price-sage-logo-trans.png" alt="logo" width={200} height={200} />
        </div>
        <h1 className="text-4xl font-extrabold text-white capitalize">
          Welcome
        </h1>
        <p className="text-pricesagePaleBlue leading-relaxed">
          Choose your interface to get started. Whether you&apos;re an admin or a user, we&apos;ve got you covered.
        </p>
        <div className="space-y-5">
          <button
            onClick={() => navigateTo("user")}
            className="w-full py-3 bg-white hover:bg-pricesageOrange text-black hover:text-white font-semibold rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Access User Interface
          </button>
          <button
            onClick={() => navigateTo("admin")}
            className="w-full py-3 bg-pricesageBurntOrange hover:bg-pricesageOrange text-white font-semibold rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Access Admin Dashboard
          </button>

        </div>
      </Card>
    </div>
  );
};

export default OnboardingScreen;
