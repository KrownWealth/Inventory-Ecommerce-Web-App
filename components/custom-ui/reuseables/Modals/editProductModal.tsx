"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ProductForm from "./productForm";
import { ProductsType } from "@/types";
import { toastNotification, uploadImageToCloudinary } from "@/lib";
import { revalidatePath } from "next/cache";

interface EditProductModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProductInfo: React.Dispatch<React.SetStateAction<ProductsType[]>>;
  id: string;
  name: string;
  image: string;
  costPrice: number;
  sellingPrice: number;
  markupPercentage: number;
  stock: number;
  status: string;
  category: string,
  description: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  id,
  name,
  costPrice,
  markupPercentage,
  sellingPrice,
  stock,
  category,
  image,
  status,
  description,
  slug,
  createdAt,
  updatedAt,
}) => {
  const [productData, setProductData] = useState<ProductsType>({
    id,
    name,
    costPrice,
    markupPercentage,
    sellingPrice,
    stock,
    category: {
      id: "",
      name: "",
    },
    image,
    status,
    description,
    slug,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [productStatus, setProductStatus] = useState("published");
  const [imageName, setImageName] = useState(image || "");
  const [generalError, setGeneralError] = useState<string | null>(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/fetch-categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
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
    const numericCostPrice = typeof costPrice === "string" ? parseFloat(costPrice) : costPrice;
    const numericMarkupPercentage = typeof markupPercentage === "string" ? parseFloat(markupPercentage) : markupPercentage;

    if (!isNaN(numericCostPrice) && !isNaN(numericMarkupPercentage)) {
      const calculatedSellingPrice = numericCostPrice + (numericCostPrice * numericMarkupPercentage) / 100;
      setProductData((prevData: ProductsType) => ({
        ...prevData,
        sellingPrice: parseFloat(calculatedSellingPrice.toFixed(2)),
      }));
    } else {
      setProductData((prevData: ProductsType) => ({
        ...prevData,
        sellingPrice: undefined,
      }));
    }
  }, [costPrice, markupPercentage]);


  useEffect(() => {
    if (isModalOpen) {
      const selectedCategory = categories.find((cat) => cat.id === category) || { id: "", name: "" };


      setProductData({
        id,
        name,
        costPrice,
        markupPercentage,
        sellingPrice,
        stock,
        category: selectedCategory,
        image,
        status,
        description,
        slug,
        createdAt,
        updatedAt,
      });
    }
  }, [isModalOpen, id, name, costPrice, markupPercentage, sellingPrice, stock, category, categories, image, status, description, slug, createdAt, updatedAt]);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setImageError(null);

    try {
      const imageUrl = await uploadImageToCloudinary(file, "gewfxwe5");
      setProductData((prevData) => ({ ...prevData, image: imageUrl }));
    } catch (error: any) {
      setImageError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();

      toastNotification("success", "top-right", undefined, {
        message: "Product updated successfully",
      });
      revalidatePath("/frontend/products");
      revalidatePath("/dashboard/products");
      setIsModalOpen(false);
    } catch (error: any) {
      toastNotification("error", "top-right", undefined, {
        message: error.message || "Failed to update product",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent aria-describedby="edit-product-title"
        className="sm:max-w-[600px] bg-white h-4/5 py-10 overflow-y-scroll">
        <DialogHeader id="edit-product-title">
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Edit Product</DialogDescription>
        </DialogHeader>
        <ProductForm
          productData={productData}
          setProductData={setProductData}
          onSubmit={handleEditProduct}
          isLoading={isLoading}
          generalError={generalError}
          categories={categories}
          handleImage={handleImage}
          imageName={imageName}
          status={status}
          setStatus={setProductStatus}
          isUploading={isUploading}
          imageError={imageError}
          formMode="Edit"
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
