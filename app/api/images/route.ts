import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const imageDirectories = ['figure', 'korall_1', 'korall_m', 'korall_s', 'div', 'noregs_dyr']
  let allImages: { name: string; path: string }[] = []

  imageDirectories.forEach(dir => {
    const directory = path.join(process.cwd(), 'public', dir)
    try {
      const fileNames = fs.readdirSync(directory)
      const images = fileNames.map(fileName => ({
        name: path.parse(fileName).name,
        path: `/${dir}/${fileName}`
      }))
      allImages = [...allImages, ...images]
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error)
    }
  })

  console.log('API: Returning images:', JSON.stringify(allImages, null, 2))
  return NextResponse.json(allImages)
}