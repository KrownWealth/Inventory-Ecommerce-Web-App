"use client"

import React, { useState, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductsType } from "@/types";
import { z } from "zod";
import { toastNotification } from "@/lib";


const CategorySchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
});


interface AddCategoryModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoryInfo: React.Dispatch<React.SetStateAction<{ id: string; name: string }[]>>;
}


const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  setCategoryInfo,
}) => {
  const [categoryData, setCategoryData] = useState({
    id: "",
    name: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };
 
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const validatedData = CategorySchema.parse(categoryData);
      const response = await fetch(`/api/add-category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: validatedData.name }),
      });

      if (!response.ok) throw new Error('Failed to add category');

      const newCategory = await response.json();
      setCategoryInfo(prev => [...prev, newCategory]);  
      setCategoryData({ id: '', name: '' });
       toastNotification("success", "top-right", undefined, {
        message: "Category added successfully",
      });
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Failed to add category:", error);
      setErrors({ ...errors, general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white h-4/5 overflow-y-scroll py-10">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            
            <div className="grid gap-3 w-full">
              <div className="grid gap-3">
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" name="name" type="text" className="w-full" onChange={handleChange} />
                {errors.name && <div className="text-red-500">{errors.name}</div>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="mt-4">
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
