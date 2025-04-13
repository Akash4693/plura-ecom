 'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'

import { useToast } from '@/hooks/use-toast'
import { useCartStore } from '@/lib/store/cartStore'
import { useCheckoutStore } from '@/lib/store/checkoutStore'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function ConfirmationPage() {
  const [orderId, setOrderId] = useState('')
  const hasInitialized = useRef(false)

  const { user } = useUser()
  const { toast } = useToast()
  const router = useRouter()

  const { clearCart, items, totalPrice } = useCartStore()
  const { clearCheckout, shipping, payment } = useCheckoutStore()

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    if (!user || items.length === 0) return

    const id = `ORD-${uuidv4()}`
    setOrderId(id)

    const newOrder = {
      id,
      date: new Date().toISOString(),
      items,
      total: totalPrice,
      shipping,
      payment,
    }

    const key = `orders-${user.id}`
    const existingOrders = JSON.parse(localStorage.getItem(key) || '[]')
    localStorage.setItem(key, JSON.stringify([...existingOrders, newOrder]))

    toast({
      title: `✅ Order ${id} placed successfully!`,
      description: 'Redirecting to your profile...',
      duration: 3000,
    })

    clearCart()
    clearCheckout()

    const timeout = setTimeout(() => {
      router.push('/profile')
    }, 3000)

    return () => clearTimeout(timeout)
  }, [
    user,
    items,
    totalPrice,
    shipping,
    payment,
    clearCart,
    clearCheckout,
    router,
    toast,
  ])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white dark:bg-zinc-950 transition-colors">
      <Card className="max-w-xl w-full p-8 text-center shadow-md bg-gray-50 dark:bg-zinc-900 transition-all">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
            ✅ Order Confirmed!
          </h1>
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-2">
            Your order has been placed successfully.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Order ID: <span className="font-semibold">{orderId}</span>
          </p>

          <Button
            onClick={() => router.push('/profile')}
            className="transition hover:scale-[1.02] dark:hover:bg-green-600"
          >
            View Your Orders
          </Button>
        </motion.div>
      </Card>
    </div>
  )
}
