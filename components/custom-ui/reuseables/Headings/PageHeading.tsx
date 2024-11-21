"use client"

import React from 'react';
import { Button } from '@/components/ui/button';


interface ProductPageHeadProps {
  pageTitle: string;
  btnText?: string;
}

const PageHead: React.FC<ProductPageHeadProps> = ({ pageTitle, btnText }) => {
  return (
    <div className="flex items-center py-8">
      <h1 className="font-semibold text-sm lg:text-2xl">{pageTitle}</h1>
      {/* <Button className="ml-auto text-sm lg:text-lg" size="sm">
        {btnText}
      </Button> */}
    </div>
  );
};

export default PageHead;
