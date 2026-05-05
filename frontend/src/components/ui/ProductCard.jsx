import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 
import { addToCart } from "@/redux/cartSlice"; 

export default function ProductCard({ product = {} }) {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store?.user || {}); 

  const id = product._id || product.id;
  const name = product.productName || "Unknown Product";
  const price = product.productPrice || 0;
  const category = product.category || "General";
  
  let imageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"; 
  if (product.productImg && product.productImg.length > 0) {
    imageUrl = product.productImg[0].url; 
  }

  const originalPrice = price + (price * 0.15); 
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  const handleRealAddToCart = async () => {
    const accessToken = localStorage.getItem("accessToken") || localStorage.getItem("token"); 
    
    if (!accessToken) {
      toast.error("Please login to add items to cart!");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/cart/add`, 
        { 
          productId: id,
          userId: user?._id 
        }, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      
      if (res.data.success) {
        toast.success("Product added to Cart 🛍️");
        
        dispatch(addToCart({
          _id: id, name, price, originalPrice, image: imageUrl, category, quantity: 1
        }));
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add product to cart");
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toast.success("Added to wishlist! ❤️");
  };

  return (
    
    <Card className="group relative w-full h-[300px] overflow-hidden rounded-xl border-none bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      
      
      <Link to={`/product/${id}`} className="relative h-36 overflow-hidden bg-white p-2 block shrink-0">
        <img src={imageUrl} alt={name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110" />
        
        {discount > 0 && (
          <div className="absolute left-2 top-2 rounded-full bg-pink-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm z-10">
            {discount}% OFF
          </div>
        )}

        <button onClick={(e) => { e.preventDefault(); handleWishlist(e); }} className="absolute right-2 top-2 rounded-full bg-gray-50/90 p-1.5 text-gray-500 backdrop-blur-sm transition-all hover:bg-pink-50 hover:text-pink-600 z-10">
          <Heart size={14} />
        </button>
      </Link>

     
      <CardContent className="p-2.5 flex-grow flex flex-col justify-between border-t border-gray-50">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[9px] font-medium text-pink-600 uppercase tracking-wider bg-pink-50 px-1.5 py-0.5 rounded">{category}</span>
          <div className="flex items-center gap-0.5 text-yellow-500">
            <Star size={10} fill="currentColor" />
            <span className="text-[10px] font-medium text-gray-600">4.5</span>
          </div>
        </div>

        <Link to={`/product/${id}`}>
        
          <h3 className="line-clamp-2 text-xs font-semibold text-gray-800 leading-tight hover:text-pink-600 transition-colors" title={name}>{name}</h3>
        </Link>

        <div className="flex items-end gap-1.5 mt-1.5">
          <span className="text-base font-bold text-gray-900 leading-none">₹{price.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-gray-400 line-through leading-none mb-0.5">₹{originalPrice.toLocaleString('en-IN')}</span>
        </div>
      </CardContent>

      <CardFooter className="p-2.5 pt-0 shrink-0">
       
        <Button onClick={handleRealAddToCart} className="w-full h-8 text-xs font-medium bg-pink-600 text-white transition-all hover:bg-pink-700 hover:shadow-md">
          <ShoppingCart size={14} className="mr-1.5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}