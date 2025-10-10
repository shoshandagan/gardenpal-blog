import { client } from '@/lib/sanity/client'
import { postsQuery, featuredPostsQuery } from '@/lib/sanity/queries'
import { PostCard } from '@/components/blog/PostCard'
import Link from 'next/link'
import { ArrowLeft, Sprout } from 'lucide-react'

export const revalidate = 60 // Revalidate every 60 seconds

export const metadata = {
  title: 'Blog | GardenPal - Gardening Tips & Guides',
  description: 'Explore our collection of gardening guides, plant care tips, and expert advice to help you grow a thriving garden.',
}

async function getPosts() {
  const posts = await client.fetch(postsQuery)
  return posts
}

async function getFeaturedPosts() {
  const featured = await client.fetch(featuredPostsQuery)
  return featured
}

export default async function BlogPage() {
  const [posts, featuredPosts] = await Promise.all([
    getPosts(),
    getFeaturedPosts(),
  ])

  return (
    <div className="min-h-screen bg-gradient-to-b from-garden-sky/30 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-garden-leaf hover:text-garden-leafLight transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <Sprout className="w-6 h-6 text-garden-leaf" />
              <span className="font-bold text-xl">GardenPal Blog</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gardening Tips & Guides
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert advice, plant care guides, and everything you need to grow a thriving garden
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts && featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-garden-leaf rounded"></span>
              Featured Posts
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post: { _id: string; title: string; slug: { current: string }; excerpt?: string; mainImage?: unknown; publishedAt: string; author?: { name: string; image?: unknown }; categories?: Array<{ title: string; slug: { current: string }; color?: string }> }) => (
                <PostCard
                  key={post._id}
                  title={post.title}
                  slug={post.slug.current}
                  excerpt={post.excerpt}
                  mainImage={post.mainImage}
                  publishedAt={post.publishedAt}
                  author={post.author}
                  categories={post.categories}
                  featured={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-garden-leaf rounded"></span>
            All Posts
          </h2>
          
          {posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: { _id: string; title: string; slug: { current: string }; excerpt?: string; mainImage?: unknown; publishedAt: string; author?: { name: string; image?: unknown }; categories?: Array<{ title: string; slug: { current: string }; color?: string }> }) => (
                <PostCard
                  key={post._id}
                  title={post.title}
                  slug={post.slug.current}
                  excerpt={post.excerpt}
                  mainImage={post.mainImage}
                  publishedAt={post.publishedAt}
                  author={post.author}
                  categories={post.categories}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Sprout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-6">
                Start creating content in the Sanity Studio
              </p>
              <Link
                href="/studio"
                className="inline-flex items-center px-6 py-3 bg-garden-leaf text-white rounded-lg hover:bg-garden-leafLight transition-colors"
              >
                Go to Studio
              </Link>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} GardenPal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
