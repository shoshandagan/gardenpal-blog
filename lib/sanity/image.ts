import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { client } from './client'

const imageBuilder = createImageUrlBuilder(client)

export const urlForImage = (source: Image | null | undefined) => {
  if (!source || !source.asset || !source.asset._ref) {
    console.warn('Invalid image source:', source)
    return null
  }
  
  try {
    return imageBuilder?.image(source).auto('format').fit('max')
  } catch (error) {
    console.warn('Failed to generate image URL:', error, 'Source:', source)
    return null
  }
}

