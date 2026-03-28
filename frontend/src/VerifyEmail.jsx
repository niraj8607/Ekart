import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { CheckCircle2, XCircle } from "lucide-react"

function VerifyEmail() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/user/verify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (res.data.success) {
          setStatus("success")

          setTimeout(() => {
            navigate("/login")
          }, 2000)
        } else {
          setStatus("error")
        }

      } catch (error) {
        console.log(error)
        setStatus("error")
      }
    }

    if (token) {
      verifyEmail()
    }

  }, [token, navigate])

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">

        {status === "loading" && (
          <h2 className="text-lg font-semibold text-gray-600">
            Verifying your email...
          </h2>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 size={40} className="text-green-600" />
            <h2 className="text-xl font-semibold text-green-600">
              Email Verified Successfully!
            </h2>
            <p className="text-sm text-gray-500">
              Redirecting to login...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-3">
            <XCircle size={40} className="text-red-600" />
            <h2 className="text-xl font-semibold text-red-600">
              Verification Failed
            </h2>
            <p className="text-sm text-gray-500">
              Invalid or expired verification link.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default VerifyEmail
