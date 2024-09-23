'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [letters, setLetters] = useState<Array<{ char: string, delay: number }>>([])

  useEffect(() => {
    const title = 'blåskjell'
    const newLetters = title.split('').map(char => ({
      char,
      delay: Math.random() * 0.3 // Random delay between 0 and 0.3 seconds
    }))
    setLetters(newLetters)
  }, [])

  return (
    <header className="bg-white">
      <div className="container mx-auto px-0 pt-0 pb-2 md:pb-10 relative">
        <h1 className="text-[5rem] md:text-[14rem] lg:text-[25rem] font-bold text-center leading-none relative h-[4rem] md:h-[10rem] pointer-events-none" aria-label="blåskjell">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block text-black absolute select-none"
              style={{
                left: `${(index / letters.length) * 90}%`,
                animation: `fall 0.2s ease-in-out ${letter.delay}s forwards`,
                opacity: 0,
              }}
              aria-hidden="true"
            >
              {letter.char}
            </span>
          ))}
        </h1>
      </div>
      <div className="border-t-2 border-b-2 border-black relative z-10">
        <div className="container mx-auto px-4 py-2">
          <nav className="flex justify-end space-x-6">
            {['avløsning', 'fjære', 'bølgesus'].map((tab) => (
              <Link 
                key={tab}
                href="#" 
                className={`text-sm md:text-2xl font-black ${activeTab === tab ? 'text-black' : 'text-gray-600 hover:text-black'}`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab(tab)
                }}
              >
                {tab}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}