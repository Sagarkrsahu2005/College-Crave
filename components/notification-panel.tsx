"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, Check, Trash2 } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Notification = {
  id: string
  type: "order" | "promotion" | "system" | "general"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [activeTab, setActiveTab] = useState<Notification["type"]>("order")
  const [searchQuery, setSearchQuery] = useState("")
  const { theme } = useTheme()

  useEffect(() => {
    // Simulating fetching notifications from an API
    const fetchNotifications = () => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: ["order", "promotion", "system", "general"][Math.floor(Math.random() * 4)] as Notification["type"],
        title: `New ${["order", "promotion", "system", "general"][Math.floor(Math.random() * 4)]} notification`,
        message: "This is a sample notification message.",
        timestamp: new Date(),
        read: false,
      }
      setNotifications((prev) => [newNotification, ...prev])
      setUnreadCount((prev) => prev + 1)

      // Simulate sound alert (uncomment to enable)
      // new Audio("/notification-sound.mp3").play()

      // Simulate vibration alert (uncomment to enable)
      // if (navigator.vibrate) {
      //   navigator.vibrate(200)
      // }
    }

    const interval = setInterval(fetchNotifications, 30000) // Fetch new notification every 30 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Update unread count when notifications change
    setUnreadCount(notifications.filter((n) => !n.read).length)
  }, [notifications])

  const togglePanel = () => setIsOpen(!isOpen)

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const filteredNotifications = notifications
    .filter((n) => n.type === activeTab)
    .filter(
      (n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  return (
    <>
      <Button variant="ghost" size="icon" className="relative" onClick={togglePanel}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-orange-500">
            {unreadCount}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 sm:px-6 md:pt-24"
          >
            <div className="fixed inset-0 bg-black/50" onClick={togglePanel} />
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`relative w-full max-w-lg rounded-lg shadow-lg ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } overflow-hidden`}
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  <Button variant="ghost" size="icon" onClick={togglePanel}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <Input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Tabs defaultValue="order" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="order" onClick={() => setActiveTab("order")}>
                    Orders
                  </TabsTrigger>
                  <TabsTrigger value="promotion" onClick={() => setActiveTab("promotion")}>
                    Promotions
                  </TabsTrigger>
                  <TabsTrigger value="system" onClick={() => setActiveTab("system")}>
                    System
                  </TabsTrigger>
                  <TabsTrigger value="general" onClick={() => setActiveTab("general")}>
                    General
                  </TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="max-h-96 overflow-y-auto p-4">
                  {filteredNotifications.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">No notifications</p>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className={`mb-4 p-3 rounded-lg ${
                          notification.read ? "bg-gray-100 dark:bg-gray-700" : "bg-orange-100 dark:bg-orange-900"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{notification.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {notification.timestamp.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            {!notification.read && (
                              <Button variant="ghost" size="icon" onClick={() => markAsRead(notification.id)}>
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={() => dismissNotification(notification.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

