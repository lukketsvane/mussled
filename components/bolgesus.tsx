import Image from 'next/image'
import { Heart } from 'lucide-react'

export function Bolgesus() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-5xl font-bold mb-2">Gravgaver</h1>
        <p className="text-xl mb-4">fragmentarium</p>
        <h2 className="text-2xl font-semibold mb-2">Tor Ulven</h2>
        <div className="flex items-center mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">Gi vurdering</span>
        </div>
        <button className="mb-6">
          <Heart className="w-6 h-6" />
        </button>
        <p className="mb-4">
          Tor Ulven (1953–1995) står igjen som en av Norges fremste forfattere i nyere tid. 
          Han debuterte som poet i 1977, og da han etter hvert gikk over til å skrive prosa, 
          var det fortsatt poeten som førte pennen. <a href="#" className="text-blue-600 hover:underline">Les mer</a>
        </p>
        <div className="flex items-center justify-between border-t border-b py-4 mb-4">
          <div>
            <span className="text-3xl font-bold">279,-</span>
            <span className="ml-2">Paperback</span>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded">
            Legg i handlekurv
          </button>
        </div>
        <p className="text-sm text-gray-500">Sendes innen 1 virkedag</p>
        <div className="mt-8">
          <button className="flex items-center justify-between w-full py-2 border-b">
            <span className="text-lg font-semibold">Om boka</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="flex items-center justify-between w-full py-2 border-b">
            <span className="text-lg font-semibold">Detaljer</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="flex items-center justify-between w-full py-2 border-b">
            <span className="text-lg font-semibold">Oppdag mer</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <p className="mt-8">
          Tor Ulven (1953–1995) står igjen som en av Norges fremste forfattere i nyere tid. 
          Han debuterte som poet i 1977, og da han etter hvert gikk over til å skrive prosa, 
          var det fortsatt poeten som førte pennen. Ulvens tekster er nådeløst klartseende i 
          sin eksistensielle søken, og samtidig gjennomsyret av musikalitet. Han var også 
          virksom som gjendikter, og en skarp essayist. Gyldendal gjenutgir våren 2024 to av 
          Tor Ulvens mest kjente verk: Gravgaver (1988) og Søppelsolen (1989), med 
          nyskrevne forord av Anja Lauvdal og Kristoffer Cezinando Karlsen. I Gravgaver 
          trykkes også det eneste intervjuet Ulven ga i sin levetid.
        </p>
      </div>
      <div className="flex-1 md:flex-none md:w-1/3">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src="/tor_ulven_gravgaver.jpg"
            alt="Gravgaver by Tor Ulven"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-gray-200 px-2 py-1 text-sm rounded">Skjønnlitterære emner: død, sorg, tap</span>
          <span className="bg-gray-200 px-2 py-1 text-sm rounded">Moderne litteratur</span>
        </div>
      </div>
    </div>
  )
}