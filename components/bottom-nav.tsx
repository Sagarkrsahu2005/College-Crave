"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Heart, User, QrCode, Gift } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()
  const [active, setActive] = useState("home")

  useEffect(() => {
    const path = pathname.split("/")[1] || "home"
    setActive(path)
  }, [pathname])

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "favorites", label: "Favorites", icon: Heart, href: "/favorites" },
    { id: "scanner", label: "Scan", icon: QrCode, href: "/scan", isScanner: true },
    { id: "rewards", label: "Rewards", icon: Gift, href: "/rewards" },
    { id: "profile", label: "Profile", icon: User, href: "/profile" },
  ]

  return (
    <motion.div
      className="fixed bottom-4 left-4 right-4 bg-background/80 backdrop-blur-md shadow-lg rounded-2xl z-10 border border-border"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full ${
              item.isScanner ? "relative -top-4" : ""
            }`}
          >
            <motion.div
              className={`flex flex-col items-center justify-center ${
                active === item.id ? "text-orange-500" : item.isScanner ? "text-white" : "text-muted-foreground"
              }`}
              whileHover={{ y: item.isScanner ? -4 : -2 }}
              whileTap={{ scale: 0.9 }}
            >
              {item.isScanner ? (
                <motion.div
                  className="bg-orange-500 rounded-full p-4 shadow-lg"
                  animate={{ boxShadow: ["0 0 0 0 rgba(249, 115, 22, 0.4)", "0 0 0 15px rgba(249, 115, 22, 0)"] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <item.icon className="h-6 w-6" />
                </motion.div>
              ) : (
                <item.icon className="h-5 w-5" />
              )}
              <span className={`text-xs mt-1 ${item.isScanner ? "font-bold" : ""}`}>{item.label}</span>
              {active === item.id && !item.isScanner && (
                <motion.div
                  className="absolute -bottom-1 w-10 h-1 bg-orange-500 rounded-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

