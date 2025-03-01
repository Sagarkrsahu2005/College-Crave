"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Grid, List, ShoppingCart, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNav } from "@/components/bottom-nav"
import { NotificationPanel } from "@/components/notification-panel"

type FavoriteItem = {
  id: number
  name: string
  price: number
  image: string
  restaurant: string
}

export default function FavoritesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: 1,
      name: "Double Cheeseburger",
      price: 8.99,
      image: "/image4.jpg?height=200&width=200",
      restaurant: "Burger Joint",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      price: 12.99,
      image: "/image16.jpg?height=200&width=200",
      restaurant: "Pizza Palace",
    },
    {
      id: 3,
      name: "Chicken Burrito",
      price: 9.49,
      image: "/image12.jpg?height=200&width=200",
      restaurant: "Taco Town",
    },
  ])

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid")
  }

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id))
  }

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
          <h1 className="text-lg font-bold">My Favorites</h1>
          <div className="flex items-center gap-2">
            <NotificationPanel />
            <Button variant="ghost" size="icon" onClick={toggleViewMode}>
              {viewMode === "grid" ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <AnimatePresence>
          {favorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <Image
                src="/placeholder.svg?height=200&width=200&text=Empty"
                alt="Empty favorites"
                width={200}
                height={200}
                className="mb-4"
              />
              <h2 className="text-xl font-bold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-4">Start exploring and add some items to your favorites!</p>
              <Link href="/">
                <Button className="bg-orange-500 hover:bg-orange-600">Explore Menu</Button>
              </Link>
            </motion.div>
          ) : (
            <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : ""}`}>
              {favorites.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden h-full">
                    <CardContent className="p-0">
                      <div className={`flex ${viewMode === "list" ? "flex-row" : "flex-col"}`}>
                        <div className={`relative ${viewMode === "list" ? "w-24 h-24" : "w-full h-40"}`}>
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="p-4 flex-1">
                          <h3 className="font-bold mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.restaurant}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-orange-500">₹{item.price.toFixed(2)}</span>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => removeFromFavorites(item.id)}
                              >
                                <Heart className="h-5 w-5 fill-current" />
                              </Button>
                              <Button size="icon" className="bg-orange-500 hover:bg-orange-600">
                                <ShoppingCart className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  )
}

