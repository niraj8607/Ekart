import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function Cart() {
  // 🛒 DUMMY DATA: UI dekhne ke liye (Baad me ise Redux state se replace karenge)
  const [cartItems, setCartItems] = useState([
    {
      _id: "1",
      name: "iPhone 17 Pro Max 256 GB: 17.42 cm Display, A19 Pro Chip",
      category: "Mobile",
      price: 134900,
      originalPrice: 149900,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
      quantity: 1,
    },
    {
      _id: "2",
      name: "boAt 2025 Launch Rockerz 421, 40H Playtime",
      category: "Headphone",
      price: 1299,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      quantity: 2,
    },
  ]);

  // Handlers for Quantity and Removal
  const handleIncrease = (id) => {
    setCartItems(items => items.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleDecrease = (id) => {
    setCartItems(items => items.map(item => item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const handleRemove = (id, name) => {
    setCartItems(items => items.filter(item => item._id !== id));
    toast.error(`${name} removed from cart`);
  };

  // Calculations
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalOriginalPrice = cartItems.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
  const totalDiscountedPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDiscount = totalOriginalPrice - totalDiscountedPrice;
  const deliveryCharge = totalDiscountedPrice > 50000 ? 0 : 499; // Free delivery above 50k

  // Agar Cart Khali hai (Empty State UI)
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-24 pb-10 px-4 flex justify-center items-center">
        <Card className="w-full max-w-md p-8 text-center rounded-2xl shadow-xl border-none">
          <div className="flex justify-center mb-6">
            <div className="bg-pink-100 p-6 rounded-full">
              <ShoppingBag size={64} className="text-pink-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty!</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products">
            <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-6 text-lg rounded-xl">
              Start Shopping
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Bhara hua Cart UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          Shopping Cart 
          <span className="text-lg font-medium bg-white px-3 py-1 rounded-full shadow-sm text-pink-600">
            {totalItems} Items
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Cart Items List */}
          <div className="lg:col-span-8 space-y-5">
            {cartItems.map((item) => (
              <Card key={item._id} className="rounded-2xl border-none shadow-md overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6">
                  
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col w-full">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-xs font-semibold text-pink-600 uppercase tracking-wider bg-pink-50 px-2 py-1 rounded-md mb-2 inline-block">
                          {item.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 leading-snug">
                          {item.name}
                        </h3>
                      </div>
                      
                      {/* Delete Button (Desktop) */}
                      <button 
                        onClick={() => handleRemove(item._id, item.name)}
                        className="hidden sm:flex text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-50 rounded-full hover:bg-red-50"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      
                      {/* Price section */}
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{item.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* Controls: Quantity & Mobile Delete */}
                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                        {/* Quantity Logic */}
                        <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-gray-50">
                          <button onClick={() => handleDecrease(item._id)} className="p-1.5 text-gray-600 hover:bg-white rounded-md transition-colors shadow-sm">
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button onClick={() => handleIncrease(item._id)} className="p-1.5 text-gray-600 hover:bg-white rounded-md transition-colors shadow-sm">
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Delete Button (Mobile) */}
                        <button 
                          onClick={() => handleRemove(item._id, item.name)}
                          className="sm:hidden text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-50 rounded-full"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* RIGHT COLUMN: Order Summary (Sticky) */}
          <div className="lg:col-span-4">
            <Card className="rounded-2xl border-none shadow-xl sticky top-24">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Bill Details */}
                <div className="space-y-4 text-sm sm:text-base text-gray-600">
                  <div className="flex justify-between">
                    <span>Price ({totalItems} items)</span>
                    <span className="font-medium text-gray-900">₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">- ₹{totalDiscount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="font-medium text-gray-900">
                      {deliveryCharge === 0 ? <span className="text-green-600">Free</span> : `₹${deliveryCharge}`}
                    </span>
                  </div>
                </div>

                <hr className="my-6 border-gray-100" />

                {/* Total Amount */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-pink-600">
                    ₹{(totalDiscountedPrice + deliveryCharge).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Savings Alert */}
                {totalDiscount > 0 && (
                  <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm text-center font-medium mb-6">
                    You will save ₹{totalDiscount.toLocaleString('en-IN')} on this order
                  </div>
                )}

                {/* Coupon Code Input */}
                <div className="flex gap-2 mb-6">
                  <Input placeholder="Enter Coupon Code" className="bg-gray-50" />
                  <Button variant="outline" className="text-pink-600 border-pink-200 hover:bg-pink-50">Apply</Button>
                </div>

                {/* Checkout Button */}
                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-6 text-lg rounded-xl shadow-lg transition-all hover:-translate-y-1">
                  Proceed to Checkout <ArrowRight className="ml-2" size={20} />
                </Button>

                {/* Trust Badges */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <ShieldCheck size={16} />
                  <span>Secure checkout powered by Stripe / Razorpay</span>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}