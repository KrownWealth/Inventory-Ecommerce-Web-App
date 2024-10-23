"use client"

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import FormField from "@/components/form/formField";
import { Input } from "@/components/ui/input";
import TextAreaField from "@/components/form/textArea";
import { AddProductImage } from "@/views";
import { useFormField } from "@/lib";
import { ProductsType, ProductType } from "@/types";
import { Button } from "@/components/ui/button";
import {
  ProductNameSchema,
  CostPriceSchema,
  MarkupPercentageSchema,
  StockSchema,
  DescriptionSchema
} from "@/lib";

// Constants for status options
const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" }
];

interface ProductFormProps {
  productData: ProductsType;
  setProductData: React.Dispatch<React.SetStateAction<ProductsType>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  categories: { id: string; name: string }[];
  isUploading: boolean;
  imageError: string | null;
  imageName: string;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  formMode: "Add" | "Edit";
  generalError: string | null
}

const ProductForm: React.FC<ProductFormProps> = ({
  productData,
  setProductData,
  onSubmit,
  isLoading,
  imageName,
  handleImage,
  isUploading,
  imageError,
  generalError,
  status,
  setStatus,
  formMode
}) => {
  const { value: costPrice, error: costPriceError, handleChange: handlePriceChange } = useFormField<number>(
    productData.costPrice || 0,
    CostPriceSchema,
    (e) => parseFloat(e.target.value)
  );

  const { value: markupPercentage, error: markupError, handleChange: handleMarkupChange } = useFormField<number>(
    productData.markupPercentage || 0,
    MarkupPercentageSchema,
    (e) => parseFloat(e.target.value)
  );

  const { value: stock, error: stockError, handleChange: handleStockChange } = useFormField<number>(
    productData.stock || 0,
    StockSchema,
    (e) => parseFloat(e.target.value)
  );

  const { value: name, error: nameError, handleChange: handleNameChange } = useFormField(
    productData.name,
    ProductNameSchema
  );

  const { value: description, error: descriptionError, handleChange: handleDescriptionChange } = useFormField(
    productData.description,
    DescriptionSchema
  );
  const [category, setCategory] = useState<{ id: string; name: string } | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);


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

  const handleCategoryChange = (categoryId: string) => {
    const selectedCategory = categories.find((category) => category.id === categoryId);
    setProductData((prevData) => ({
      ...prevData,
      category: selectedCategory || { id: "", name: "" },
    }));
  };

  return (
   <>
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <FormField
          label="Product Name"
          name="name"
          htmlFor="name"
          type="text"
          onChange={handleNameChange}
          value={name}
          isInvalid={!!nameError}
          errorMessage={nameError}
          required
        />
      </div>

      <div className="mb-3">
        <FormField
          label="Cost Price"
          name="costPrice"
          htmlFor="costPrice"
          type="number"
          onChange={handlePriceChange}
          value={costPrice}
          isInvalid={!!costPriceError}
          errorMessage={costPriceError}
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div>
          <FormField
            label="Markup Percentage"
            name="markupPercentage"
            htmlFor="markupPercentage"
            type="number"
            onChange={handleMarkupChange}
            value={markupPercentage}
            isInvalid={!!markupError}
            errorMessage={markupError}
            required
          />
        </div>
        <div className="flex flex-col space-y-1">
          <Label htmlFor="sellingPrice" className="mb-2 text-sm">
            Selling Price
          </Label>
          <Input
            id="sellingPrice"
            name="sellingPrice"
            type="number"
            value={productData.sellingPrice ?? 0}
            readOnly
          />
        </div>
      </div>

      <div className="mb-3">
        <FormField
          label="Stock"
          name="stock"
          htmlFor="stock"
          type="number"
          onChange={handleStockChange}
          value={stock ?? 0}
          isInvalid={!!stockError}
          errorMessage={stockError || ""}
          required
        />
      </div>

      <div className="mb-3">
        <Label htmlFor="category" className="mb-2 text-sm">
          Category <span className="text-red-400">*</span>
        </Label>
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

      <div className="mb-3">
        <Label htmlFor="status" className="mb-2 text-sm">
          Status <span className="text-red-400">*</span>
        </Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-3">
        <TextAreaField
          label="Product Description"
          name="description"
          htmlFor="description"
          onChange={handleDescriptionChange}
          value={description}
          isInvalid={!!descriptionError}
          errorMessage={descriptionError || ""}
          required
        />
      </div>

      <div className="mb-3">
        <Label htmlFor="image" className="mb-2 text-sm">
          Product Image <span className="text-red-400">*</span>
        </Label>
        <AddProductImage
          imageError={imageError}
          imageName={imageName}
          isUploading={isUploading}
          handleImage={handleImage}
        />
      </div>

      {generalError && (
        <div className="text-red-400 mb-4">
          {generalError}
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isLoading} className="mt-4">
          {isLoading ? (
            <>
              <img src="/images/spinner-small.svg" alt="loading" className="mx-auto" />
              <span className="ml-2">
                {formMode === "Add" ? "Adding Product..." : "Editing Product..."}
              </span>
            </>
          ) : (
            formMode === "Add" ? "Add Product" : "Edit Product"
          )}
        </Button>

      </div>
    </form>
   </>
  );
};

export default ProductForm;
