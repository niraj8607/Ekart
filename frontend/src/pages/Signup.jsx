import React, { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Toaster } from "@/components/ui/sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  // Handle Input Change
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Handle Form Submit
  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    setLoading(true)
    const res = await axios.post(
      "http://localhost:8080/api/v1/user/register",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    console.log("Response:", res.data)

    if (res.data.success) {
      toast.success(res.data.message)
      navigate("/verify")
    }

  } catch (err) {
    console.log("Error:", err.response?.data || err.message)
    toast.error(err.response?.data?.message || "Something went wrong")
  }finally{
    setLoading(false)
  }
}


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 rounded-2xl">
        
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription className="text-gray-500">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* First + Last Name */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Niraj"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Kumar"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="kumarniraj@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2"/>Please wait</>:  "Signup"}
            </Button>

          </form>
        </CardContent>

        <CardFooter className="flex justify-center text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </CardFooter>

      </Card>
    </div>
  )
}

export default Signup
