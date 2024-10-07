"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

interface PriceFormulaModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveFormula: (formulaType: 'percentage', value: number) => void; 
}

const PriceFormulaModal: React.FC<PriceFormulaModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  onSaveFormula,
}) => {
  const [inputValue, setInputValue] = useState<number>(0);

  const handleSave = () => {
    onSaveFormula('percentage', inputValue); 
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Price Formula</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="percentage">Percentage Markup</Label>
          <Input
            id="percentage"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PriceFormulaModal;
