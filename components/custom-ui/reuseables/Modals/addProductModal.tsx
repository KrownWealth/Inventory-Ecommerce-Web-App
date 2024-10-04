"use client"

import React, { useEffect, useState, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ProductsType } from "@/types";
import { z } from "zod";
import { toastNotification } from "@/lib";
import { AddProductImage } from "@/views";



const ProductSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  stock: z.number().int().nonnegative({ message: "Stock must be a non-negative integer" }),
  category: z.string().min(3, { message: "Category is required" }),
  description: z.string().min(13, { message: "Description is required" }),
  status: z.string().min(3, { message: "Status is required" }),
  image: z.string().nullable(),
});

interface AddProductModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProductInfo: React.Dispatch<React.SetStateAction<ProductsType[]>>;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  setProductInfo,
}) => {
  const [productData, setProductData] = useState({
    id: "",
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    status: "",
    image: null as string | null,
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/fetch-categories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    setProductData({ ...productData, category: categoryId });
  };

  const handleImageChange = (imageUrl: string) => {
    setProductData({ ...productData, image: imageUrl });
  };

 const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
    const validatedData = ProductSchema.parse({
      ...productData,
      price: Number(productData.price),
      stock: Number(productData.stock),
    });

    const newProductData = {
      name: validatedData.name,
      price: validatedData.price,
      stock: validatedData.stock,
      category: validatedData.category,
      description: validatedData.description,
      status: validatedData.status,
      image: validatedData.image,
    };

    const response = await fetch(`/api/add-products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductData),
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    const data = await response.json();
    setProductInfo((prev) => [...prev, data]);
    toastNotification('success', 'top-right', undefined, {
      message: 'Product added successfully',
    });

    setProductData({
      id: "",
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
      status: "",
      image: null,
    });
    setIsModalOpen(false);
    
  } catch (error: any) {
    toastNotification('error', 'top-right', undefined, {
      message: error.message || 'Failed to add product',
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white h-4/5 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            
            <AddProductImage
              image={productData.image}
              setImage={handleImageChange} 
              onChangePicture={handleImageChange}
              productId={productData.id}
            />

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" className="w-full" onChange={handleChange} />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" className="w-full" onChange={handleChange} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="stock">Stock/Inventory</Label>
                <Input id="stock" name="stock" type="number" className="w-full" onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Select name="category" onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoading ? (
                      <p>Loading categories...</p>
                    ) : (
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" className="w-full" onChange={handleChange} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Input id="status" name="status" type="text" className="w-full" onChange={handleChange} />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
