import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Star, Truck, ShieldCheck, Zap } from "lucide-react"

function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-br from-pink-50 via-white to-pink-100 py-16 lg:py-24 px-6 overflow-hidden">
      
      {/* Abstract Background Blurs for Modern Look */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left z-10">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-semibold text-sm mb-6 border border-pink-200 shadow-sm transition-transform hover:scale-105 cursor-default">
            <Zap className="w-4 h-4 fill-pink-600 text-pink-600" />
            <span>Special Festival Offer - Up to 50% Off</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
            Discover the Latest <br className="hidden lg:block" />
            Trends in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Fashion & Tech</span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Shop the best products at unbeatable prices. Upgrade your lifestyle with our premium collection. Quality guaranteed with lightning-fast delivery.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link to="/products">
              <Button className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-pink-600/30 transition-all hover:-translate-y-1 group">
                <ShoppingBag className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" />
                Shop Now
              </Button>
            </Link>

            <Link to="/signup">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-pink-200 text-pink-700 hover:bg-pink-50 hover:border-pink-300 px-8 py-6 text-lg rounded-full transition-all hover:-translate-y-1 group bg-white shadow-sm"
              >
                View Details
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-full shadow-sm text-pink-600">
                <Truck className="w-4 h-4" />
              </div>
              Free Shipping
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-full shadow-sm text-pink-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
              Secure Payments
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-full shadow-sm text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-500" />
              </div>
              4.9/5 Ratings
            </div>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="flex-1 w-full flex justify-center lg:justify-end relative z-10 mt-10 lg:mt-0">
          
          <div className="relative w-full max-w-md lg:max-w-lg">
            {/* Image Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-300 to-purple-300 rounded-[2rem] transform rotate-3 scale-105 opacity-50 blur-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-400 to-pink-600 rounded-[2rem] transform -rotate-3 transition-transform hover:rotate-0 duration-500"></div>
            
            {/* Main Image */}
            <img
              src="/Hero.jpeg"
              alt="EKART Shopping"
              className="relative z-10 w-full rounded-[2rem] shadow-2xl object-cover aspect-[4/5] hover:scale-[1.02] transition-transform duration-500"
            />

            {/* Floating Card 1 (Top Left) */}
            <div className="absolute -left-6 lg:-left-12 top-10 z-20 bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-pink-50 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs text-gray-500 font-medium">Top Rated</p>
                  <p className="text-sm font-bold text-gray-900">Premium Quality</p>
                </div>
              </div>
            </div>

            {/* Floating Card 2 (Bottom Right) */}
            <div className="absolute -right-6 lg:-right-10 bottom-12 z-20 bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-pink-50 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="bg-pink-100 p-2 rounded-full text-pink-600 font-extrabold text-sm md:text-lg">
                  50%
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-gray-900">Mega Sale</p>
                  <p className="text-xs text-gray-500 font-medium">Top Brands</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Hero