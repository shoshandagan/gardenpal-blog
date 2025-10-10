'use client'

import { NextStudio } from 'next-sanity/studio'
import { useEffect, useState } from 'react'
import config from '../../../sanity.config'

export default function StudioPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Sanity Studio...</p>
        </div>
      </div>
    )
  }

  return <NextStudio config={config} />
}