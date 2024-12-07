import React from 'react';
import Image from 'next/image';
import { ShopBtn } from '@/components/custom-ui/reuseables';




const Page = async () => {

  return (
    <>
      <section className='relative flex w-full h-[460px]'>
        <div className='bg-[#004631] z-10 flex flex-col justify-center md:pl-20 pl-8'>

          <h2 className="font-satoshi-black flex items-center justify-center text-2xl md:text-4xl capitalize leading-snug text-white ">
            Deluxe & Luxury Interiors at Your Fingertip
          </h2>
          <ShopBtn />

        </div>

        <div className='hero-bg relative'>
          <Image src="/images/product-page-2.png" alt="Home Image" fill className='object-cover' />
        </div>

      </section>
      <section className='max-w-7xl mt-24 mb-20 px-8 md:px-12 mx-auto'>
        <h2 className='text-2xl md:text-4xl text-black font-medium'> Shop beautiful Interiors from the comfort of your home.</h2>
      </section>
    </>
  );
};

export default Page;
