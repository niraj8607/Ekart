import React from "react"
import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react"

function Feature() {
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-pink-600" />,
      title: "Free Shipping",
      description: "Enjoy free delivery on all orders above ₹999.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-pink-600" />,
      title: "Secure Payments",
      description: "100% secure payment with encrypted checkout.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-pink-600" />,
      title: "Easy Returns",
      description: "Hassle-free 7 days return policy.",
    },
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "24/7 Support",
      description: "We are here to help you anytime.",
    },
  ]

  return (
    <section className="w-full bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-bold text-center text-pink-700 mb-12">
          Why Shop With EKART?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-pink-50 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Feature
