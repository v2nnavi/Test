import React, { useState } from 'react'
import { Hash, Settings, Plus, Mic, Headphones, User } from 'lucide-react'
import Image from 'next/image'

const channels = ['general', 'memes', 'announcements', 'project-information', 'tokenomics']
const users = ['User1', 'User2', 'User3', 'User4', 'User5']

interface Message {
  id: number
  user: string
  content: string
  timestamp: string
  image?: string
}

const channelContent: { [key: string]: Message[] } = {
  general: [
    { id: 1, user: 'Me', content: 'Boi ayos ba?', timestamp: '2:30 PM' },
    { id: 2, user: 'Myself', content: 'Sabi mo exciting diba?', timestamp: '2:31 PM' },
    { id: 3, user: 'And Ivann', content: 'WHAHAHAHAHAHA', timestamp: '2:32 PM' },
  ],
  memes: [
    { id: 1, user: 'User4', content: 'Check out this meme!', timestamp: '3:15 PM', image: '/placeholder.svg?height=200&width=200' },
    { id: 2, user: 'User5', content: 'LOL, good one!', timestamp: '3:16 PM' },
    { id: 3, user: 'User1', content: 'Here\'s another one', timestamp: '3:20 PM', image: '/placeholder.svg?height=200&width=200' },
  ],
  announcements: [
    { id: 1, user: 'Admin', content: 'Important: New feature release tomorrow!', timestamp: '10:00 AM' },
    { id: 2, user: 'Admin', content: 'Reminder: Community meeting this Friday', timestamp: '11:30 AM' },
  ],
  'project-information': [
    { id: 1, user: 'ProjectLead', content: 'Current sprint goals: Implement user authentication and dashboard', timestamp: '9:00 AM' },
    { id: 2, user: 'Developer1', content: 'Backend API documentation updated. Check the wiki for details.', timestamp: '2:45 PM' },
  ],
  tokenomics: [
    { id: 1, user: 'TokenExpert', content: 'Token distribution: 40% Public Sale, 30% Team, 20% Marketing, 10% Reserve', timestamp: '1:00 PM' },
    { id: 2, user: 'User3', content: 'When is the next token burn scheduled?', timestamp: '1:15 PM' },
    { id: 3, user: 'TokenExpert', content: 'Next token burn is planned for Q3 2023. Stay tuned for exact date.', timestamp: '1:20 PM' },
  ],
}

export default function Discord() {
  const [selectedChannel, setSelectedChannel] = useState('general')
  const [message, setMessage] = useState('')

  const addMessage = (content: string) => {
    const newMessage: Message = {
      id: channelContent[selectedChannel].length + 1,
      user: 'You',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    channelContent[selectedChannel] = [...channelContent[selectedChannel], newMessage]
    setMessage('')
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      addMessage(message)
    }
  }

  return (
    <div className="flex h-full text-white bg-[#36393f]">
      <div className="w-16 bg-[#202225] p-3 flex flex-col items-center">
        <div className="w-12 h-12 bg-[#36393f] rounded-full mb-4"></div>
        <div className="w-12 h-12 bg-[#36393f] rounded-full mb-4"></div>
        <div className="w-12 h-12 bg-[#5865F2] rounded-full flex items-center justify-center text-2xl font-bold">+</div>
      </div>
      <div className="w-60 bg-[#2f3136] p-3">
        <h2 className="text-xl font-bold mb-4">Discord Server</h2>
        <div className="mb-4">
          <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2">Text Channels</h3>
          {channels.map(channel => (
            <div
              key={channel}
              className={`flex items-center mb-2 cursor-pointer ${selectedChannel === channel ? 'text-white' : 'text-gray-400'}`}
              onClick={() => setSelectedChannel(channel)}
            >
              <Hash size={20} className="mr-2" />
              {channel}
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2">Voice Channels</h3>
          <div className="flex items-center text-gray-400 mb-2">
            <Mic size={20} className="mr-2" />
            General
          </div>
        </div>
      </div>
      <div className="flex-grow flex flex-col">
        <div className="h-12 border-b border-gray-800 flex items-center px-4">
          <Hash size={24} className="mr-2 text-gray-400" />
          <span className="font-bold">{selectedChannel}</span>
        </div>
        <div className="flex-grow p-4 overflow-auto">
          {channelContent[selectedChannel].map((msg) => (
            <div key={msg.id} className="mb-4">
              <div className="flex items-center mb-1">
                <span className="font-bold mr-2">{msg.user}</span>
                <span className="text-xs text-gray-400">{msg.timestamp}</span>
              </div>
              <p>{msg.content}</p>
              {msg.image && (
                <div className="mt-2">
                  <Image src={msg.image} width={200} height={200} alt="Meme" className="rounded-md" />
                </div>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="h-16 px-4 flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message #${selectedChannel}`}
            className="flex-grow bg-[#40444b] text-white rounded-md px-4 py-2 focus:outline-none"
          />
        </form>
      </div>
      <div className="w-60 bg-[#2f3136] p-3">
        <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2">Online - {users.length}</h3>
        {users.map(user => (
          <div key={user} className="flex items-center mb-2 text-gray-400">
            <User size={20} className="mr-2" />
            {user}
          </div>
        ))}
      </div>
      <div className="h-14 bg-[#292b2f] absolute bottom-0 left-16 right-0 flex items-center px-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#36393f] rounded-full mr-2"></div>
          <div>
            <div className="font-semibold">Username</div>
            <div className="text-xs text-gray-400">#1234</div>
          </div>
        </div>
        <div className="ml-auto flex space-x-4">
          <Mic size={20} />
          <Headphones size={20} />
          <Settings size={20} />
        </div>
      </div>
    </div>
  )
}

