import React from "react"
import { Link } from "react-router-dom"
import {
  Facebook,
  Instagram,
  Twitter,
  Store,
  MapPin,
  Mail,
  Phone,
} from "lucide-react"

function Footer() {
  return (
    <footer className="bg-pink-900 text-pink-100 pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
            <Store className="w-6 h-6" />
            EKART
          </div>
          <p className="mt-4 text-sm text-pink-200">
            Your one-stop destination for fashion, tech, and lifestyle products.
            Shop smart. Shop easy.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Us
          </h3>

          <div className="space-y-3 text-sm text-pink-200">

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />
              <span>
                123 Market Street,  
                New Delhi, India – 110001
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>support@ekart.com</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </div>

          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-white cursor-pointer" />
          </div>

        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-pink-800 mt-10 pt-6 text-center text-sm text-pink-300">
        © {new Date().getFullYear()} EKART. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
