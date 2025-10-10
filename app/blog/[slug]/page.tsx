import { client } from '@/lib/sanity/client'
import { postQuery, postPathsQuery } from '@/lib/sanity/queries'
import { PostContent } from '@/components/blog/PostContent'
import { AffiliateCard } from '@/components/blog/AffiliateCard'
import { AffiliateDisclosure } from '@/components/blog/AffiliateDisclosure'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { urlForImage } from '@/lib/sanity/image'
import type { Metadata } from 'next'

export const revalidate = 60 // Revalidate every 60 seconds

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPost(slug: string) {
  const post = await client.fetch(postQuery, { slug })
  return post
}

export async function generateStaticParams() {
  const slugs = await client.fetch(postPathsQuery)
  return slugs.map((slug: string) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | GardenPal Blog',
    }
  }

  const imageUrl = post.mainImage ? urlForImage(post.mainImage)?.width(1200).height(630).url() : null

  return {
    title: post.seo?.metaTitle || `${post.title} | GardenPal Blog`,
    description: post.seo?.metaDescription || post.excerpt || `Read ${post.title} on GardenPal Blog`,
    keywords: post.seo?.keywords || [],
    authors: post.author ? [{ name: post.author.name }] : [],
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : [],
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-garden-leaf hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const imageUrl = post.mainImage ? urlForImage(post.mainImage)?.width(1200).height(600).url() : null
  const formattedDate = format(new Date(post.publishedAt), 'MMMM dd, yyyy')
  const hasAffiliateProducts = post.affiliateProducts && post.affiliateProducts.length > 0

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog" className="flex items-center gap-2 text-garden-leaf hover:text-garden-leafLight transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Blog</span>
          </Link>
        </div>
      </header>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((category: { slug: { current: string }; title: string; color?: string }) => (
              <span
                key={category.slug.current}
                className="inline-block px-3 py-1 text-sm font-medium rounded-full"
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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.image && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={urlForImage(post.author.image)?.width(40).height(40).url() || ''}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author.name}</span>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.publishedAt}>{formattedDate}</time>
          </div>
        </div>

        {/* Featured Image */}
        {imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-12">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Affiliate Disclosure */}
        {hasAffiliateProducts && <AffiliateDisclosure />}

        {/* Post Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <PostContent content={post.body} />
        </div>

        {/* Affiliate Products */}
        {hasAffiliateProducts && (
          <section className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Recommended Products
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {post.affiliateProducts.map((product: { _id: string; name: string; description: string; image: any; price: string; amazonLink: string }) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                <AffiliateCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  affiliateLink={product.affiliateLink}
                  platform={product.platform}
                  rating={product.rating}
                  postSlug={params.slug}
                />
              ))}
            </div>
          </section>
        )}

        {/* Author Bio */}
        {post.author && post.author.bio && (
          <section className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-start gap-6">
              {post.author.image && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={urlForImage(post.author.image)?.width(80).height(80).url() || ''}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  About {post.author.name}
                </h3>
                <div className="text-gray-600 prose">
                  <PostContent content={post.author.bio} />
                </div>
              </div>
            </div>
          </section>
        )}
      </article>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} GardenPal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
