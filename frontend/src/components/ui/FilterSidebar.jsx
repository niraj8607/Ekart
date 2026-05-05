import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterSidebar({ onFilterChange }) {
  // States to manage filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [brand, setBrand] = useState("ALL");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999999 });

  const categories = ["All", "Mobile", "Headphone", "Laptop"];

  const MIN_LIMIT = 0;
  const MAX_LIMIT = 999999;
  const STEP = 1000;

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        search: searchQuery,
        category: selectedCategory,
        brand: brand,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      });
    }
  }, [searchQuery, selectedCategory, brand, priceRange, onFilterChange]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange.max - STEP);
    setPriceRange({ ...priceRange, min: value });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange.min + STEP);
    setPriceRange({ ...priceRange, max: value });
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setBrand("ALL");
    setPriceRange({ min: MIN_LIMIT, max: MAX_LIMIT });
  };

  const getBackgroundSize = (value) => {
    return { backgroundSize: `${((value - MIN_LIMIT) * 100) / (MAX_LIMIT - MIN_LIMIT)}% 100%` };
  };

  return (
    // 🌟 CSS CHANGED: Width aur choti (max-w-[220px]), padding (p-4), aur spacing (space-y-4)
    <div className="w-full max-w-[220px] space-y-4 p-4 bg-gray-50/50 rounded-xl border border-gray-200 shadow-sm">
      
      {/* Search Field */}
      <div>
        {/* 🌟 CSS CHANGED: Height choti (h-8) aur text (text-xs) */}
        <Input 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="focus-visible:ring-blue-500 bg-white h-8 text-xs" 
        />
      </div>

      {/* Category Section */}
      <div>
        <h3 className="mb-2 text-sm font-bold text-gray-900">Category</h3>
        <div className="flex flex-col gap-1.5">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2 text-xs text-gray-700 transition-colors hover:text-pink-600"
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="h-3 w-3 cursor-pointer text-pink-600 accent-pink-600 focus:ring-pink-500"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Brand Dropdown Section */}
      <div>
        <h3 className="mb-1.5 text-sm font-bold text-gray-900">Brand</h3>
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger className="w-full bg-white border-gray-300 focus:ring-gray-300 h-8 text-xs">
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL" className="text-xs">ALL</SelectItem>
            <SelectItem value="Apple" className="text-xs">Apple</SelectItem>
            <SelectItem value="Asus" className="text-xs">Asus</SelectItem>
            <SelectItem value="boAt" className="text-xs">boAt</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900">Price Range</h3>
        <p className="text-[10px] font-semibold text-gray-600">
          Range: ₹{priceRange.min.toLocaleString('en-IN')} - ₹{priceRange.max.toLocaleString('en-IN')}
        </p>

        <div className="flex items-center gap-2 pt-0.5">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
            className="w-full bg-white focus-visible:ring-blue-500 h-7 text-[10px]"
          />
          <Input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
            className="w-full bg-white focus-visible:ring-blue-500 h-7 text-[10px]"
          />
        </div>

        {/* Working Sliders */}
        <div className="space-y-4 pt-1">
          <div className="relative w-full">
            <input
              type="range"
              min={MIN_LIMIT}
              max={MAX_LIMIT}
              step={STEP}
              value={priceRange.min}
              onChange={handleMinChange}
              style={{
                ...getBackgroundSize(priceRange.min),
                backgroundImage: 'linear-gradient(#2563eb, #2563eb)', 
                backgroundRepeat: 'no-repeat'
              }}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="relative w-full">
            <input
              type="range"
              min={MIN_LIMIT}
              max={MAX_LIMIT}
              step={STEP}
              value={priceRange.max}
              onChange={handleMaxChange}
              style={{
                ...getBackgroundSize(priceRange.max),
                backgroundImage: 'linear-gradient(#2563eb, #2563eb)', 
                backgroundRepeat: 'no-repeat'
              }}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Reset Filters Button */}
      <div className="pt-1">
        {/* 🌟 CSS CHANGED: Button height h-8 aur text-xs */}
        <Button 
          onClick={handleReset} 
          className="w-full h-8 bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs shadow-sm transition-all"
        >
          Reset Filters
        </Button>
      </div>

    </div>
  );
}