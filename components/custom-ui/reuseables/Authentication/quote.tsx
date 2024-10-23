import React from 'react'
import { FaQuoteLeft } from 'react-icons/fa'

export function Quote (){
  return (
     <div
  className="text-white w-3/5 flex items-center justify-center bg-[#010101]"
  //  style={{
  //   background: "linear-gradient(208deg, rgba(0,0,0, 1) 0%, rgba(rgb(53, 57, 53),1) 26%, rgba(0, 40, 43,1) 42%, rgba(152,62,29,1) 71%, rgba(244,92,35,1) 98%)",
  //   height: "100vh", 
  // }}
>
  <div className="p-12 text-center">
        <div className="relative">
      <FaQuoteLeft className="absolute top-0 left-0 h-8 w-8" />
      <h1 className="text-4xl font-bold pl-4 leading-snug">
        Shopping from @Hometung for all my furninture interiors is one of the best desicion.
      </h1>
      <p className="mt-4">@Sarah Wealth</p>
    </div>
  </div>
</div>
  )
}


