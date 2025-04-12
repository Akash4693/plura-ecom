'use client'

import { useCartStore } from '@/lib/store/cartStore'
import { useCheckoutStore } from '@/lib/store/checkoutStore'
import { formatCurrency } from '@/lib/utils/formatCurrency'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'
import { useCallback, useMemo } from 'react'

type ReviewOrderProps = {
  onConfirm: () => void
  onBack: () => void
}

const ReviewOrder = ({ onConfirm, onBack }: ReviewOrderProps) => {
  const { items, totalPrice } = useCartStore()
  const { shipping, payment } = useCheckoutStore()
  const { toast } = useToast()

  const maskedCard = useMemo(() => {
    if (payment?.method === 'card' && payment.cardNumber) {
      return `**** **** **** ${payment.cardNumber.slice(-4)}`
    }
    return 'Cash on Delivery'
  }, [payment])

  const handleConfirm = useCallback(() => {
    toast({
      title: '✅ Order placed successfully!',
      description: 'Your order has been placed successfully.',
      duration: 3000,
    })

    // Delay onConfirm slightly to allow the toast to settle, avoiding race conditions
    setTimeout(() => {
      onConfirm()
    }, 100)
  }, [toast, onConfirm])

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md bg-white dark:bg-zinc-900 transition-all">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-800 dark:text-white">
          Review Your Order
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain rounded-md border"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    x{item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Total</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(totalPrice)}
          </p>
        </div>

        {/* Shipping Info */}
        {shipping && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Shipping Details
            </h3>
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p>{shipping.name}</p>
              <p>{shipping.email}</p>
              <p>{shipping.phone}</p>
              <p>
                {shipping.address}, {shipping.city}, {shipping.zip}
              </p>
            </div>
          </div>
        )}

        {/* Payment Info */}
        {payment && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Payment Method
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{maskedCard}</p>
          </div>
        )}

        <div className="flex gap-4 pt-2">
          <Button type="button" variant="outline" onClick={onBack} className="w-full">
            Back
          </Button>
          <Button
            onClick={handleConfirm}
            className="w-full transition-all duration-200 hover:bg-green-600 dark:hover:bg-green-500"
          >
            Confirm & Place Order
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ReviewOrder
