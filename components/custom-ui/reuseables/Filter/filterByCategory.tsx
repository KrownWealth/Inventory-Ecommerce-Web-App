"use client"

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterByCategoryProps {
  onCategoryChange: (categoryId: string | undefined) => void;
}

const FilterByCategory: React.FC<FilterByCategoryProps> = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>("all"); 

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

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === "all") {
      onCategoryChange(undefined); 
    } else {
      onCategoryChange(value); 
    }
  };

  return (
    <Select onValueChange={handleCategoryChange} value={selectedCategory}>
      <SelectTrigger className="w-[180px]">
        <SelectValue className="font-bold text-lg" placeholder="Filter By Category" />
      </SelectTrigger>
      <SelectContent className="font-semibold">
        <SelectGroup>
          <SelectItem value="all">Filter By Category</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterByCategory;
