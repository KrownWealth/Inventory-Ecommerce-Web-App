import { LanguagSelect, Login, SignUp, SignupWithGoogle } from "@/components/custom-ui/reuseables";
import { FaPercentage } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";


export default function LoginPage() {
  return (
    <div className="w-full bg-white">
      <div className="flex flex-row min-h-screen">
        <div className="w-1/2 px-12 p-8">
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
                <h2 className="text-xl font-semibold text-black ">Hi, Login to PriceSage</h2>
                <p className="text-pricesageBlack">Please login and start enjoying PriceSage</p>
              </div>
              <SignupWithGoogle />
            </div>

            <Login />

          </div>
        </div>
        <div
          className="text-white w-1/2"
          style={{
            backgroundImage: `url("/images/authBg.svg")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex items-center justify-center">
            <Image src="/images/growth.svg" alt="Authentication Price percentage project" width={100} height={100} />
          </div>
        </div>
      </div>
    </div>
  );
}
