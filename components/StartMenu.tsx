import React from 'react'
import Image from 'next/image'

interface StartMenuProps {
  openWindow: (appName: string) => void
  onLogout: () => void
  onShutdown: () => void
}

const MenuItem: React.FC<{ iconSrc: string; label: string; onClick: () => void }> = ({ iconSrc, label, onClick }) => (
  <div className="flex items-center space-x-2 px-4 py-2 hover:bg-[#2F71CD] hover:text-white cursor-pointer" onClick={onClick}>
    <Image src={iconSrc} width={24} height={24} alt={label} />
    <span>{label}</span>
  </div>
)

export default function StartMenu({ openWindow, onLogout, onShutdown }: StartMenuProps) {
  return (
    <div className="absolute bottom-10 left-0 w-80 bg-[#D3E5FA] text-black shadow-lg rounded-tr-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-[#1D4F9A] to-[#3C81DA] text-white h-20 flex items-end">
        <Image src="/placeholder.svg?height=48&width=48" width={48} height={48} alt="User" className="rounded-full mr-4" />
        <span className="font-bold text-lg">User</span>
      </div>
      <div className="flex">
        <div className="w-3/5 py-2">
          <MenuItem iconSrc="/placeholder.svg?height=24&width=24" label="Internet Explorer" onClick={() => openWindow('Internet Explorer')} />
          <MenuItem iconSrc="/placeholder.svg?height=24&width=24" label="Discord" onClick={() => openWindow('Discord')} />
          <MenuItem iconSrc="/placeholder.svg?height=24&width=24" label="Windows Media Player" onClick={() => openWindow('Windows Media Player')} />
          <div className="border-t border-gray-300 my-2"></div>
          <MenuItem iconSrc="/placeholder.svg?height=24&width=24" label="Control Panel" onClick={() => openWindow('Control Panel')} />
          <MenuItem iconSrc="/placeholder.svg?height=24&width=24" label="Help and Support" onClick={() => openWindow('Help and Support')} />
        </div>
        <div className="w-2/5 bg-[#B6D7F3] py-2">
          <MenuItem iconSrc="/placeholder.svg?height=24&width=24" label="My Documents" onClick={() => openWindow('My Documents')} />
          <MenuItem iconSrc="/placeholder.svg?height=24&width=24" label="My Pictures" onClick={() => openWindow('My Pictures')} />
          <MenuItem iconSrc="/placeholder.svg?height=24&width=24" label="My Music" onClick={() => openWindow('My Music')} />
          <MenuItem iconSrc="/placeholder.svg?height=24&width=24" label="My Computer" onClick={() => openWindow('My Computer')} />
        </div>
      </div>
      <div className="bg-[#B6D7F3] p-2 flex items-center justify-end space-x-2">
        <button className="flex items-center space-x-2 px-4 py-1 bg-[#D3E5FA] hover:bg-[#E3F0FD] rounded-sm" onClick={onLogout}>
          <Image src="/placeholder.svg?height=16&width=16" width={16} height={16} alt="Log Off" />
          <span>Log Off</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-1 bg-[#D3E5FA] hover:bg-[#E3F0FD] rounded-sm" onClick={onShutdown}>
          <Image src="/placeholder.svg?height=16&width=16" width={16} height={16} alt="Shut Down" />
          <span>Shut Down</span>
        </button>
      </div>
    </div>
  )
}

