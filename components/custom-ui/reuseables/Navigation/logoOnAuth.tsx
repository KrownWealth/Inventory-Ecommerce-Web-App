import Link from "next/link"
import { FaPercentage } from "react-icons/fa"


export function LogoOnAuth(){
  return(
      <div className="flex flex-row justify-between">
              <Link href="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
                <FaPercentage className='h-8 w-8 text-pricesageOrange' />
                <span className="text-3xl font-bold text-black">PriceSage</span>
              </Link>
              {/* <LanguagSelect /> */}
            </div>
  )
}