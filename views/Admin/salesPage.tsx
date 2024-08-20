"use client"

import React, { useState } from 'react';
import { PageHead } from '@/components/custom-ui/reuseables';
import { SellingPriceTable, PriceFormulaModal } from '@/components/custom-ui/reuseables';
import { ProductTableData } from '@/json';
import { Button } from '@/components/ui/button';

const SalesPricePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pricingFormula, setPricingFormula] = useState<'percentage' | 'fixed' | null>(null);
  const [percentageMarkup, setPercentageMarkup] = useState<number>(10);
  const [fixedAmount, setFixedAmount] = useState<number>(0); 

  const handleSaveFormula = (formulaType: 'percentage' | 'fixed', value: number) => {
    setPricingFormula(formulaType);
    if (formulaType === 'percentage') {
      setPercentageMarkup(value);
    } else {
      setFixedAmount(value);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between">
        <PageHead pageTitle='Sales Price' />
        <Button onClick={() => setIsModalOpen(true)} className="btn-primary">
          Select Price Formula
        </Button>
      </div>
      <SellingPriceTable
        products={ProductTableData}
        pricingFormula={pricingFormula}
        percentageMarkup={percentageMarkup}
        fixedAmount={fixedAmount}
      />
      <PriceFormulaModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSaveFormula={handleSaveFormula}
      />
    </div>
  );
};

export default SalesPricePage;
