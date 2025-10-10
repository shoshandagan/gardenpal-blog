import { client } from '@/lib/sanity/client'
import { postPathsQuery } from '@/lib/sanity/queries'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gardenpal.com'
  
  // Get all blog post slugs
  const postSlugs = await client.fetch(postPathsQuery)
  
  // Generate sitemap entries for blog posts
  const blogPosts = postSlugs.map((slug: string) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...blogPosts,
  ]
}
