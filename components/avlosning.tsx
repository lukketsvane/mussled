import React from 'react'
import Image from 'next/image'

const posters = [
  { id: 1, title: 'kråke', image: '/illustrated/kråke.png' },
  { id: 2, title: 'flamingo', image: '/illustrated/flamingo.png' },
  { id: 3, title: 'bakterie', image: '/illustrated/skjell-symbol.png' },
  { id: 4, title: 'kval', image: '/illustrated/kval.png' },
  { id: 5, title: 'algae', image: '/illustrated/algae.png' },
  { id: 6, title: 'kval-og-krill', image: '/illustrated/kval-og-krill.png' },
  { id: 7, title: 'orden', image: '/illustrated/orden.png' },
  { id: 8, title: 'orden-2', image: '/illustrated/orden-2.png' },
  { id: 9, title: 'skjell-skjold', image: '/illustrated/skjell-skjold.png' },
]

export function Avlosning() {
  return (
    <div className="mt-4 -mx-2"> {/* Changed to mt-4 and added negative margin on x-axis */}
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
    </div>
  )
}