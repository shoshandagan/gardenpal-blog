import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
  console.warn('Sanity configuration missing. Some features may not work properly.')
}

export const client = createClient({
  projectId: projectId || 'fallback-project-id',
  dataset: dataset || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-10',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

