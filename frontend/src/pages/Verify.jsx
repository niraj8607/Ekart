import React from "react"
import { CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

function Verify() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardContent className="flex flex-col items-center text-center gap-4 py-8">

          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 size={24} />
            <h2 className="text-xl font-semibold">
              Check Your Email
            </h2>
          </div>

          <p className="text-gray-500 text-sm">
            We’ve sent you an email to verify your account. 
            Please check your inbox and click the verification link.
          </p>

        </CardContent>
      </Card>
    </div>
  )
}

export default Verify
