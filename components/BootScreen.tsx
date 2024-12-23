import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface BootScreenProps {
  onBootComplete: () => void
}

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          onBootComplete()
          return 100
        }
        return prevProgress + 10
      })
    }, 500)

    return () => clearInterval(timer)
  }, [onBootComplete])

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center">
      <Image src="/placeholder.svg?height=200&width=200" width={200} height={200} alt="Windows XP Logo" className="mb-8" />
      <div className="w-64 h-4 bg-[#315a94] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#65b1f3] transition-all duration-500 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-white mt-4">Starting Windows...</p>
    </div>
  )
}

