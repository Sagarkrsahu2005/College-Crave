"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Gift, ChevronRight, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"
import { NotificationPanel } from "@/components/notification-panel"

type RewardItem = {
  id: number
  name: string
  description: string
  pointsCost: number
  image: string
}

export default function RewardsPage() {
  const [totalPoints, setTotalPoints] = useState(750)
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null)
  const [showModal, setShowModal] = useState(false)

  const rewardTiers = [
    { name: "Silver", threshold: 500 },
    { name: "Gold", threshold: 1000 },
    { name: "Platinum", threshold: 2000 },
  ]

  const currentTier = rewardTiers.reduce((acc, tier) => (totalPoints >= tier.threshold ? tier : acc), rewardTiers[0])
  const nextTier = rewardTiers[rewardTiers.indexOf(currentTier) + 1] || currentTier
  const progress = ((totalPoints - currentTier.threshold) / (nextTier.threshold - currentTier.threshold)) * 100

  const rewardItems: RewardItem[] = [
    {
      id: 1,
      name: "Free Burger",
      description: "Redeem a free burger with your next order",
      pointsCost: 500,
      image: "/image4.jpg?height=100&width=100&text=Burger",
    },
    {
      id: 2,
      name: "50% Off Pizza",
      description: "Get 50% off on any large pizza",
      pointsCost: 750,
      image: "/image5.jpg?height=100&width=100&text=Pizza",
    },
    {
      id: 3,
      name: "Free Delivery",
      description: "Free delivery on your next 3 orders",
      pointsCost: 1000,
      image: "/image20.jpg?height=100&width=100&text=Delivery",
    },
  ]

  const handleRewardSelect = (reward: RewardItem) => {
    setSelectedReward(reward)
    setShowModal(true)
  }

  const handleRedemption = () => {
    if (selectedReward && totalPoints >= selectedReward.pointsCost) {
      setTotalPoints((prev) => prev - selectedReward.pointsCost)
      // Here you would typically make an API call to record the redemption
      setShowModal(false)
      setSelectedReward(null)
    }
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
          <h1 className="text-lg font-bold">My Rewards</h1>
          <NotificationPanel />
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        {/* Points and Tier Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">{totalPoints} points</h2>
                <p className="text-muted-foreground">Current Tier: {currentTier.name}</p>
              </div>
              <div className="bg-orange-500 text-white p-3 rounded-full">
                <Gift className="h-6 w-6" />
              </div>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">
              {nextTier.threshold - totalPoints} points to {nextTier.name}
            </p>
          </CardContent>
        </Card>

        {/* Redeemable Items */}
        <h2 className="text-xl font-bold mb-4">Redeemable Rewards</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {rewardItems.map((reward) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-4" onClick={() => handleRewardSelect(reward)}>
                  <div className="flex items-center gap-4">
                    <Image
                      src={reward.image || "/placeholder.svg"}
                      alt={reward.name}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{reward.description}</p>
                      <Badge variant="secondary">{reward.pointsCost} points</Badge>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Redemption Modal */}
      <AnimatePresence>
        {showModal && selectedReward && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card p-6 rounded-lg shadow-xl max-w-md w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Confirm Redemption</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="mb-6">
                <Image
                  src={selectedReward.image || "/placeholder.svg"}
                  alt={selectedReward.name}
                  width={100}
                  height={100}
                  className="rounded-md mx-auto mb-4"
                />
                <h3 className="font-bold text-center mb-2">{selectedReward.name}</h3>
                <p className="text-center text-muted-foreground mb-4">{selectedReward.description}</p>
                <p className="text-center font-bold">
                  Cost: <span className="text-orange-500">{selectedReward.pointsCost} points</span>
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={handleRedemption}
                  disabled={totalPoints < selectedReward.pointsCost}
                >
                  Confirm Redemption
                </Button>
              </div>
              {totalPoints < selectedReward.pointsCost && (
                <p className="text-red-500 text-sm text-center mt-4">
                  You don't have enough points to redeem this reward.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  )
}

