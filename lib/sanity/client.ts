import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable. ' +
    'Please add it to your Vercel project settings or .env.local file.'
  )
}

if (!dataset) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_DATASET environment variable. ' +
    'Please add it to your Vercel project settings or .env.local file.'
  )
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-10',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
})

