'use client'

import React, { useState, useEffect } from 'react'
import { Clock, Wifi } from 'lucide-react'
import Desktop from './components/Desktop'
import Taskbar from './components/Taskbar'
import StartMenu from './components/StartMenu'
import Window from './components/Window'
import BootScreen from './components/BootScreen'
import SignInScreen from './components/SignInScreen'
import WiFiNetworks from './components/WiFiNetworks'
import Discord from './components/Discord'

export default function WindowsXPClone() {
  const [bootComplete, setBootComplete] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isWifiOpen, setIsWifiOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleStartMenu = () => setIsStartMenuOpen(!isStartMenuOpen)

  const openWindow = (appName: string) => {
    if (!openWindows.includes(appName)) {
      setOpenWindows([...openWindows, appName])
    }
    setActiveWindow(appName)
    setIsStartMenuOpen(false)
  }

  const closeWindow = (appName: string) => {
    setOpenWindows(openWindows.filter(window => window !== appName))
    if (activeWindow === appName) {
      setActiveWindow(null)
    }
  }

  const handleLogout = () => {
    setIsSignedIn(false)
    setOpenWindows([])
    setActiveWindow(null)
    setIsStartMenuOpen(false)
  }

  const handleShutdown = () => {
    setBootComplete(false)
    setIsSignedIn(false)
    setOpenWindows([])
    setActiveWindow(null)
    setIsStartMenuOpen(false)
  }

  if (!bootComplete) {
    return <BootScreen onBootComplete={() => setBootComplete(true)} />
  }

  if (!isSignedIn) {
    return <SignInScreen onSignIn={() => setIsSignedIn(true)} />
  }

  return (
    <div className="h-screen w-full overflow-hidden relative font-sans text-sm"
         style={{
           backgroundImage: "url('https://i.imgur.com/Zk6TR5k.jpg')",
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}>
      <style jsx global>{`
        * {
          cursor: default;
        }
      `}</style>
      <Desktop openWindow={openWindow} />
      {openWindows.map(window => (
        <Window
          key={window}
          title={window}
          isActive={activeWindow === window}
          onClose={() => closeWindow(window)}
          onFocus={() => setActiveWindow(window)}
        />
      ))}
      <Taskbar
        toggleStartMenu={toggleStartMenu}
        openWindows={openWindows}
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
        toggleWifi={() => setIsWifiOpen(!isWifiOpen)}
      >
        <div className="flex items-center space-x-2 px-2 py-1 bg-[#0055EA] text-white rounded-sm">
          <Clock size={16} />
          <span className="text-xs">{currentTime.toLocaleTimeString()}</span>
        </div>
      </Taskbar>
      {isWifiOpen && (
        <div className="absolute bottom-10 right-0 mb-2">
          <WiFiNetworks />
        </div>
      )}
      {isStartMenuOpen && (
        <StartMenu
          openWindow={openWindow}
          onLogout={handleLogout}
          onShutdown={handleShutdown}
        />
      )}
    </div>
  )
}

