import React, { useState } from 'react'
import { Wifi } from 'lucide-react'

interface WiFiNetwork {
  id: number
  name: string
  strength: number
}

const networks: WiFiNetwork[] = [
  { id: 1, name: 'Home Network', strength: 4 },
  { id: 2, name: 'Office WiFi', strength: 3 },
  { id: 3, name: 'Cafe Hotspot', strength: 2 },
  { id: 4, name: 'Library Free WiFi', strength: 4 },
  { id: 5, name: 'Neighbor\'s Network', strength: 1 },
  { id: 6, name: 'Public Park WiFi', strength: 2 },
  { id: 7, name: 'Hotel Guest Network', strength: 3 },
]

export default function WiFiNetworks() {
  const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleConnect = (network: WiFiNetwork) => {
    setSelectedNetwork(network)
    setShowPassword(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the connection logic
    alert(`Connecting to ${selectedNetwork?.name} with password: ${password}`)
    setShowPassword(false)
    setPassword('')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64">
      <h2 className="text-lg font-bold mb-4">WiFi Networks</h2>
      <ul className="space-y-2">
        {networks.map((network) => (
          <li key={network.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <Wifi size={16} className="mr-2" />
              <span>{network.name}</span>
            </div>
            <button
              onClick={() => handleConnect(network)}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Connect
            </button>
          </li>
        ))}
      </ul>
      {showPassword && (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter WiFi password"
            className="w-full px-2 py-1 border rounded"
          />
          <button type="submit" className="mt-2 w-full px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
            Connect
          </button>
        </form>
      )}
    </div>
  )
}

