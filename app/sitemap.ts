import { client } from '@/lib/sanity/client'
import { postPathsQuery } from '@/lib/sanity/queries'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gardenpal.com'
  
  // Basic sitemap entries
  const baseSitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // Try to get blog posts, but don't fail if Sanity isn't configured
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const postSlugs = await client.fetch(postPathsQuery)
      
      // Generate sitemap entries for blog posts
      const blogPosts = postSlugs.map((slug: string) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))

      return [...baseSitemap, ...blogPosts]
    }
  } catch (error) {
    console.warn('Failed to fetch blog posts for sitemap:', error)
  }

  // Return basic sitemap if Sanity fetch fails
  return baseSitemap
}
