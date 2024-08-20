"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ProductType } from '@/types'  
import { ProductTableData } from '@/json';

const uniqueCategories = [...new Set(ProductTableData.map(product => product.category))];

interface EditProductModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productName: string;
  productPrice: string;
  stock: string;
  category: string;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ isModalOpen, setIsModalOpen, productName, productPrice, stock, category }) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" className="w-full" defaultValue={productName} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" className="w-full" defaultValue={productPrice} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="inventory">Inventory</Label>
              <Input id="inventory" type="number" className="w-full" defaultValue={stock} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue={category.toLowerCase().replace(/ /g, '-')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueCategories.map((cat, index) => (
                    <SelectItem key={index} value={cat.toLowerCase().replace(/ /g, '-')}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Product</Button>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditProductModal
