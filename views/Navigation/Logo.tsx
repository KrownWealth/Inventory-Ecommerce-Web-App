import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'


export function Logo() {

  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);


  return (
    <>
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/images/trans-logo.png"
          alt="Hometung Pricesage Logo"
          width={width < 1024 ? "150" : "150"}
          height={width < 1024 ? "150" : "74"}
          // width={150}
          // height={150}
          quality={100}
        />

      </Link>
    </>
  )
}

