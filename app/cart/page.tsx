"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Minus, Plus, Trash2, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BottomNav } from "@/components/bottom-nav"
import { NotificationPanel } from "@/components/notification-panel"

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  options: string[]
}

type OrderStatus = "Placed" | "Preparing" | "Out for Delivery" | "Delivered"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Double Cheeseburger",
      price: 8.99,
      quantity: 1,
      image: "/image4.jpg?height=80&width=80",
      options: ["Regular", "Extra Cheese", "French Fries"],
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      price: 12.99,
      quantity: 1,
      image: "/image14.jpg?height=80&width=80",
      options: ["Medium", "Extra Cheese"],
    },
  ])
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("Placed")
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState("30-40 min")

  useEffect(() => {
    // Simulate order status changes
    const timer = setTimeout(() => {
      if (orderStatus === "Placed") setOrderStatus("Preparing")
      else if (orderStatus === "Preparing") setOrderStatus("Out for Delivery")
      else if (orderStatus === "Out for Delivery") setOrderStatus("Delivered")
    }, 10000)

    return () => clearTimeout(timer)
  }, [orderStatus])

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)),
    )
  }

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const deliveryFee = 2.99
  const total = subtotal + tax + deliveryFee

  const orderProgress =
    orderStatus === "Placed" ? 25 : orderStatus === "Preparing" ? 50 : orderStatus === "Out for Delivery" ? 75 : 100

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold">Your Cart</h1>
          <NotificationPanel />
        </div>
      </header>

      <main className="flex-1 p-4 pb-20 overflow-y-auto">
        {/* Order Status */}
        <Card className="mb-6 overflow-hidden">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4">Order Status</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{orderStatus}</span>
              <span className="text-sm text-muted-foreground">{estimatedDeliveryTime}</span>
            </div>
            <Progress value={orderProgress} className="h-2 mb-4" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Placed</span>
              <span>Preparing</span>
              <span>Out for Delivery</span>
              <span>Delivered</span>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              <span>Estimated delivery time: {estimatedDeliveryTime}</span>
            </div>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Delivery address: 123 College St, Anytown, USA</span>
            </div>
          </CardContent>
        </Card>

        {/* Cart Items */}
        <h2 className="text-xl font-bold mb-4">Your Order</h2>
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              layout
            >
              <Card className="mb-4 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{item.options.join(", ")}</div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Order Summary */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Button */}
        <div className="mt-6">
          <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg">
            Proceed to Checkout
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

