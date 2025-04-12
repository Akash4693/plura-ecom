"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { useCartStore } from "@/lib/store/cartStore"

import Stepper from "@/components/checkout/Stepper"
import ShippingForm from "@/components/checkout/steps/ShippingForm"
import PaymentForm from "@/components/checkout/steps/PaymentForm"
import ReviewOrder from "@/components/checkout/steps/ReviewOrder"
import ConfirmationPage from "@/components/checkout/steps/Confirmation"

export default function CheckoutPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (!isSignedIn) router.push("/sign-in")
  }, [isSignedIn])

  if (!isSignedIn) return null

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <Stepper step={step} />
      <div className="mt-6">
        {step === 1 && <ShippingForm onNext={() => setStep(2)} />}
        {step === 2 && <PaymentForm onBack={() => setStep(1)} onSuccess={() => setStep(3)} />}
        {step === 3 && <ReviewOrder onBack={() => setStep(2)} onConfirm={() => setStep(4)} />}
        {step === 4 && <ConfirmationPage />}
      </div>
    </div>
  )
}
