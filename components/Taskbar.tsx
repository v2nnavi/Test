import React from 'react'
import Image from 'next/image'
import { Wifi } from 'lucide-react'

interface TaskbarProps {
  toggleStartMenu: () => void
  openWindows: string[]
  activeWindow: string | null
  setActiveWindow: (window: string) => void
  toggleWifi: () => void // Added toggleWifi function
  children: React.ReactNode
}

export default function Taskbar({ toggleStartMenu, openWindows, activeWindow, setActiveWindow, toggleWifi, children }: TaskbarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-[#245edb] via-[#3db2ff] to-[#245edb] flex items-center px-1 space-x-1">
      <button
        className="flex items-center space-x-1 px-2 py-1 rounded-l-full rounded-r-full bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 focus:outline-none"
        onClick={toggleStartMenu}
      >
        <Image src="/placeholder.svg?height=16&width=16" width={16} height={16} alt="Start" />
        <span className="font-bold">Start</span>
      </button>
      <div className="h-full w-px bg-[#0947b1] mx-1"></div>
      {openWindows.map(window => (
        <button
          key={window}
          className={`px-2 py-1 text-sm rounded-t-sm ${
            activeWindow === window
              ? 'bg-gradient-to-b from-[#fff] to-[#dae4f0] text-black'
              : 'bg-gradient-to-b from-[#6ba6e8] to-[#3d85d5] text-white'
          } hover:bg-[#DFDFDF] focus:outline-none flex-shrink-0 max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap`}
          onClick={() => setActiveWindow(window)}
        >
          <Image src="/placeholder.svg?height=16&width=16" width={16} height={16} alt={window} className="inline mr-1" />
          {window}
        </button>
      ))}
      <div className="flex-grow" />
      {children}
      <button
        className="flex items-center space-x-2 px-2 py-1 hover:bg-[#3d85d5] text-white rounded-sm"
        onClick={toggleWifi}
      >
        <Wifi size={16} />
      </button>
    </div>
  )
}

