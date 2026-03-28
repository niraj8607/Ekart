import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
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
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/userSlice"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        formData
      )

     if (res.data.success) {
        toast.success("Login Successful 🎉")

        // User data save kiya
        localStorage.setItem("user", JSON.stringify(res.data.user))
        
        // 👇 बस 'token' की जगह 'accessToken' कर दें!
        localStorage.setItem("token", res.data.accessToken) 

        navigate("/")
        dispatch(setUser(res.data.user))
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">

        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Enter your credentials to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

          </form>
        </CardContent>

        <CardFooter className="flex justify-center text-sm">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-pink-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>

      </Card>
    </div>
  )
}

export default Login
