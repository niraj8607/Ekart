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

  // Jab bhi state change ho, parent (Products.jsx) ko data bhejo
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

  // Helper function for dynamic slider background fill
  const getBackgroundSize = (value) => {
    return { backgroundSize: `${((value - MIN_LIMIT) * 100) / (MAX_LIMIT - MIN_LIMIT)}% 100%` };
  };

  return (
    // Width reduced to max-w-[260px] and padding reduced to p-5 for a more compact look
    <div className="w-full max-w-[260px] space-y-6 p-5 bg-gray-50/50 rounded-xl border border-gray-200 shadow-sm">
      
      {/* Search Field */}
      <div>
        <Input 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="focus-visible:ring-blue-500 bg-white h-9 text-sm" 
        />
      </div>

      {/* Category Section */}
      <div>
        <h3 className="mb-3 text-base font-bold text-gray-900">Category</h3>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 transition-colors hover:text-pink-600"
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="h-3.5 w-3.5 cursor-pointer text-pink-600 accent-pink-600 focus:ring-pink-500"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Brand Dropdown Section */}
      <div>
        <h3 className="mb-2 text-base font-bold text-gray-900">Brand</h3>
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger className="w-full bg-white border-gray-300 focus:ring-gray-300 h-9 text-sm">
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">ALL</SelectItem>
            <SelectItem value="Apple">Apple</SelectItem>
            <SelectItem value="Asus">Asus</SelectItem>
            <SelectItem value="boAt">boAt</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-gray-900">Price Range</h3>
        <p className="text-xs font-semibold text-gray-600">
          Range: ₹{priceRange.min.toLocaleString('en-IN')} - ₹{priceRange.max.toLocaleString('en-IN')}
        </p>

        <div className="flex items-center gap-2 pt-1">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
            className="w-full bg-white focus-visible:ring-blue-500 h-8 text-xs"
          />
          <Input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
            className="w-full bg-white focus-visible:ring-blue-500 h-8 text-xs"
          />
        </div>

        {/* Working Sliders with Dynamic Background Fill */}
        <div className="space-y-5 pt-2">
          
          {/* Min Slider */}
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
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Max Slider */}
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
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

        </div>
      </div>

      {/* Reset Filters Button */}
      <div className="pt-2">
        <Button 
          onClick={handleReset} 
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 text-sm shadow-sm transition-all"
        >
          Reset Filters
        </Button>
      </div>

    </div>
  );
}