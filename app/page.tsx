"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, ChevronRight, Sparkles, Clock, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { QrScanButton } from "@/components/qr-scan-button"
import { NotificationPanel } from "@/components/notification-panel"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const categories = [
    { id: "all", name: "All", icon: "/image1.jpg?height=40&width=40&text=All" },
    { id: "pizza", name: "Pizza", icon: "/image17.jpg?height=40&width=40&text=Pizza" },
    { id: "burgers", name: "Burgers", icon: "/image2.jpg?height=40&width=40&text=Burgers" },
    { id: "sushi", name: "Sushi", icon: "/image9.jpg?height=40&width=40&text=Sushi" },
    { id: "salads", name: "Salads", icon: "/image18.jpg?height=40&width=40&text=Salads" },
    { id: "desserts", name: "Desserts", icon: "/image19.jpg?height=40&width=40&text=Desserts" },
    { id: "coffee", name: "Coffee", icon: "/image10.jpg?height=40&width=40&text=Coffee" },
  ]

  const trendingItems = [
    {
      id: 1,
      name: "Double Cheeseburger",
      price: 738.18,
      rating: 4.8,
      restaurant: "Burger Joint",
      image: "/image2.jpg?height=200&width=200",
      timeEstimate: "15-20 min",
      discount: "15% OFF",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      price: 1064.18,
      rating: 4.7,
      restaurant: "Pizza Palace",
      image: "/image16.jpg?height=200&width=200",
      timeEstimate: "20-30 min",
    },
    {
      id: 3,
      name: "Chicken Burrito",
      price: 777.18,
      rating: 4.6,
      restaurant: "Taco Town",
      image: "/image8.jpg?height=200&width=200",
      timeEstimate: "15-25 min",
      discount: "Buy 1 Get 1",
    },
    {
      id: 4,
      name: "Pad Thai",
      price: 983.18,
      rating: 4.9,
      restaurant: "Thai Delight",
      image: "/image12.jpg?height=200&width=200",
      timeEstimate: "25-35 min",
    },
  ]

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
                src="/logo.jpeg?height=80&width=80&text=CC"
                alt="College Crave Logo"
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
          <div className="flex items-center gap-2">
            <Image
              src="/logo.jpeg?height=40&width=40&text=CC"
              alt="College Crave Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <motion.h1
              className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              College Crave
            </motion.h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <NotificationPanel />
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">2</Badge>
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <motion.div
          className="mt-4 relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search for food, restaurants..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-muted focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          />
        </motion.div>
      </motion.header>

      <main className="flex-1 p-4 pb-20">
        {/* Hero Section */}
        <motion.div
          className="relative rounded-xl overflow-hidden mb-6 h-40 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image src="/image14.jpg?height=400&width=800" alt="Special Offer" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-end p-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <h2 className="text-white text-xl font-bold">50% OFF First Order</h2>
              <p className="text-white text-sm mb-2">Use code: NEWBIE</p>
              <Button size="sm" className="w-max bg-orange-500 hover:bg-orange-600 group">
                Order Now
                <motion.span
                  className="inline-block ml-1"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mb-6 rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-3 ">
            <h2 className="text-lg font-bold ">Categories</h2>
            <Link href="/categories" className="text-sm text-orange-500 flex items-center ">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.name)}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-1 transition-all duration-300 ${
                    activeCategory === category.name
                      ? "bg-orange-500 shadow-lg shadow-orange-500/30"
                      : "bg-card shadow-md"
                  }`}
                >
                  <Image
                    src={category.icon || "/logo.jpeg"}
                    alt={category.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <span className={`text-xs ${activeCategory === category.name ? "font-bold text-orange-500" : ""}`}>
                  {category.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trending Now */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <h2 className="text-lg font-bold">Trending Now</h2>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatDelay: 1 }}
                className="ml-2"
              >
                <Sparkles className="h-4 w-4 text-orange-500" />
              </motion.div>
            </div>
            <Link href="/trending" className="text-sm text-orange-500 flex items-center">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {trendingItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/food/${item.id}`}>
                  <Card className="overflow-hidden h-full bg-card shadow-md hover:shadow-lg transition-all duration-300 border-border">
                    <div className="relative h-32">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                        <Badge className="bg-background/80 backdrop-blur-sm text-foreground">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {item.rating}
                        </Badge>
                        <Badge className="bg-background/80 backdrop-blur-sm text-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {item.timeEstimate}
                        </Badge>
                      </div>
                      {item.discount && (
                        <Badge className="absolute top-2 left-2 bg-orange-500 text-white">{item.discount}</Badge>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.restaurant}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-sm">₹{item.price}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="h-8 w-8 rounded-full p-0 bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center"
                        >
                          <ShoppingCart className="h-4 w-4 text-orange-500" />
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Near You */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Near You</h2>
            <Link href="/nearby" className="text-sm text-orange-500 flex items-center">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {[
              {
                id: 1,
                name: "Burger Joint",
                distance: "0.5 mi",
                time: "15-25 min",
                rating: 4.8,
                image: "/image4.jpg?height=80&width=80",
              },
              {
                id: 2,
                name: "Pizza Palace",
                distance: "0.7 mi",
                time: "20-30 min",
                rating: 4.7,
                image: "/image17.jpg?height=80&width=80",
              },
            ].map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/restaurant/${restaurant.id}`}>
                  <Card className="overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-300 border-border">
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={restaurant.image || "/placeholder.svg"}
                            alt={restaurant.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{restaurant.name}</h3>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <span>★ {restaurant.rating}</span>
                            <span className="mx-1">•</span>
                            <span>{restaurant.distance}</span>
                            <span className="mx-1">•</span>
                            <span>{restaurant.time}</span>
                          </div>
                          <div className="flex gap-1 mt-2">
                            <Badge variant="outline" className="text-xs px-2 py-0 h-5 bg-muted/50">
                              Burgers
                            </Badge>
                            <Badge variant="outline" className="text-xs px-2 py-0 h-5 bg-muted/50">
                              Fast Food
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <QrScanButton />
      <BottomNav />
    </div>
  )
}

