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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ProductsType } from "@/types";
import { z } from "zod";
import { toastNotification } from "@/lib";
import { AddProductImage } from "@/views";
import { Checkbox } from "@/components/ui/checkbox"


const ProductSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  costPrice: z.number().positive({ message: "Price must be a positive number" }),
  markupPercentage: z.number().positive({ message: "Price must be a positive number" }),
  sellingPrice: z.number().positive({ message: "Price must be greater than the cost price" }),
  stock: z.number().int().nonnegative({ message: "Stock must be a non-negative integer" }),
  category: z.string().min(3, { message: "Category is required" }),
  description: z.string().min(13, { message: "Description is required" }),
  status: z.string().min(3, { message: "Status is required" }),
  image: z.string().nonempty({ message: "Product image is required" }),
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
    costPrice: "",
    markupPercentage: "",
    sellingPrice: "",
    stock: "",
    category: "",
    description: "",
    status: "",
    image: null as string | null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);


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

 // Calculate sellingPrice whenever costPrice or markupPercentage changes
  useEffect(() => {
    const costPrice = parseFloat(productData.costPrice);
    const markupPercentage = parseFloat(productData.markupPercentage);

    if (!isNaN(costPrice) && !isNaN(markupPercentage)) {
      const sellingPrice = costPrice + (costPrice * markupPercentage) / 100;
      setProductData((prev) => ({ ...prev, sellingPrice: sellingPrice.toFixed(2) }));
    }
  }, [productData.costPrice, productData.markupPercentage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCategoryChange = (categoryId: string) => {
    setProductData({ ...productData, category: categoryId });
    setErrors({ ...errors, category: "" });
  };

  const handleImageChange = (imageUrl: string) => {
    setProductData({ ...productData, image: imageUrl });
    setErrors({ ...errors, image: "" });
  };


 
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    try {
      const validatedData = ProductSchema.parse({
        ...productData,
        costPrice: Number(productData.costPrice),
        stock: Number(productData.stock),
      });

      const newProductData = {
        name: validatedData.name,
        costPrice: validatedData.costPrice,
        sellingPrice: validatedData.sellingPrice,
        stock: validatedData.stock,
        category: validatedData.category,
        description: validatedData.description,
        status: validatedData.status,
        image: validatedData.image,
      };

      const response = await fetch(`/api/add-products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductData),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      setProductInfo((prev) => [...prev, data]);
      toastNotification("success", "top-right", undefined, {
        message: "Product added successfully",
      });

      setProductData({
        id: "",
        name: "",
        costPrice: "",
        markupPercentage: "",
        sellingPrice: "",
        stock: "",
        category: "",
        description: "",
        status: "",
        image: null,
      });
      setIsModalOpen(false);
    } catch (error: any) {
      if (error.errors) {
        const errorMessages: { [key: string]: string } = {};
        error.errors.forEach((err: any) => {
          errorMessages[err.path[0]] = err.message;
        });
        setErrors(errorMessages);
      } else {
        toastNotification("error", "top-right", undefined, {
          message: error.message || "Failed to add product",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white h-4/5 overflow-y-scroll py-10">
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
            {errors.image && <div className="text-red-500">{errors.image}</div>}

            <div className="grid gap-3 w-full">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" className="w-full" onChange={handleChange} />
                {errors.name && <div className="text-red-500">{errors.name}</div>}
              </div>
            </div>

            <div className="grid">
              <div className="grid gap-3">
                <Label htmlFor="price">Cost Price</Label>
                <Input id="price" name="price" type="number" className="w-full" onChange={handleChange} />
                {errors.price && <div className="text-red-500">{errors.price}</div>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="grid gap-3">
                 <Label htmlFor="markupPercentage">Markup Percentage (%)</Label>
          <Input id="markupPercentage" name="markupPercentage" type="number" value={productData.markupPercentage} onChange={handleChange} />
                {errors.category && <div className="text-red-500">{errors.category}</div>} 
              </div>

              <div className="grid gap-3">
                <div className="flex justify-between">
                   <Label htmlFor="sellingPrice">Selling Price</Label>
          
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sellingPrice" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Automatic
                    </label>
                  </div>
                </div>
               <Input id="sellingPrice" name="sellingPrice" type="number" value={productData.sellingPrice} readOnly />
                {errors.price && <div className="text-red-500">{errors.price}</div>}
              </div>

            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="stock">Stock/Inventory</Label>
                <Input id="stock" name="stock" type="number" className="w-full" onChange={handleChange} />
                {errors.stock && <div className="text-red-500">{errors.stock}</div>}
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
                {errors.category && <div className="text-red-500">{errors.category}</div>} {/* Category error */}
              </div>
            </div>



            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" className="w-full" onChange={handleChange} />
              {errors.description && <div className="text-red-500">{errors.description}</div>} {/* Description error */}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Input id="status" name="status" type="text" className="w-full" onChange={handleChange} />
              {errors.status && <div className="text-red-500">{errors.status}</div>} {/* Status error */}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="mt-4">
              {isLoading ? "Loading..." : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
