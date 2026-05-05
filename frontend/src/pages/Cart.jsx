
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";

// 🌟 Redux actions import
import { increaseQuantity, decreaseQuantity, removeFromCart } from "@/redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();

  // 🛒 REDUX CONNECTION: Real data from store
  const cartState = useSelector((store) => store.cart);
  const cartItems = cartState?.cartItems || cartState || [];

  // ⚡ Handlers (Ab ye sahi jagah par hain aur UNCOMMENTED hain)
  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id)); 
  };

  const handleDecrease = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(decreaseQuantity(id));
    }
  };

  const handleRemove = (id, name) => {
    dispatch(removeFromCart(id));
    toast.success(`Product removed from cart`);
  };

  // Dynamic Calculations
  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const tax = Math.round(subtotal * 0.05); // 5% Tax
  const shipping = 0; // Free shipping
  const totalAmount = subtotal + tax + shipping;

  // 🌌 EMPTY STATE UI
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-10 px-4 flex justify-center items-center">
        <div className="w-full max-w-md p-10 text-center bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="bg-pink-50 p-6 rounded-full">
              <ShoppingBag size={64} className="text-pink-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty!</h2>
          <p className="text-gray-500 mb-8 text-sm">Add some items to build your cart.</p>
          <Link to="/products">
            <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-6 rounded-lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // 🛍️ FILLED CART UI
  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-slate-800 mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Products List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item._id || item.id} 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm gap-4 sm:gap-0"
              >
                
                {/* 1. Image & Title/Price Info */}
                <div className="flex items-center gap-4 w-full sm:w-[45%]">
                  <Link to={`/product/${item._id || item.id}`} className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-md p-2 flex-shrink-0">
                    <img 
                      src={item.image || item.productImg?.[0]?.url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80"} 
                      alt={item.name || item.productName} 
                      className="w-full h-full object-contain" 
                    />
                  </Link>
                  <div className="flex flex-col">
                    <Link to={`/product/${item._id || item.id}`}>
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 hover:text-pink-600 transition-colors">
                        {item.name || item.productName}
                      </h3>
                    </Link>
                    <span className="text-sm text-gray-600 mt-1">
                      ₹{(item.price || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* 2. Quantity Controls */}
                <div className="flex items-center w-full sm:w-[20%] justify-start sm:justify-center">
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <button 
                      onClick={() => handleDecrease(item._id || item.id, item.quantity)} 
                      className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-gray-800">
                      {item.quantity || 1}
                    </span>
                    <button 
                      onClick={() => handleIncrease(item._id || item.id)} 
                      className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* 3. Total Price per item */}
                <div className="hidden sm:flex w-full sm:w-[15%] justify-center">
                  <span className="text-sm font-medium text-gray-800">
                     ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* 4. Remove Button */}
                <div className="flex items-center w-full sm:w-[15%] justify-end sm:justify-end mt-2 sm:mt-0">
                  <button 
                    onClick={() => handleRemove(item._id || item.id, item.name || item.productName)}
                    className="flex items-center gap-1.5 text-pink-600 hover:text-pink-700 text-sm font-medium transition-colors"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-28">
              <h2 className="text-base font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between items-center">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">₹{shipping}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tax (5%)</span>
                  <span className="font-medium text-gray-900">₹{tax.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex justify-between items-center mt-6 mb-6 pt-4 border-t border-gray-100">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Promo Code Area */}
              <div className="flex gap-2 mb-6">
                <Input 
                  placeholder="Promo Code" 
                  className="bg-white border-gray-200 h-10 rounded-md focus-visible:ring-pink-500 text-sm w-full" 
                />
                <Button variant="outline" className="h-10 px-6 rounded-md text-sm font-medium border-gray-300 text-gray-700">
                  Apply
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-[#e10b7e] hover:bg-[#c90a71] text-white py-6 text-sm font-semibold rounded-md transition-colors uppercase tracking-wide">
                  Place Order
                </Button>
                
                <Link to="/products" className="block">
                  <Button variant="outline" className="w-full bg-white border-gray-300 text-gray-700 py-6 text-sm font-semibold rounded-md hover:bg-gray-50 transition-colors">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Footer Trust Rules */}
              <div className="mt-6 space-y-1.5 text-[11px] text-gray-500">
                <p>* Free shipping on orders over 299</p>
                <p>* 30 days return policy</p>
                <p>* Secure checkout with SSL encryption</p>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}