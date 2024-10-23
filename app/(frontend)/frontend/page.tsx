import React from 'react';
import Image from 'next/image';
import { Satoshi_Black } from '@/lib/fonts';
import { cn } from '@/lib';
import { ShopBtn } from '@/components/custom-ui/reuseables';

const Page = async () => {

  return (
    <>
      <section className='relative flex w-full h-[450px]'>
        <div className='w-1/2 bg-[#004631] z-10 flex flex-col justify-center container pl-20'>
          <h2 className={cn("font-semibold flex items-center justify-center text-4xl capitalize leading-snug text-white ", Satoshi_Black.className)}>
            Deluxe & Luxury Interiors at Your Fingertip
          </h2>
          <ShopBtn />
        </div>

        <div className='hero-bg w-1/2 relative'>
          <Image src="/images/home-images.webp" alt="Home Image" fill className='object-cover' />
        </div>
      </section>
      <section className='container p-8'>
        <h2 className='text-4xl text-black pt-12 font-medium'> Shop beautiful Interiors from the comfort of your home.</h2>
      </section>
    </>
  );
};

export default Page;
