'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [letters, setLetters] = useState<Array<{ char: string, delay: number }>>([])

  useEffect(() => {
    const title = 'mussled'
    const newLetters = title.split('').map(char => ({
      char,
      delay: Math.random() * 0.5 // Random delay between 0 and 0.5 seconds
    }))
    setLetters(newLetters)
  }, [])

  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 pt--20 -mx-4 pb-10 relative">
        <h1 className="text-[6rem] md:text-[14rem] lg:text-[25rem] font-bold text-center leading-none relative h-[20rem] pointer-events-none" aria-label="mussled">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block text-black absolute select-none"
              style={{
                left: `${(index / letters.length) * 100}%`,
                animation: `fall 0.5s ease-in-out ${letter.delay}s forwards`,
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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mb-2 md:mb-0 w-full md:w-auto">
              {['avløsning', 'fjære', 'bølgesus'].map((tab) => (
                <Link 
                  key={tab}
                  href="#" 
                  className={`text-2xl font-black w-full md:w-auto text-center md:text-left ${activeTab === tab ? 'text-black' : 'text-gray-600 hover:text-black'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveTab(tab)
                  }}
                >
                  {tab}
                </Link>
              ))}
            </nav>
            <div className="flex items-center w-full md:w-auto">
              <Input
                type="search"
                placeholder="Search"
                className="w-full md:w-64 border-black focus:ring-black focus:border-black"
              />
              <Button size="icon" variant="outline" className="border-black hover:bg-gray-100">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}