'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [letters, setLetters] = useState<Array<{ char: string, delay: number }>>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const titles = [
      'de', 'beskjeggede', 'blåskjellets', 'orden', 'oransje', 'blått', 'og sort',
      'vær ekte', '(si det,', 'gjør det)',
      'vær smud', '(sort belte', 'i gode', 'vibber)',
      'vær åpen', '(for det', 'ukjente)',
      'Ta giften i', 'ditt nærvær', 'og gjør den', 'om til mat.',
      'ta det', 'rolig,', 'ta inn', 'havet,', 'åpne og', 'lukke.'
    ]

    const getNextTitle = () => {
      const currentIndex = parseInt(localStorage.getItem('titleIndex') || '0')
      const nextIndex = (currentIndex + 1) % titles.length
      localStorage.setItem('titleIndex', nextIndex.toString())
      return titles[currentIndex]
    }

    const randomTitle = getNextTitle()
    setTitle(randomTitle)

    const newLetters = randomTitle.split('').map(char => ({
      char,
      delay: Math.random() * 0.2
    }))
    setLetters(newLetters)
  }, [])

  return (
    <header className="bg-white">
      <div className="container mx-auto px-0 pt-0 pb-2 md:pb-6 relative">
        <h1 className="text-[5rem] md:text-[10rem] lg:text-[15rem] font-bold text-center leading-none relative h-[4rem] md:h-[8rem] lg:h-[12rem] pointer-events-none" aria-label={title}>
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block text-black absolute select-none"
              style={{
                left: `${(index / letters.length) * 100}%`,
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
                className={`text-sm md:text-xl lg:text-2xl font-black ${activeTab === tab ? 'text-black' : 'text-gray-600 hover:text-black'}`}
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