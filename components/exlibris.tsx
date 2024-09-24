import React from 'react';
import Image from 'next/image';

export default function Exlibris() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-5xl font-bold mb-2">Ex Libris: Bokeigarmerkje</h1>
        <h2 className="text-2xl font-semibold mb-2">Ein berar av identitet</h2>
        
        <p className="mb-4">
          Ex libris er eit bokeigarmerkje som vert plassert inni bokomslaget for å vise kven som eig boka. For dette prosjektet valde eg å utforske marine former og symbol, med fokus på blåskjel, krill, kval og bølgjer. Målet var å forenkle desse formene til eit minimalistisk uttrykk med tydelege linjer og symbolikk.
        </p>
        
        <p className="mb-4">
          Eg arbeidde med å utvikle eit visuelt språk der blåskjel representerer vern, bølgjer står for rørsle og endring, og krill symboliserer samarbeid. Fargepaletten er blå, oransje (raud) og svart for å framheve symbolikken.
        </p>
        
        <p className="mb-4">
          Skisseprosessen omfatta utforsking av ulike marine former og abstrahering av desse. Ein digital grensesnitt let ein kombinere ulike element for å skape personlege design.
        </p>
        
        <p className="mb-4">
          Prosjektet demonstrerer utfordringa og viktigheita av å destillere komplekse idear til eit lite, visuelt slagkraftig format, som er kjerna i ex libris-design.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Ridder av Blåskjellordenen</h3>
        
        <p className="mb-4">
          Farger: oransje, blått, sort<br/>
          Mantra: Vær ekte, smud, åpen
        </p>

        <ol className="list-decimal list-inside mb-4">
          <li>Absorbér giften, transformér til næring</li>
          <li>Forankret, dog åpen for tidevannets skift</li>
          <li>Myk mot mat, hard mot trusler</li>
          <li>Bevar dine perler i stillhet</li>
          <li>Alene sterk, sammen uovervinnelig</li>
          <li>La deg plukke når tiden er moden</li>
          <li>Rens havet, rens sinnet</li>
          <li>Dans med bølgene, stå imot stormen</li>
          <li>I mørket, vær et fyrtårn for andre</li>
        </ol>

        <p className="mb-4">
          Blåskjellordenen: Bekjemp gift, fysisk og åndelig<br/>
          Våre allierte: Blåskjell, hval, flamingo, krill<br/>
          Vår misjon: Rense, forvandle, gjenføde
        </p>
      </div>
      <div className="flex-1 md:flex-none md:w-1/3">
        <div className="relative aspect-[3/4] w-full mb-4">
          <Image
            src="/skjel-bok.png"
            alt="Ex Libris Design - Skjel Bok"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-gray-200 px-2 py-1 text-sm rounded">Marine symbol</span>
          <span className="bg-gray-200 px-2 py-1 text-sm rounded">Minimalistisk design</span>
          <span className="bg-gray-200 px-2 py-1 text-sm rounded">Visuell identitet</span>
        </div>
        <div className="mt-4">
          <p className="text-sm">2024 master i design AHO</p>
          <p className="text-sm">@lukketsvane</p>
        </div>
      </div>
    </div>
  );
}