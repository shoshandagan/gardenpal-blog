import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { Calendar, User } from 'lucide-react'
import { urlForImage } from '@/lib/sanity/image'
import type { Image as SanityImage } from 'sanity'

interface PostCardProps {
  title: string
  slug: string
  excerpt?: string
  mainImage?: SanityImage
  publishedAt: string
  author?: {
    name: string
    image?: SanityImage
  }
  categories?: Array<{
    title: string
    slug: { current: string }
    color?: string
  }>
  featured?: boolean
}

export function PostCard({
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  author,
  categories,
  featured = false,
}: PostCardProps) {
  const imageUrl = mainImage && mainImage.asset ? urlForImage(mainImage)?.width(600).height(400).url() : null
  const formattedDate = format(new Date(publishedAt), 'MMM dd, yyyy')

  return (
    <article
      className={`group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <Link href={`/blog/${slug}`} className="block">
        {/* Image */}
        {imageUrl ? (
          <div className="relative aspect-video overflow-hidden bg-gray-100">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {featured && (
              <div className="absolute top-4 left-4 bg-garden-leaf text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </div>
            )}
          </div>
        ) : (
          <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-garden-leaf/20 to-garden-sky/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 text-garden-leaf">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"></path>
                  <path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"></path>
                  <path d="M5 21h14"></path>
                </svg>
              </div>
              <p className="text-sm text-gray-600">GardenPal Blog</p>
            </div>
            {featured && (
              <div className="absolute top-4 left-4 bg-garden-leaf text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((category) => (
                <span
                  key={category.slug.current}
                  className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: category.color ? `${category.color}20` : '#E3F2FD',
                    color: category.color || '#4CAF50',
                  }}
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2
            className={`font-bold text-gray-900 group-hover:text-garden-leaf transition-colors mb-3 ${
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}
          >
            {title}
          </h2>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={publishedAt}>{formattedDate}</time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
