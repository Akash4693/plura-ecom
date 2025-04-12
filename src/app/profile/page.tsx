'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { format } from 'date-fns'

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import OrderCardSkeleton from '@/components/skeleton/OrderCardSkeleton'

type Order = {
  id: string
  date: string
  total: number
  shipping: Record<string, any>
  payment: Record<string, any>
  items: {
    id: number
    title: string
    price: number
    image: string
    quantity: number
  }[]
}

export default function ProfilePage() {
  const { user } = useUser()
  const [orders, setOrders] = useState<Order[] | null>(null)

  useEffect(() => {
    if (!user) return
    const key = `orders-${user.id}`
    const storedOrders = JSON.parse(localStorage.getItem(key) || '[]')
    setOrders(storedOrders)
  }, [user])

  if (!user) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Loading user...
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Profile Header */}
      <Card className="flex items-center gap-6 p-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>{user.firstName?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl font-bold">
            Hello, {user.firstName} 👋
          </CardTitle>
          <CardDescription>{user.emailAddresses[0].emailAddress}</CardDescription>
        </div>
      </Card>

      {/* Order History */}
      <div>
        <h2 className="text-xl font-semibold mb-4">🧾 Order History</h2>

        {orders === null ? (
          <div className="space-y-4">
            <OrderCardSkeleton />
            <OrderCardSkeleton />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-muted-foreground text-center mt-10">
            You haven’t placed any orders yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((order) => (
                <Card key={order.id} className="border border-muted bg-background">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <CardDescription>
                        Placed on {format(new Date(order.date), 'dd MMM yyyy')}
                      </CardDescription>
                    </div>
                    <div className="text-right text-sm font-semibold text-green-600 dark:text-green-400">
                      ₹{order.total.toFixed(2)}
                    </div>
                  </CardHeader>

                  <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {order.items.slice(0, 4).map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-16 w-16 object-cover rounded-md border"
                        />
                        <div>
                          <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                          <p className="text-xs text-muted-foreground">x {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
