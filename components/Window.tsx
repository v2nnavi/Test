import React, { useState, useEffect } from 'react'
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react'
import Image from 'next/image'
import InternetExplorer from './InternetExplorer'
import Discord from './Discord'
import FlappyBird from './FlappyBird'

interface WindowProps {
  title: string
  isActive: boolean
  onClose: () => void
  onFocus: () => void
}

export default function Window({ title, isActive, onClose, onFocus }: WindowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMaximized, setIsMaximized] = useState(false)
  const [size, setSize] = useState({ width: 640, height: 480 })

  useEffect(() => {
    const centerWindow = () => {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      setPosition({
        x: (windowWidth - size.width) / 2,
        y: (windowHeight - size.height) / 2,
      })
    }

    centerWindow()
    window.addEventListener('resize', centerWindow)
    return () => window.removeEventListener('resize', centerWindow)
  }, [size])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return
    const startX = e.clientX - position.x
    const startY = e.clientY - position.y

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY,
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }, { once: true })
  }

  const toggleMaximize = () => {
    if (isMaximized) {
      setIsMaximized(false)
      setSize({ width: 640, height: 480 })
    } else {
      setIsMaximized(true)
      setSize({ width: window.innerWidth, height: window.innerHeight - 40 }) // Subtract taskbar height
    }
  }

  return (
    <div
      className={`absolute bg-[#ECE9D8] shadow-lg overflow-hidden rounded-t-lg ${isActive ? 'z-10' : 'z-0'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
      onClick={onFocus}
    >
      <div
        className={`flex justify-between items-center px-2 py-1 ${
          isActive
            ? 'bg-gradient-to-r from-[#0A246A] via-[#3A6EA5] to-[#0A246A] text-white'
            : 'bg-gradient-to-r from-[#7BA2E7] via-[#9DB9EB] to-[#7BA2E7] text-gray-700'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          <Image src="/placeholder.svg?height=16&width=16" width={16} height={16} alt={title} />
          <span className="text-sm font-bold">{title}</span>
        </div>
        <div className="flex space-x-1">
          <button className="focus:outline-none hover:bg-[#E81123] hover:text-white rounded-sm">
            <Minus size={16} />
          </button>
          <button className="focus:outline-none hover:bg-[#E81123] hover:text-white rounded-sm" onClick={toggleMaximize}>
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button className="focus:outline-none hover:bg-[#E81123] hover:text-white rounded-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="border-t-4 border-[#0A246A]"></div>
      <div className="h-[calc(100%-28px)] overflow-auto flex items-center justify-center">
        {title === 'Internet Explorer' && <InternetExplorer />}
        {title === 'Discord' && <Discord />}
        {title === 'Flappy Bird' && <FlappyBird />}
        {!['Internet Explorer', 'Discord', 'Flappy Bird'].includes(title) && (
          <div className="p-4">
            <p>Content for {title}</p>
          </div>
        )}
      </div>
    </div>
  )
}

