"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Clock, Star, Minus, Plus, Heart, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"
import { NotificationPanel } from "@/components/notification-panel"

export default function FoodDetailPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    Size: "Regular",
    "Add-ons": "",
    Sides: "",
  })
  const [addedToCart, setAddedToCart] = useState(false)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // This would normally come from an API call using the ID
  const food = {
    id: params.id,
    name: "Double Cheeseburger",
    description:
      "Two juicy beef patties with melted cheese, fresh lettuce, tomatoes, and our special sauce on a toasted brioche bun.",
    price: 8.99,
    rating: 4.8,
    reviews: 243,
    prepTime: "15-20 min",
    restaurant: "Burger Joint",
    image: "/image2.jpg?height=400&width=600",
    options: [
      {
        name: "Size",
        choices: [
          { label: "Regular", price: 0 },
          { label: "Large", price: 100.05 },
        ],
      },
      {
        name: "Add-ons",
        choices: [
          { label: "None", price: 0 },
          { label: "Extra Cheese", price: 100.05 },
          { label: "Bacon", price: 100.05 },
          { label: "Avocado", price: 100.05 },
        ],
        multiple: true,
      },
      {
        name: "Sides",
        choices: [
          { label: "None", price: 0 },
          { label: "French Fries", price: 245.18 },
          { label: "Onion Rings", price: 286.18 },
          { label: "Side Salad", price: 245.18 },
        ],
      },
    ],
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta))
  }

  const handleOptionChange = (category: string, choice: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: choice,
    }))
  }

  const calculateTotalPrice = () => {
    let total = food.price

    // Add option prices
    food.options.forEach((option) => {
      const selectedChoice = option.choices.find((choice) => choice.label === selectedOptions[option.name])
      if (selectedChoice) {
        total += selectedChoice.price
      }
    })

    return total * quantity
  }

  const handleAddToCart = () => {
    setAddedToCart(true)

    // Reset after animation
    setTimeout(() => {
      setAddedToCart(false)
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
          <h1 className="text-lg font-bold">Food Details</h1>
          <NotificationPanel />
        </div>
      </motion.header>

      <main className="flex-1 pb-20">
        {/* Food Image */}
        <motion.div
          className="relative h-64 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Image src={food.image || "/placeholder.svg"} alt={food.name} fill className="object-cover" />
          <div className="absolute top-4 right-4 flex gap-2">
            <Badge className="bg-background/80 backdrop-blur-sm text-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              {food.rating}
            </Badge>
            <Badge className="bg-background/80 backdrop-blur-sm text-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {food.prepTime}
            </Badge>
          </div>
          <div className="absolute top-4 left-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
            >
              <Heart className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
            >
              <Share2 className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Food Details */}
        <motion.div
          className="p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">{food.name}</h2>
              <p className="text-sm text-muted-foreground">{food.restaurant}</p>
            </div>
            <div className="text-xl font-bold text-orange-500">₹{food.price.toFixed(2)}</div>
          </div>

          <p className="mt-3 text-muted-foreground">{food.description}</p>

          {/* Options */}
          <div className="mt-6 space-y-6">
            {food.options.map((option, optionIndex) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + optionIndex * 0.1 }}
              >
                <h3 className="font-semibold mb-2">{option.name}</h3>
                <div className="space-y-2">
                  {option.choices.map((choice, choiceIndex) => (
                    <motion.div key={choice.label} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Card
                        className={`border ${
                          selectedOptions[option.name] === choice.label ? "border-orange-500" : "border-border"
                        }`}
                        onClick={() => handleOptionChange(option.name, choice.label)}
                      >
                        <CardContent className="p-3 flex items-center justify-between">
                          <div>
                            <span>{choice.label}</span>
                            {choice.price > 0 && (
                              <span className="text-sm text-muted-foreground ml-1">(+₹{choice.price.toFixed(2)})</span>
                            )}
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border ${
                              selectedOptions[option.name] === choice.label
                                ? "bg-orange-500 border-orange-500"
                                : "border-muted-foreground"
                            } flex items-center justify-center`}
                          >
                            {selectedOptions[option.name] === choice.label && (
                              <motion.div
                                className="w-2 h-2 rounded-full bg-white"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quantity */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="font-semibold mb-2">Quantity</h3>
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center"
                onClick={() => handleQuantityChange(-1)}
              >
                <Minus className="h-4 w-4" />
              </motion.button>
              <span className="mx-6 font-medium text-lg">{quantity}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Add to Cart Button */}
      <motion.div
        className="fixed bottom-20 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 h-12 rounded-xl relative overflow-hidden"
          onClick={handleAddToCart}
        >
          <AnimatePresence mode="wait">
            {addedToCart ? (
              <motion.div
                key="added"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                Added to Cart!
              </motion.div>
            ) : (
              <motion.div
                key="add"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex items-center"
              >
                Add to Cart - ₹{calculateTotalPrice().toFixed(2)}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      <BottomNav />
    </div>
  )
}

