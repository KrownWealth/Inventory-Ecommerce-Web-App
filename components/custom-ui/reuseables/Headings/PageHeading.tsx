"use client"

import React from 'react';


interface ProductPageHeadProps {
  pageTitle: string;
}

const PageHead: React.FC<ProductPageHeadProps> = ({ pageTitle }) => {
  return (
    <div className="flex items-center py-8">
      <h1 className="font-semibold text-sm lg:text-2xl">{pageTitle}</h1>
    </div>
  );
};

export default PageHead;
