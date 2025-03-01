"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { QrCode, X } from "lucide-react"

export function QrScanButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="fixed bottom-24 right-4 z-20">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 1.7,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleExpand}
        >
          {isExpanded ? <X className="h-6 w-6" /> : <QrCode className="h-6 w-6" />}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute bottom-16 right-0 bg-background rounded-lg shadow-lg p-4 w-48 border border-border"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="space-y-2">
              <Link href="/scan" onClick={() => setIsExpanded(false)}>
                <motion.div
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <QrCode className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Scan to Order</span>
                </motion.div>
              </Link>
              <Link href="/scan/table" onClick={() => setIsExpanded(false)}>
                <motion.div
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <QrCode className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Scan Table QR</span>
                </motion.div>
              </Link>
              <Link href="/scan/payment" onClick={() => setIsExpanded(false)}>
                <motion.div
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <QrCode className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Scan to Pay</span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

