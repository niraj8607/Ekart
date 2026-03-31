import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { toast } from "sonner";

export default function ProductCard({ product = {} }) {
  // 1. DYNAMIC KEYS MATCHED WITH YOUR POSTMAN RESPONSE
  const name = product.productName || "Unknown Product";
  const price = product.productPrice || 0;
  const category = product.category || "General";
  
  // 2. IMAGE HANDLING: Aapka productImg ek array hai, toh hum first image [0] ka url nikalenge
  let imageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"; // Default image
  
  if (product.productImg && product.productImg.length > 0) {
    imageUrl = product.productImg[0].url; // Cloudinary URL yahan se aayega
  }

  // Original price agar backend se nahi aa raha, toh UI ke liye dummy discount dikha dete hain 
  // (Aap chahein toh isko backend me actual MRP add karke update kar sakte hain)
  const originalPrice = price + (price * 0.15); // Dummy 15% markup for UI
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  const handleAddToCart = () => {
    toast.success(`${name} added to cart! 🛍️`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toast.success("Added to wishlist! ❤️");
  };

  return (
    <Card className="group relative w-full overflow-hidden rounded-2xl border-none bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between">
      
      {/* 1. Product Image Section */}
      <div className="relative aspect-square overflow-hidden bg-white p-4">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute left-3 top-3 rounded-full bg-pink-600 px-2 py-1 text-xs font-bold text-white shadow-sm z-10">
            {discount}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute right-3 top-3 rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm transition-all hover:bg-pink-50 hover:text-pink-600 z-10"
        >
          <Heart size={18} />
        </button>
      </div>

      {/* 2. Product Details Section */}
      <CardContent className="p-4 flex-grow">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-pink-600 uppercase tracking-wider bg-pink-50 px-2 py-1 rounded-md">
            {category}
          </span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-medium text-gray-600">4.5</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-800 leading-snug" title={name}>
          {name}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          <span className="text-xl font-bold text-gray-900">₹{price.toLocaleString('en-IN')}</span>
          <span className="text-sm text-gray-400 line-through">
            ₹{originalPrice.toLocaleString('en-IN')}
          </span>
        </div>
      </CardContent>

      {/* 3. Footer / Call to Action */}
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-pink-600 text-white transition-all hover:bg-pink-700 hover:shadow-md"
        >
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}