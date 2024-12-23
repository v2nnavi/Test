import React, { useState } from 'react'
import Image from 'next/image'

interface SignInScreenProps {
  onSignIn: () => void
}

export default function SignInScreen({ onSignIn }: SignInScreenProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '1234') {  // Simple password for demonstration
      onSignIn()
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  return (
    <div 
      className="h-screen w-full bg-gradient-to-b from-[#235cdc] to-[#78b3f1] flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('https://i.imgur.com/Zk6TR5k.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-white/80 p-8 rounded-lg shadow-lg backdrop-blur-sm">
        <Image src="/placeholder.svg?height=64&width=64" width={64} height={64} alt="User Avatar" className="mx-auto mb-4 rounded-full" />
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block mb-1">Password:</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-[#0078d4] text-white py-2 rounded hover:bg-[#006cbd] transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

