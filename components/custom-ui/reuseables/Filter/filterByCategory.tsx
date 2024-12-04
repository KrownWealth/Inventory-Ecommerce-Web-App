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
import { Button } from "@/components/ui/button";
interface FilterByCategoryProps {
  onCategoryChange: (categoryId: string | undefined) => void;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const FilterByCategory: React.FC<FilterByCategoryProps> = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${baseUrl}/api/fetch-categories`);
      const data = await response.json();
      setCategories(data.categories);
    };
    fetchCategories();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onCategoryChange(selectedValue === "all" ? undefined : selectedValue);
  };

  // const handleCategoryChange = (value: string) => {
  //   setSelectedCategory(value);
  //   if (value === "all") {
  //     onCategoryChange(undefined);
  //   } else {
  //     onCategoryChange(value);
  //   }
  // };

  return (
    <div>
      <label
        className="sr-only"
        htmlFor="category-select"
      >
        Filter by Category
      </label>

      <select
        className="w-[180px] p-2 border border-gray-300 rounded bg-white text-black"
        role="listbox"
        aria-label="Filter by Category"
        id="category-select"
        value={selectedCategory || "all"}
        onChange={handleChange}
      >
        <option
          value="all"
        >
          Filter By Category
        </option>
        {categories?.length > 0 ? (
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No categories available
          </option>
        )}

        {/* {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))} */}
      </select>
    </div>
    // <Select data-testid="category-list"
    //  onValueChange={handleCategoryChange} 
    //  value={selectedCategory}>
    //   <SelectTrigger aria-label="Filter by Category" className="w-[180px]">
    //     <SelectValue className="font-bold text-lg" placeholder="Filter By Category" />
    //   </SelectTrigger>
    //   <SelectContent className="font-semibold">
    //     <SelectGroup>
    //       <SelectItem value="all">Filter By Category</SelectItem>
    //       {categories.map((category) => (
    //         <SelectItem key={category.id} value={category.id}>
    //           {category.name}
    //         </SelectItem>
    //       ))}
    //     </SelectGroup>
    //   </SelectContent>
    // </Select>
  );
};

export default FilterByCategory;
