'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ProductsType } from '@/types';
import { AddProductImage } from '@/views';
import { Textarea } from "@/components/ui/textarea";

interface EditProductModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProductInfo: React.Dispatch<React.SetStateAction<ProductsType[]>>;
  productId: string; 
  productName: string;
  image: string;
  productPrice: number;
  stock: number;
  status: string;
  categoryName?: string;
  description: string;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  productId,
  productName,
  productPrice,
  stock,
  categoryName,
  image,
  status,
  description
}) => {
  const [productData, setProductData] = useState({
    name: productName,
    price: productPrice,
    inventory: stock,
    categoryId: categoryName, 
    image,
    status,
    description
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
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
      } 
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setProductData({
        name: productName,
        price: productPrice,
        inventory: stock,
        categoryId: categoryName,
        image,
        status,
        description
      });
    }
  }, [isModalOpen, productName, productPrice, stock, categoryName, image, status, description]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (imageUrl: string) => {
    setProductData((prevData) => ({ ...prevData, image: imageUrl }));
  };

  const handleCategoryChange = (categoryId: string) => {
    setProductData((prevData) => ({ ...prevData, categoryId })); 
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    console.log('Editing product with data:', {
      id: productId,
      name: productData.name,
      price: productData.price,
      stock: productData.inventory,
      categoryId: productData.categoryId,
      image: productData.image,
      status: productData.status,
      description: productData.description,
    });

    try {
      const response = await fetch(`/api/edit-products`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          name: productData.name,
          price: productData.price,
          stock: productData.inventory,
          categoryId: productData.categoryId, 
          image: productData.image, 
          status: productData.status,
          description: productData.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json(); 
      
      console.log('Product updated:', updatedProduct); 
    } catch (error) {
      console.error('Failed to update product:', error);
      setIsModalOpen(false); 
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleEdit} className="grid gap-6 py-6">
          <div className="grid gap-3">
            <AddProductImage
              image={productData.image}
              setImage={handleImageChange}
              productId={productId}
              onChangePicture={handleImageChange} 
            />
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full"
                  value={productData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  className="w-full"
                  value={productData.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="inventory">Inventory</Label>
                <Input
                  id="inventory"
                  name="inventory"
                  type="number"
                  className="w-full"
                  value={productData.inventory}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Select
                  name="categoryId"
                  value={productData.categoryId} 
                  onValueChange={handleCategoryChange} 
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                className="w-full" 
                value={productData.description}
                onChange={handleChange} // Bind value to state
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Input 
                id="status" 
                name="status" 
                type="text" 
                className="w-full" 
                value={productData.status}
                onChange={handleChange} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Update Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
