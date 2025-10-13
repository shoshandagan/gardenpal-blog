import Link from 'next/link'
import { ArrowRight, BookOpen, Sprout } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-garden-sky to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12 animate-grow">
            <Sprout className="w-20 h-20 mx-auto text-garden-leaf mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to the
              <span className="block text-garden-leaf">GardenPal Blog</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your ultimate resource for gardening tips, plant care guides, and
              expert advice to help you grow a thriving garden.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-16">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-12 py-4 text-xl font-medium text-white bg-garden-leaf rounded-lg hover:bg-garden-leafLight transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <BookOpen className="w-6 h-6 mr-3" />
              Explore Blog Posts
              <ArrowRight className="w-6 h-6 ml-3" />
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-garden-sky rounded-lg flex items-center justify-center mb-4">
                <Sprout className="w-6 h-6 text-garden-leaf" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Guides</h3>
              <p className="text-gray-600">
                In-depth articles about plant care, gardening techniques, and seasonal tips.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-garden-sky rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-garden-leaf" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Product Reviews</h3>
              <p className="text-gray-600">
                Honest reviews of gardening tools and products to help you make informed decisions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-garden-sky rounded-lg flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-garden-leaf" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Step-by-Step</h3>
              <p className="text-gray-600">
                Easy-to-follow tutorials for gardeners of all skill levels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
