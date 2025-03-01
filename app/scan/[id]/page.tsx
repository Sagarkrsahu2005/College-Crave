"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"

export default function RestaurantMenuPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("Popular")
  const [addedToCart, setAddedToCart] = useState<number[]>([])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // This would normally come from an API call using the ID
  const restaurant = {
    id: params.id,
    name: "Burger Joint",
    description: "Delicious burgers and sides",
    rating: 4.8,
    reviews: 243,
    distance: "0.5 mi",
    deliveryTime: "15-25 min",
    image: "/placeholder.svg?height=200&width=400",
    categories: ["Popular", "Burgers", "Sides", "Drinks", "Desserts"],
    menu: [
      {
        id: 1,
        name: "Double Cheeseburger",
        description:
          "Two juicy beef patties with melted cheese, fresh lettuce, tomatoes, and our special sauce on a toasted brioche bun.",
        price: 8.99,
        image: "/placeholder.svg?height=120&width=120",
        category: "Popular",
        isPopular: true,
      },
      {
        id: 2,
        name: "Bacon Deluxe Burger",
        description: "Juicy beef patty with crispy bacon, cheddar cheese, lettuce, tomato, and mayo on a toasted bun.",
        price: 9.99,
        image: "/placeholder.svg?height=120&width=120",
        category: "Popular",
        isPopular: true,
      },
      {
        id: 3,
        name: "Classic Burger",
        description: "Beef patty with lettuce, tomato, onion, and our house sauce on a toasted bun.",
        price: 7.49,
        image: "/placeholder.svg?height=120&width=120",
        category: "Burgers",
      },
      {
        id: 4,
        name: "Veggie Burger",
        description: "Plant-based patty with lettuce, tomato, onion, and vegan mayo on a whole grain bun.",
        price: 8.49,
        image: "/placeholder.svg?height=120&width=120",
        category: "Burgers",
      },
      {
        id: 5,
        name: "French Fries",
        description: "Crispy golden fries seasoned with our special blend of spices.",
        price: 3.99,
        image: "/placeholder.svg?height=120&width=120",
        category: "Sides",
      },
      {
        id: 6,
        name: "Onion Rings",
        description: "Crispy battered onion rings served with dipping sauce.",
        price: 4.49,
        image: "/placeholder.svg?height=120&width=120",
        category: "Sides",
      },
      {
        id: 7,
        name: "Soft Drink",
        description: "Your choice of soda, available in various flavors.",
        price: 2.49,
        image: "/placeholder.svg?height=120&width=120",
        category: "Drinks",
      },
      {
        id: 8,
        name: "Chocolate Milkshake",
        description: "Rich and creamy chocolate milkshake topped with whipped cream.",
        price: 4.99,
        image: "/placeholder.svg?height=120&width=120",
        category: "Drinks",
      },
    ],
  }

  const filteredMenu = restaurant.menu.filter((item) =>
    activeCategory === "Popular" ? item.isPopular : item.category === activeCategory,
  )

  const handleAddToCart = (id: number) => {
    setAddedToCart((prev) => [...prev, id])

    // Reset after animation
    setTimeout(() => {
      setAddedToCart((prev) => prev.filter((itemId) => itemId !== id))
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <Image
                src="/placeholder.svg?height=80&width=80&text=BJ"
                alt="Burger Joint Logo"
                width={80}
                height={80}
                className="rounded-2xl mb-4"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-md p-4 border-b border-border"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold">Restaurant Menu</h1>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">2</Badge>
            </Button>
          </Link>
        </div>
      </motion.header>

      <main className="flex-1 pb-20">
        {/* Restaurant Banner */}
        <motion.div
          className="relative h-48 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold text-white">{restaurant.name}</h2>
                <div className="flex items-center text-white/90 text-sm mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{restaurant.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{restaurant.reviews} reviews</span>
                </div>
                <div className="flex items-center text-white/90 text-sm mt-1">
                  <span>{restaurant.distance}</span>
                  <span className="mx-1">•</span>
                  <span>{restaurant.deliveryTime}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center text-white"
                >
                  <Heart className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center text-white"
                >
                  <Share2 className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center text-white"
                >
                  <Info className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="px-4 py-3 overflow-x-auto scrollbar-hide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex gap-2">
            {restaurant.categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeCategory === category ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground"
                }`}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="px-4 space-y-4 mt-2">
          {filteredMenu.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="overflow-hidden border-border">
                <CardContent className="p-0">
                  <div className="flex p-3">
                    <div className="flex-1 pr-3">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">${item.price.toFixed(2)}</span>
                        <motion.button
                          className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center relative"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleAddToCart(item.id)}
                        >
                          <ShoppingCart className="h-4 w-4 text-orange-500" />

                          <AnimatePresence>
                            {addedToCart.includes(item.id) && (
                              <motion.div
                                className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                ✓
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </div>
                    </div>
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Checkout Button */}
      <motion.div
        className="fixed bottom-20 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button className="w-full bg-orange-500 hover:bg-orange-600 h-12 rounded-xl">View Cart • $21.98</Button>
      </motion.div>

      <BottomNav />
    </div>
  )
}

