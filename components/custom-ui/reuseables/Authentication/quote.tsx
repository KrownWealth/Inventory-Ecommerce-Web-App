import React from 'react'
import { FaQuoteLeft } from 'react-icons/fa'

export function Quote() {
  return (
    <div
      className="text-white lg:w-3/5 lg:flex hidden items-center justify-start bg-[#010101] rounded-l-[6rem]">
      <div className="p-12 text-start">
        <div className="relative">

          <FaQuoteLeft className="absolute top-0 left-0 h-8 w-8" />
          <h1 className="text-4xl font-bold pl-12 leading-snug">
            Shopping from @Hometung for all my furninture interiors is one of the best desicion.
          </h1>
          <p className="mt-4 pl-12">@Sarah Wealth</p>
        </div>
      </div>
    </div>
  )
}


