'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type PaymentFormProps = {
  onSuccess: () => void
  onBack: () => void
}

const PaymentForm = ({ onSuccess, onBack }: PaymentFormProps) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  })

  const { toast } = useToast() 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      toast({
        title: '✅ Payment Successful',
        description: 'Your order has been placed successfully.',
        duration: 3000
      })
      onSuccess()
    }, 1500)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6 mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md transition-all duration-300"
    >
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Name on Card
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
          className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Card Number
        </Label>
        <Input
          id="cardNumber"
          name="cardNumber"
          placeholder="4242 4242 4242 4242"
          value={formData.cardNumber}
          onChange={handleChange}
          required
          inputMode="numeric"
          maxLength={19}
          className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
        />
      </div>

      <div className="flex space-x-4">
        <div className="w-1/2 space-y-2">
          <Label htmlFor="expiry" className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Expiry
          </Label>
          <Input
            id="expiry"
            name="expiry"
            placeholder="MM/YY"
            value={formData.expiry}
            onChange={handleChange}
            required
            maxLength={5}
            className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
          />
        </div>

        <div className="w-1/2 space-y-2">
          <Label htmlFor="cvc" className="text-sm font-medium text-gray-700 dark:text-gray-200">
            CVC
          </Label>
          <Input
            id="cvc"
            name="cvc"
            placeholder="123"
            value={formData.cvc}
            onChange={handleChange}
            required
            inputMode="numeric"
            maxLength={4}
            className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
          />
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          className="w-1/2"
          onClick={onBack}
          disabled={loading}
        >
          Back
        </Button>
        <Button
          type="submit"
          className="w-1/2 transition-all duration-200 hover:bg-blue-600 dark:hover:bg-blue-500"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              Processing...
            </span>
          ) : (
            'Pay Now'
          )}
        </Button>
      </div>
    </form>
  )
}

export default PaymentForm
