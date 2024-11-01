import React from 'react';
import Image from 'next/image';
import { Satoshi_Black } from '@/lib/fonts';
import { cn } from '@/lib';
import { ShopBtn } from '@/components/custom-ui/reuseables';
import { Header, Footer } from '@/views';
const Page = async () => {

  return (
    <>
      <Header />
      <main>
        <section className='relative flex w-full h-[450px] '>
          <div className='bg-[#004631] z-10 flex flex-col justify-center md:pl-20 pl-8'>

            <h2 className={cn("font-semibold flex items-center justify-center text-2xl md:text-4xl capitalize leading-snug text-white ", Satoshi_Black.className)}>
              Deluxe & Luxury Interiors at Your Fingertip
            </h2>
            <ShopBtn />

          </div>

          <div className='hero-bg relative'>
            <Image src="/images/home-images.webp" alt="Home Image" fill className='object-cover' />
          </div>

        </section>
        <section className='max-w-7xl py-12 px-8 md:px-12 mx-auto'>
          <h2 className='text-2xl md:text-4xl text-black font-medium'> Shop beautiful Interiors from the comfort of your home.</h2>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Page;
