import React from 'react'
import Image from 'next/image'

const posters = [
  { id: 1, title: 'blur', image: '/placeholder.svg?height=450&width=300' },
  { id: 2, title: 'david bowie', image: '/placeholder.svg?height=450&width=300' },
  { id: 3, title: 'television', image: '/placeholder.svg?height=450&width=300' },
  { id: 4, title: 'white flag', image: '/placeholder.svg?height=450&width=300' },
  { id: 5, title: 'the replacements', image: '/placeholder.svg?height=450&width=300' },
  { id: 6, title: 'the velvet underground', image: '/placeholder.svg?height=450&width=300' },
  { id: 7, title: 'public enemy', image: '/placeholder.svg?height=450&width=300' },
  { id: 8, title: 'pixies', image: '/placeholder.svg?height=450&width=300' },
  { id: 9, title: 'pearl jam', image: '/placeholder.svg?height=450&width=300' },
  { id: 10, title: 'joy division', image: '/placeholder.svg?height=450&width=300' },
  { id: 11, title: 'sex pistols', image: '/placeholder.svg?height=450&width=300' },
  { id: 12, title: 'the modern lovers', image: '/placeholder.svg?height=450&width=300' },
  { id: 13, title: 'black flag', image: '/placeholder.svg?height=450&width=300' },
  { id: 14, title: 'the runaways', image: '/placeholder.svg?height=450&width=300' },
  { id: 15, title: 'ziggy stardust', image: '/placeholder.svg?height=450&width=300' },
]

export function Avlosning() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4">
      {[0, 1, 2].map((row) => (
        <React.Fragment key={row}>
          {posters.slice(row * 5, (row + 1) * 5).map((poster, index) => (
            <div key={poster.id} className="flex flex-col">
              <Image
                src={poster.image}
                alt={poster.title}
                width={300}
                height={450}
                className="w-full h-auto"
              />
              {row < 2 && (
                <div className="h-1 bg-black mt-2 mb-4" />
              )}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}