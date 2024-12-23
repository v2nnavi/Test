import React, { useState } from 'react'
import { Search, ChevronLeft, ChevronRight, RotateCcw, Home } from 'lucide-react'

export default function InternetExplorer() {
  const [url, setUrl] = useState('https://www.example.com')

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#F1F3F6] p-2 flex items-center space-x-2">
        <button className="p-1 hover:bg-gray-200 rounded"><ChevronLeft size={16} /></button>
        <button className="p-1 hover:bg-gray-200 rounded"><ChevronRight size={16} /></button>
        <button className="p-1 hover:bg-gray-200 rounded"><RotateCcw size={16} /></button>
        <button className="p-1 hover:bg-gray-200 rounded"><Home size={16} /></button>
        <div className="flex-grow flex items-center bg-white border rounded px-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-grow outline-none text-sm"
          />
          <button className="ml-2"><Search size={16} /></button>
        </div>
      </div>
      <div className="flex-grow bg-white p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Welcome to Internet Explorer</h1>
        <p>This is a simulated webpage. In a real implementation, this would display the actual web content.</p>
      </div>
    </div>
  )
}

