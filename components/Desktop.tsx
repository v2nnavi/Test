import React from 'react'
import Image from 'next/image'

interface DesktopProps {
  openWindow: (appName: string) => void
}

const DesktopIcon: React.FC<{ iconSrc: string; label: string; onClick: () => void }> = ({ iconSrc, label, onClick }) => (
  <div className="flex flex-col items-center mb-4 cursor-pointer group" onClick={onClick}>
    <div className="bg-transparent p-1 rounded-lg mb-1 group-hover:bg-blue-300 group-hover:bg-opacity-30">
      <Image src={iconSrc} width={32} height={32} alt={label} />
    </div>
    <span className="text-white text-xs text-center px-1 bg-transparent group-hover:bg-blue-800">{label}</span>
  </div>
)

export default function Desktop({ openWindow }: DesktopProps) {
  return (
    <div className="p-4 grid grid-cols-1 gap-4 w-40">
      <DesktopIcon iconSrc="/placeholder.svg?height=32&width=32" label="My Documents" onClick={() => openWindow('My Documents')} />
      <DesktopIcon iconSrc="/placeholder.svg?height=32&width=32" label="My Computer" onClick={() => openWindow('My Computer')} />
      <DesktopIcon iconSrc="/placeholder.svg?height=32&width=32" label="Recycle Bin" onClick={() => openWindow('Recycle Bin')} />
      <DesktopIcon iconSrc="/placeholder.svg?height=32&width=32" label="Internet Explorer" onClick={() => openWindow('Internet Explorer')} />
      <DesktopIcon iconSrc="/placeholder.svg?height=32&width=32" label="Discord" onClick={() => openWindow('Discord')} />
      <DesktopIcon iconSrc="/placeholder.svg?height=32&width=32" label="Flappy Bird" onClick={() => openWindow('Flappy Bird')} />
    </div>
  )
}

