"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { uploadImageToCloudinary } from "@/lib";
import { toastNotification } from "@/lib";
import { ProductsType } from "@/types";
import ProductForm from "./productForm";


const initialState = {
  id: "",
  image: null,
  name: "",
  costPrice: 0,
  markupPercentage: 0,
  sellingPrice: 0,
  stock: 0,
  slug: "",
  category: {
    id: "",
    name: "",
  },
  description: "",
  status: "",
};

interface AddProductModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [productData, setProductData] = useState<ProductsType>(initialState);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("published");
  const [imageName, setImageName] = useState(productData.image || "");
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/fetch-categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);


  useEffect(() => {
    const numericCostPrice =
      typeof productData.costPrice === "string" ? parseFloat(productData.costPrice) : productData.costPrice;
    const numericMarkupPercentage =
      typeof productData.markupPercentage === "string" ? parseFloat(productData.markupPercentage) : productData.markupPercentage;

    if (!isNaN(numericCostPrice) && numericCostPrice > 0 && !isNaN(numericMarkupPercentage) && numericMarkupPercentage >= 0) {
      const calculatedSellingPrice = numericCostPrice + (numericCostPrice * numericMarkupPercentage) / 100;
      setProductData((prevData) => ({
        ...prevData,
        sellingPrice: parseFloat(calculatedSellingPrice.toFixed(2)),
      }));
    }
  }, [productData.costPrice, productData.markupPercentage]);



  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setImageError(null);

    try {
      const imageUrl = await uploadImageToCloudinary(file, "gewfxwe5");
      setImageName(file.name);
      setProductData((prevData) => ({ ...prevData, image: imageUrl }));
    } catch (error: any) {
      setImageError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const validateAllFields = () => {
    const errors: string[] = [];
    if (!productData.name) errors.push("Product Name");
    if (productData.markupPercentage <= 0) errors.push("Markup Percentage");
    if (productData.costPrice <= 0) errors.push("Cost Price");
    if ((productData.sellingPrice ?? 0) <= 0) errors.push("Selling Price");
    if (!productData.description) errors.push("Description");
    if (!productData.category || !productData.category.id) errors.push("Category");
    if (!productData.image) errors.push("Image");
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneralError(null);

    const fieldErrors: string[] = validateAllFields();
    if (fieldErrors.length > 0) {
      setGeneralError("Missing Fields: " + fieldErrors.join(", "));
      setIsLoading(false);
      return;
    }

    const createSlug = (name: string) =>
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

    const productSlug = createSlug(productData.name);

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...productData,
          slug: productSlug,
          category: productData.category ? productData.category.id : null,
          image: productData.image,
          name: productData.name,
          costPrice: productData.costPrice,
          markupPercentage: productData.markupPercentage,
          stock: productData.stock,
          description: productData.description,
          status: status,
        }),
      });

      if (!response.ok) throw new Error(`Failed to add product: ${response.statusText}`);

      toastNotification("success", "top-right", undefined, {
        message: "Product created successfully",
      });
      setIsModalOpen(false);
    } catch (error: any) {
      const errorMessage =
        error.message === "Failed to fetch"
          ? "Can't reach the server. Please check your connection or try again later."
          : "An error occurred while creating the product: " + error.message;

      toastNotification("error", "top-right", undefined, {
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="bg-white h-4/5 overflow-y-scroll py-10">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <ProductForm
          productData={productData}
          setProductData={setProductData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          generalError={generalError}
          categories={categories}
          handleImage={handleImage}
          imageName={imageName}
          status={status}
          setStatus={setStatus}
          isUploading={isUploading}
          imageError={imageError}
          formMode="Add"
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
