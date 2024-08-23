import { LanguagSelect, Login, SignUp, SignupWithGoogle } from "@/components/custom-ui/reuseables";
import { FaPercentage, FaQuoteLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";


export default function LoginPage() {
  return (
    <div className="w-full bg-white">
      <div className="flex flex-row min-h-screen">
        <div className="w-2/5 px-12 p-8">
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-row justify-between">
              <Link href="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
                <FaPercentage className='h-8 w-8 text-pricesageOrange' />
                <span className="text-3xl font-bold text-black">PriceSage</span>
              </Link>
              <LanguagSelect />
            </div>
            <div className="flex flex-col space-y-8">

              <div>
                <h2 className="text-lg font-semibold text-black ">Hi, <span className="text-2xl">Login</span> to PriceMarkup</h2>
                {/* <p className="text-pricesageBlack">Please login and start enjoying PriceMarkup</p> */}
              </div>
              <SignupWithGoogle />
            </div>

            <Login />

          </div>
        </div>
      <div
  className="text-white w-3/5 flex items-center justify-center"
   style={{
    background: "linear-gradient(208deg, rgba(244,92,35,1) 0%, rgba(152,62,29,1) 26%, rgba(152,62,29,1) 42%, rgba(152,62,29,1) 71%, rgba(244,92,35,1) 98%)",
    height: "100vh",
  }}
>
  <div className="p-12 text-center">
        <div className="relative">
      <FaQuoteLeft className="absolute top-0 left-0 h-8 w-8" />
      <h1 className="text-4xl font-bold pl-8">
        Using @pricemarkup to automatically generate selling price for all my inventory products helps me reduce loss and guesswork.
      </h1>
      <p className="mt-4">@Sarah Wealth</p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
