import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { SignOut } from '@/views';
import Image from 'next/image';

const Page = async () => {
  const session = await getServerSession(authOptions);

  return (
   <>
   <section className='bg-[#004631] h-full'>
    <div className='flex container p-2 px-12 mx-auto'>
      <div>Home of Affordable Interiors</div>
       <SignOut />
    </div>
     <div className='h-full'>
        <Image src="/images/home-images.webp" alt="" fill  />
      </div>
   </section>
   
  
   </>
  );
};

export default Page;
