"use client"

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ProductTableData } from '@/json';
import { ProductType } from '@/types';

const uniqueCategories = [...new Set(ProductTableData.map(product => product.category))];

interface AddProductModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-6">
           <div className="grid gap-3">
            <Label htmlFor="name">Product ID</Label>
            <Input id="name" type="text" className="w-full" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" className="w-full" />
          </div>
          
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" className="w-full" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="inventory">Stock/Inventory</Label>
              <Input id="inventory" type="number" className="w-full" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueCategories.map((category, index) => (
                    <SelectItem key={index} value={category.toLowerCase().replace(/ /g, '-')}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
