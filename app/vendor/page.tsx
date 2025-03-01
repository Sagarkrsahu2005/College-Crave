"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BarChart3, Clock, Home, LogOut, Menu, MessageSquare, Package, Settings, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function VendorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock data for orders
  const newOrders = [
    { id: "ORD-1234", customer: "Alex Johnson", items: 3, total: 28.97, time: "5 min ago" },
    { id: "ORD-1235", customer: "Sarah Williams", items: 2, total: 19.98, time: "12 min ago" },
  ]

  const preparingOrders = [
    { id: "ORD-1230", customer: "Michael Brown", items: 4, total: 42.96, time: "15 min ago" },
    { id: "ORD-1231", customer: "Emily Davis", items: 1, total: 12.99, time: "20 min ago" },
  ]

  const readyOrders = [{ id: "ORD-1228", customer: "David Wilson", items: 2, total: 24.98, time: "25 min ago" }]

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0
      `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Restaurant Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h2 className="font-bold">Burger Joint</h2>
                <p className="text-xs text-green-500">Online</p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto md:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/vendor" className="flex items-center gap-3 p-2 rounded-lg bg-orange-50 text-orange-500">
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/vendor/orders" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                  <Package className="h-5 w-5" />
                  <span>Orders</span>
                  <Badge className="ml-auto">5</Badge>
                </Link>
              </li>
              <li>
                <Link href="/vendor/menu" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                  <Menu className="h-5 w-5" />
                  <span>Menu Items</span>
                </Link>
              </li>
              <li>
                <Link href="/vendor/analytics" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
                </Link>
              </li>
              <li>
                <Link href="/vendor/messages" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                  <MessageSquare className="h-5 w-5" />
                  <span>Messages</span>
                  <Badge className="ml-auto">3</Badge>
                </Link>
              </li>
              <li>
                <Link href="/vendor/settings" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t">
            <Link href="/logout" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-red-500">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-white p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Vendor Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="p-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Today's Orders</p>
                    <h3 className="text-2xl font-bold">24</h3>
                    <p className="text-xs text-green-500">+12% from yesterday</p>
                  </div>
                  <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Package className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Today's Revenue</p>
                    <h3 className="text-2xl font-bold">$342.50</h3>
                    <p className="text-xs text-green-500">+8% from yesterday</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Avg. Prep Time</p>
                    <h3 className="text-2xl font-bold">18 min</h3>
                    <p className="text-xs text-red-500">+2 min from yesterday</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Customer Rating</p>
                    <h3 className="text-2xl font-bold">4.8/5</h3>
                    <p className="text-xs text-green-500">+0.2 from last week</p>
                  </div>
                  <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Tabs */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Orders Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="new">
                <TabsList className="mb-4">
                  <TabsTrigger value="new">
                    New Orders
                    <Badge className="ml-2 bg-orange-500">{newOrders.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="preparing">
                    Preparing
                    <Badge className="ml-2 bg-blue-500">{preparingOrders.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="ready">
                    Ready
                    <Badge className="ml-2 bg-green-500">{readyOrders.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="new" className="space-y-4">
                  {newOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between p-4 border-l-4 border-orange-500">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold">{order.id}</h3>
                              <Badge className="bg-orange-100 text-orange-500">New</Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {order.customer} • {order.items} items • ${order.total.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-400">{order.time}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Reject
                            </Button>
                            <Button className="bg-orange-500 hover:bg-orange-600" size="sm">
                              Accept
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="preparing" className="space-y-4">
                  {preparingOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between p-4 border-l-4 border-blue-500">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold">{order.id}</h3>
                              <Badge className="bg-blue-100 text-blue-500">Preparing</Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {order.customer} • {order.items} items • ${order.total.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-400">{order.time}</p>
                          </div>
                          <div>
                            <Button className="bg-green-500 hover:bg-green-600" size="sm">
                              Mark Ready
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="ready" className="space-y-4">
                  {readyOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between p-4 border-l-4 border-green-500">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold">{order.id}</h3>
                              <Badge className="bg-green-100 text-green-500">Ready</Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {order.customer} • {order.items} items • ${order.total.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-400">{order.time}</p>
                          </div>
                          <div>
                            <Button className="bg-purple-500 hover:bg-purple-600" size="sm">
                              Complete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="completed">
                  <div className="text-center py-8 text-gray-500">
                    <p>No completed orders for today yet.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

