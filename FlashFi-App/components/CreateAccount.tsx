'use client'

import { Bell, Info, Wallet } from 'lucide-react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Component() {
  const [accountName, setAccountName] = useState('')
  const [selectedNetwork, setSelectedNetwork] = useState('')
  const walletAddress = '0xF23L.C58E' // This would come from your wallet connection

  const networks = [
    { id: 'ethereum', name: 'Ethereum', icon: '🌐' },
    { id: 'polygon', name: 'Polygon', icon: '⬡' },
    { id: 'arbitrum', name: 'Arbitrum', icon: '🔷' },
    { id: 'optimism', name: 'Optimism', icon: '🔴' },
    { id: 'sepolia', name: 'Sepolia', icon: '🔮' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <header className="container mx-auto flex justify-between items-center mb-8">
        <div className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
          FlashFi
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-gray-400" />
          </Button>
          <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2">
            <Wallet className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-gray-300">{walletAddress}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h1 className="text-2xl font-bold text-white mb-6">Create new Flash Account</h1>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-gray-900 font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-white">Set up the basics</h2>
                    <p className="text-gray-400 text-sm mb-4">
                      Give a name to your account and select which networks to deploy it on.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-300">Name</Label>
                        <div className="relative">
                          <Input
                            id="name"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className="bg-gray-900 border-gray-700 text-white mt-1"
                            placeholder="Enter account name"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                          >
                            <Info className="h-4 w-4 text-gray-400" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-gray-300">Select Networks</Label>
                        <p className="text-sm text-gray-400 mb-2">
                          Choose which networks you want your account to be active on. You can add more networks later.
                        </p>
                        <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                          <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white">
                            <SelectValue placeholder="Select network" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {networks.map((network) => (
                              <SelectItem
                                key={network.id}
                                value={network.id}
                                className="text-white hover:bg-gray-700"
                              >
                                <div className="flex items-center space-x-2">
                                  <span>{network.icon}</span>
                                  <span>{network.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <p className="text-sm text-gray-400">
                        By continuing, you agree to our{' '}
                        <a href="#" className="text-yellow-400 hover:underline">terms of use</a>
                        {' '}and{' '}
                        <a href="#" className="text-yellow-400 hover:underline">privacy policy</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10">
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:from-yellow-500 hover:to-orange-600">
                  Next
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
                    <h2 className="text-lg font-semibold text-white">Your Flash Account preview</h2>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Wallet</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />
                      <span className="text-white">{walletAddress}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}