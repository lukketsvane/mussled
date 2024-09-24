'use client'

import React, { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Avlosning } from '@/components/avlosning'
import { Fjare } from '@/components/fjare'
import Exlibris from '@/components/exlibris'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [activeTab, setActiveTab] = useState('avløsning')

  const renderContent = () => {
    console.log('Rendering content for tab:', activeTab)
    switch (activeTab) {
      case 'avløsning':
        return <Avlosning />
      case 'fjære':
        return <Fjare />
      case 'exlibris':
        return <Exlibris />
      default:
        return <div>No content available</div>
    }
  }

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow container ">
        {renderContent()}
      </main>
      <Footer />
    </>
  )
}