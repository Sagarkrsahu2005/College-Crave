"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Camera, QrCode, CheckCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"

export default function ScanPage() {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "detected" | "processing" | "success">("idle")
  const [restaurant, setRestaurant] = useState<null | {
    id: number
    name: string
    image: string
    description: string
  }>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scannerBoxRef = useRef<HTMLDivElement>(null)

  // Simulate scanning process
  const handleScan = () => {
    setScanState("scanning")

    // Simulate QR detection after 2 seconds
    setTimeout(() => {
      setScanState("detected")

      // Simulate processing after detection
      setTimeout(() => {
        setScanState("processing")

        // Simulate success after processing
        setTimeout(() => {
          setScanState("success")
          setRestaurant({
            id: 1,
            name: "Burger Joint",
            image: "/placeholder.svg?height=80&width=80",
            description: "Delicious burgers and sides",
          })
        }, 1500)
      }, 1000)
    }, 2000)
  }

  // Reset the scanner
  const resetScanner = () => {
    setScanState("idle")
    setRestaurant(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
          <h1 className="text-lg font-bold">Scan QR Code</h1>
          <div className="w-9"></div> {/* Spacer for alignment */}
        </div>
      </motion.header>

      <main className="flex-1 p-4 pb-20 flex flex-col items-center">
        <motion.div
          className="text-center mb-6 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <QrCode className="h-12 w-12 text-orange-500 mx-auto mb-2" />
          <h2 className="text-xl font-bold">Scan Restaurant QR</h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Scan a restaurant's QR code to quickly view their menu and place an order
          </p>
        </motion.div>

        {/* Scanner Area */}
        <motion.div
          className="w-full max-w-sm aspect-square mb-6 relative overflow-hidden rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {scanState === "idle" && (
              <motion.div
                key="idle"
                className="absolute inset-0 flex flex-col items-center justify-center bg-card border border-border rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-center px-6">Position the QR code within the frame to scan</p>
              </motion.div>
            )}

            {scanState === "scanning" && (
              <motion.div
                key="scanning"
                className="absolute inset-0 bg-black rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                  autoPlay
                  playsInline
                  muted
                />
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div ref={scannerBoxRef} className="w-3/4 h-3/4 border-2 border-white/50 rounded-lg relative">
                    <motion.div
                      className="absolute left-0 right-0 h-0.5 bg-orange-500"
                      initial={{ top: "0%" }}
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500 rounded-tl-md" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange-500 rounded-tr-md" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-orange-500 rounded-bl-md" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500 rounded-br-md" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center text-white">Scanning...</div>
              </motion.div>
            )}

            {scanState === "detected" && (
              <motion.div
                key="detected"
                className="absolute inset-0 bg-black rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-3/4 h-3/4 border-2 border-orange-500 rounded-lg"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500 rounded-tl-md" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange-500 rounded-tr-md" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-orange-500 rounded-bl-md" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500 rounded-br-md" />
                  </motion.div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center text-white">QR Code Detected!</div>
              </motion.div>
            )}

            {scanState === "processing" && (
              <motion.div
                key="processing"
                className="absolute inset-0 flex flex-col items-center justify-center bg-card border border-border rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Loader2 className="h-12 w-12 text-orange-500" />
                </motion.div>
                <p className="text-foreground mt-4">Processing QR Code...</p>
              </motion.div>
            )}

            {scanState === "success" && restaurant && (
              <motion.div
                key="success"
                className="absolute inset-0 flex flex-col items-center justify-center bg-card border border-border rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                </motion.div>
                <div className="text-center">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{restaurant.description}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {scanState === "idle" && (
            <motion.div
              key="idle-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.5 }}
            >
              <Button onClick={handleScan} className="bg-orange-500 hover:bg-orange-600" size="lg">
                Start Scanning
              </Button>
            </motion.div>
          )}

          {scanState === "scanning" && (
            <motion.div
              key="scanning-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Button onClick={resetScanner} variant="outline" size="lg">
                Cancel
              </Button>
            </motion.div>
          )}

          {scanState === "success" && (
            <motion.div
              key="success-buttons"
              className="flex flex-col gap-3 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Link href={`/restaurant/${restaurant?.id}`}>
                <Button className="bg-orange-500 hover:bg-orange-600" size="lg">
                  View Menu
                </Button>
              </Link>
              <Button onClick={resetScanner} variant="outline" size="sm">
                Scan Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  )
}

