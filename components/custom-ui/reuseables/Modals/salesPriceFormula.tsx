"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface PriceFormulaModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveFormula: (formulaType: 'percentage' | 'fixed', value: number) => void;
}

const PriceFormulaModal: React.FC<PriceFormulaModalProps> = ({ isModalOpen, setIsModalOpen, onSaveFormula }) => {
  const [selectedFormula, setSelectedFormula] = useState<'percentage' | 'fixed' | null>(null);
  const [inputValue, setInputValue] = useState<number>(0);

  const handleSave = () => {
    if (selectedFormula) {
      onSaveFormula(selectedFormula, inputValue);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Select Price Formula</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-3">
            <Label htmlFor="formula">Select Formula</Label>
            <Select onValueChange={value => setSelectedFormula(value as 'percentage' | 'fixed')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select formula" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage Markup</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            {selectedFormula === 'percentage' && (
              <>
                <Label htmlFor="percentage">Input Percentage</Label>
                <Input
                  id="percentage"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(parseFloat(e.target.value))}
                  className="w-full"
                />
              </>
            )}
            {selectedFormula === 'fixed' && (
              <>
                <Label htmlFor="amount">Input Fixed Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(parseFloat(e.target.value))}
                  className="w-full"
                />
              </>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PriceFormulaModal;
