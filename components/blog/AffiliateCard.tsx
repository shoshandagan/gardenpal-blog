'use client'

import Image from 'next/image'
import { ExternalLink, Star } from 'lucide-react'
import { urlForImage } from '@/lib/sanity/image'
import { trackAffiliateClick } from '@/lib/supabase/analytics'
import type { Image as SanityImage } from 'sanity'

interface AffiliateCardProps {
  id: string
  name: string
  description?: string
  image?: SanityImage
  price?: string
  affiliateLink: string
  platform: string
  rating?: number
  postSlug: string
}

export function AffiliateCard({
  id,
  name,
  description,
  image,
  price,
  affiliateLink,
  platform,
  rating,
  postSlug,
}: AffiliateCardProps) {
  const imageUrl = image ? urlForImage(image)?.width(300).height(300).url() : null

  const handleClick = async () => {
    // Track the click in Supabase
    await trackAffiliateClick({
      post_slug: postSlug,
      product_id: id,
      product_name: name,
      affiliate_url: affiliateLink,
      platform,
    })

    // Open the affiliate link
    window.open(affiliateLink, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-gradient-to-br from-garden-sky to-white border-2 border-garden-leaf/20 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
          {rating && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">({rating}/5)</span>
            </div>
          )}
        </div>
        {price && (
          <div className="text-xl font-bold text-garden-leaf">{price}</div>
        )}
      </div>

      {/* Image */}
      {imageUrl && (
        <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-white">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain p-4"
          />
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
      )}

      {/* CTA Button */}
      <button
        onClick={handleClick}
        className="w-full bg-garden-leaf hover:bg-garden-leafLight text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
      >
        <span>View on {platform === 'amazon' ? 'Amazon' : platform}</span>
        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Platform Badge */}
      <div className="mt-3 text-center">
        <span className="text-xs text-gray-500">
          Affiliate Link - We may earn a commission
        </span>
      </div>
    </div>
  )
}
