"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  BarChart3,
  Bell,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Search,
  Settings,
  Store,
  Users,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
                src="/logo.jpeg?height=40&width=40"
                alt="College Crave Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h2 className="font-bold">College Crave</h2>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto md:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/admin" className="flex items-center gap-3 p-2 rounded-lg bg-orange-50 text-orange-500">
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/vendors" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                  <Store className="h-5 w-5" />
                  <span>Vendors</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/users" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                  <Users className="h-5 w-5" />
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/orders" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                  <Package className="h-5 w-5" />
                  <span>Orders</span>
                  <Badge className="ml-auto">12</Badge>
                </Link>
              </li>
              <li>
                <Link href="/admin/analytics" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/messages" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                  <MessageSquare className="h-5 w-5" />
                  <span>Messages</span>
                  <Badge className="ml-auto">5</Badge>
                </Link>
              </li>
              <li>
                <Link href="/admin/settings" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
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
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">8</Badge>
            </Button>
            <div className="flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Admin"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-medium hidden md:inline">Admin User</span>
            </div>
          </div>
        </header>

        <main className="p-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <h3 className="text-2xl font-bold">2,845</h3>
                    <p className="text-xs text-green-500">+12% from last month</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Vendors</p>
                    <h3 className="text-2xl font-bold">124</h3>
                    <p className="text-xs text-green-500">+5% from last month</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Store className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <h3 className="text-2xl font-bold">12,543</h3>
                    <p className="text-xs text-green-500">+18% from last month</p>
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
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold">$84,254</h3>
                    <p className="text-xs text-green-500">+15% from last month</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="orders">
                <TabsList className="mb-4">
                  <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                  <TabsTrigger value="users">New Users</TabsTrigger>
                  <TabsTrigger value="vendors">Vendor Updates</TabsTrigger>
                </TabsList>

                <TabsContent value="orders" className="space-y-4">
                  {[
                    {
                      id: "ORD-1234",
                      user: "Alex Johnson",
                      vendor: "Burger Joint",
                      total: 28.97,
                      status: "Completed",
                      time: "5 min ago",
                    },
                    {
                      id: "ORD-1235",
                      user: "Sarah Williams",
                      vendor: "Pizza Palace",
                      total: 19.98,
                      status: "Preparing",
                      time: "12 min ago",
                    },
                    {
                      id: "ORD-1236",
                      user: "Michael Brown",
                      vendor: "Taco Town",
                      total: 42.96,
                      status: "Delivered",
                      time: "15 min ago",
                    },
                    {
                      id: "ORD-1237",
                      user: "Emily Davis",
                      vendor: "Sushi Spot",
                      total: 32.99,
                      status: "Ordered",
                      time: "20 min ago",
                    },
                    {
                      id: "ORD-1238",
                      user: "David Wilson",
                      vendor: "Thai Delight",
                      total: 24.98,
                      status: "Completed",
                      time: "25 min ago",
                    },
                  ].map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between p-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold">{order.id}</h3>
                              <Badge
                                className={`
                                ${order.status === "Completed" ? "bg-green-100 text-green-500" : ""}
                                ${order.status === "Preparing" ? "bg-blue-100 text-blue-500" : ""}
                                ${order.status === "Delivered" ? "bg-purple-100 text-purple-500" : ""}
                                ${order.status === "Ordered" ? "bg-orange-100 text-orange-500" : ""}
                              `}
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {order.user} • {order.vendor} • ${order.total.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-400">{order.time}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="users">
                  <div className="space-y-4">
                    {[
                      { id: 1, name: "Jessica Thompson", email: "jessica@example.com", joined: "Today", orders: 0 },
                      { id: 2, name: "Ryan Martinez", email: "ryan@example.com", joined: "Yesterday", orders: 1 },
                      { id: 3, name: "Olivia Parker", email: "olivia@example.com", joined: "2 days ago", orders: 2 },
                    ].map((user) => (
                      <Card key={user.id}>
                        <CardContent className="p-4 flex items-center gap-4">
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt={user.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{user.name}</h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <p className="text-xs text-gray-400">
                              Joined: {user.joined} • Orders: {user.orders}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="vendors">
                  <div className="space-y-4">
                    {[
                      { id: 1, name: "Noodle House", status: "New Application", time: "2 hours ago" },
                      { id: 2, name: "Burger Joint", status: "Menu Updated", time: "5 hours ago" },
                      { id: 3, name: "Pizza Palace", status: "Hours Updated", time: "Yesterday" },
                    ].map((vendor) => (
                      <Card key={vendor.id}>
                        <CardContent className="p-4 flex items-center gap-4">
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt={vendor.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{vendor.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={`
                                ${vendor.status === "New Application" ? "bg-blue-100 text-blue-500" : ""}
                                ${vendor.status === "Menu Updated" ? "bg-green-100 text-green-500" : ""}
                                ${vendor.status === "Hours Updated" ? "bg-purple-100 text-purple-500" : ""}
                              `}
                              >
                                {vendor.status}
                              </Badge>
                              <span className="text-xs text-gray-400">{vendor.time}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
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

