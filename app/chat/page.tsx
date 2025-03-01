"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Paperclip, Send, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BottomNav } from "@/components/bottom-nav"

type Message = {
  id: number
  text: string
  sender: "user" | "ai" | "support"
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi there! I'm your College Crave assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      let aiResponse: Message

      if (inputValue.toLowerCase().includes("order") || inputValue.toLowerCase().includes("status")) {
        aiResponse = {
          id: messages.length + 2,
          text: "Your order #1234 is currently being prepared and should be ready in about 15 minutes. Is there anything else you'd like to know?",
          sender: "ai",
          timestamp: new Date(),
        }
      } else if (inputValue.toLowerCase().includes("menu") || inputValue.toLowerCase().includes("food")) {
        aiResponse = {
          id: messages.length + 2,
          text: "You can browse our full menu by going to the home page and selecting a restaurant. Would you like me to recommend some popular items?",
          sender: "ai",
          timestamp: new Date(),
        }
      } else if (inputValue.toLowerCase().includes("payment") || inputValue.toLowerCase().includes("card")) {
        aiResponse = {
          id: messages.length + 2,
          text: "We accept all major credit cards, digital wallets like Apple Pay and Google Pay, and campus meal plans at participating locations. Would you like to update your payment method?",
          sender: "ai",
          timestamp: new Date(),
        }
      } else {
        aiResponse = {
          id: messages.length + 2,
          text: "Thanks for your message! I'll do my best to help. Could you provide more details about what you're looking for?",
          sender: "ai",
          timestamp: new Date(),
        }
      }

      setMessages((prev) => [...prev, aiResponse])

      // Simulate transferring to human support for complex queries
      if (inputValue.toLowerCase().includes("refund") || inputValue.toLowerCase().includes("complaint")) {
        setTimeout(() => {
          const supportMessage: Message = {
            id: messages.length + 3,
            text: "Hi there, this is Jessica from customer support. I understand you have a concern about your order. Could you please provide your order number so I can look into this for you?",
            sender: "support",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, supportMessage])
        }, 1500)
      }
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold">Support Chat</h1>
          <div className="w-9"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="flex-1 p-4 pb-20 flex flex-col">
        {/* Quick Actions */}
        <div className="mb-4">
          <h2 className="text-sm font-medium mb-2">Quick Actions</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              Order Status
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              Delivery Issues
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              Payment Help
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              Menu Questions
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              {message.sender !== "user" && (
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                  {message.sender === "ai" ? (
                    <Image src="/placeholder.svg?height=32&width=32" alt="AI Assistant" width={32} height={32} />
                  ) : (
                    <div className="bg-purple-500 w-full h-full flex items-center justify-center text-white">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-orange-500 text-white rounded-tr-none"
                    : message.sender === "ai"
                      ? "bg-gray-200 text-gray-800 rounded-tl-none"
                      : "bg-purple-100 text-gray-800 rounded-tl-none"
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-2 items-center">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
            className="rounded-full"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="rounded-full bg-orange-500 hover:bg-orange-600"
            size="icon"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

