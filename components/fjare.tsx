'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Badge from './3d-badge'

interface ImageFile {
  name: string
  path: string
}

export function Fjare() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)

  useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch('/api/images')
        if (!response.ok) {
          throw new Error('Failed to fetch images')
        }
        const imageFiles: ImageFile[] = await response.json()
        setImages(imageFiles)
      } catch (error) {
        console.error('Error loading images:', error)
        setError('Failed to load images. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    loadImages()
  }, [])

  const handleImageClick = (image: ImageFile) => {
    setSelectedImage(image)
  }

  const handleCloseBadge = () => {
    setSelectedImage(null)
  }

  if (isLoading) {
    return <div className="text-center py-10"></div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }

  if (images.length === 0) {
    return <div className="text-center py-10"></div>
  }

  if (selectedImage) {
    return <Badge onClose={handleCloseBadge} selectedImage={{ id: selectedImage.name, name: selectedImage.name, src: selectedImage.path }} />
  }

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-16 gap-2 p-2">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="relative aspect-[3/4] bg-gray-100 p-2 cursor-move"
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          whileDrag={{ scale: 1.1, zIndex: 1 }}
          whileTap={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={() => handleImageClick(image)}
        >
          <div className="w-full h-full relative">
            <Image
              src={image.path}
              alt={image.name}
              fill
              sizes="(max-width: 768px) 25vw, (max-width: 1024px) 12.5vw, 6.25vw"
              style={{ objectFit: 'contain' }}
              onError={(e) => {
                console.error('Image failed to load:', image.path)
                const target = e.target as HTMLImageElement
                target.src = '/placeholder.svg'
              }}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gray-100 p-1 text-xs flex justify-between items-center">
            <span className="truncate">{image.name}</span>
            <span>{String(index + 1).padStart(4, '0')}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}