import { groq } from 'next-sanity'

// Get all posts with author and category data
export const postsQuery = groq`*[_type == "post" && defined(slug.current) && !isDraft] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  "author": author->{name, image},
  "categories": categories[]->{title, slug, color},
  featured
}`

// Get a single post by its slug
export const postQuery = groq`*[_type == "post" && slug.current == $slug && !isDraft][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  body,
  "author": author->{name, slug, image, bio},
  "categories": categories[]->{title, slug, color},
  "affiliateProducts": affiliateProducts[]->{
    _id,
    name,
    description,
    image,
    price,
    affiliateLink,
    platform,
    rating
  },
  seo,
  featured
}`

// Get all posts by a specific category
export const postsByCategoryQuery = groq`*[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  "author": author->{name, image},
  "categories": categories[]->{title, slug, color}
}`

// Get featured posts
export const featuredPostsQuery = groq`*[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  "author": author->{name, image},
  "categories": categories[]->{title, slug, color}
}`

// Get all categories
export const categoriesQuery = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  color
}`

// Get all affiliate products
export const affiliateProductsQuery = groq`*[_type == "affiliateProduct"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  image,
  price,
  affiliateLink,
  platform,
  featured,
  rating
}`

// Get post slugs for static generation
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`

// Get recent posts (for sidebar)
export const recentPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) [0...5] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage
}`

