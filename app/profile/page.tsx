"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Award,
  ChevronRight,
  Gift,
  QrCode,
  Star,
  Check,
  Package,
  CreditCard,
  HelpCircle,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BottomNav } from "@/components/bottom-nav"
import { NotificationPanel } from "@/components/notification-panel"

export default function ProfilePage() {
  const { theme, setTheme } = useTheme()
  const [showThemeChange, setShowThemeChange] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    setShowThemeChange(true)
    setTimeout(() => setShowThemeChange(false), 2000)
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
          <h1 className="text-lg font-bold">My Profile</h1>
          <NotificationPanel />
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20 overflow-y-auto">
        <AnimatePresence>
          {showThemeChange && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground py-2 px-4 rounded-full shadow-lg"
            >
              Theme changed to {theme === "dark" ? "dark" : "light"}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card p-6 rounded-xl shadow-sm mb-6"
        >
          <div className="flex items-center gap-4">
            <Image
              src="/image21.jpg?height=80&width=80"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full border-4 border-background shadow-md"
            />
            <div>
              <h2 className="text-xl font-bold">Sachin Yadav</h2>
              <p className="text-muted-foreground">ubosachin@gmail.com</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">Gold Member</span>
              </div>
            </div>
          </div>

          {/* Rewards Progress */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Rewards Progress</span>
              <span className="text-sm text-orange-500">750/1000 points</span>
            </div>
            <Progress value={75} className="h-2" indicatorClassName="bg-orange-500" />
            <p className="text-xs text-muted-foreground mt-2">Earn 250 more points to reach Platinum status</p>
          </div>
        </motion.div>

        {/* Daily Check-in */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="mb-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">Daily Check-in</h3>
                  <p className="text-white/80 text-sm">Check in daily to earn rewards!</p>
                </div>
                <Button
                  className="bg-white text-orange-500 hover:bg-white/90"
                  onClick={() => alert("You've checked in for today! +10 points")}
                >
                  Check In
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-2 mt-4">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div
                    key={day}
                    className={`
                      flex items-center justify-center rounded-full h-10 w-10 text-xs font-medium
                      ${day < 3 ? "bg-white/20 border-2 border-white" : "bg-white/10"}
                    `}
                  >
                    {day < 3 && <Check className="h-4 w-4" />}
                    {day >= 3 && day}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* QR Code */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="mb-6">
            <CardContent className="p-4 flex flex-col items-center">
              <QrCode className="h-12 w-12 text-orange-500 mb-2" />
              <h3 className="font-bold">My QR Code</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Scan this code to quickly place orders or share your profile
              </p>
              <div className="bg-muted p-6 rounded-lg">
                <Image
                  src="/placeholder.svg?height=200&width=200&text=QR+Code"
                  alt="QR Code"
                  width={200}
                  height={200}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-2">
          {[
            { icon: Package, label: "My Orders", href: "/cart", badge: "2 Active" },
            { icon: Gift, label: "Rewards & Offers", href: "/rewards", badge: "2 New" },
            { icon: Award, label: "Achievements", href: "/achievements" },
            { icon: CreditCard, label: "Payment Methods", href: "/payment-methods" },
            { icon: HelpCircle, label: "Help & Support", href: "/help" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Link href={item.href}>
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 dark:bg-orange-950/30 p-2 rounded-full">
                        <item.icon className="h-5 w-5 text-orange-500" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center">
                      {item.badge && <Badge className="mr-2 bg-orange-500">{item.badge}</Badge>}
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

