# GardenPal Blog - Next.js + Sanity + Supabase

A high-performance, SEO-optimized blog built with Next.js 15, Sanity CMS, and Supabase analytics. Designed specifically for the GardenPal gardening app.

<!-- Updated to trigger new deployment -->

## 🌟 Features

- ✅ **SEO Optimized** - Server-side rendering with Next.js App Router
- ✅ **Headless CMS** - Sanity Studio for content management
- ✅ **Affiliate Links** - Built-in affiliate product management with click tracking
- ✅ **Analytics** - Supabase integration for tracking clicks and page views
- ✅ **Beautiful Design** - Matches GardenPal brand with Tailwind CSS
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Performance** - Static site generation for lightning-fast load times
- ✅ **Scalable** - Built to handle thousands of posts

## 📁 Project Structure

```
gardenpal-blog/
├── app/
│   ├── blog/                    # Blog pages
│   │   ├── page.tsx            # Blog list page
│   │   └── [slug]/             # Individual blog post
│   ├── studio/                  # Sanity Studio (CMS)
│   ├── api/                     # API routes
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/
│   └── blog/                    # Blog-specific components
├── lib/
│   ├── sanity/                  # Sanity client & queries
│   │   ├── client.ts
│   │   ├── image.ts
│   │   └── queries.ts
│   └── supabase/                # Supabase client & analytics
│       ├── client.ts
│       └── analytics.ts
├── sanity/
│   └── schemas/                 # Content schemas
│       ├── post.ts
│       ├── author.ts
│       ├── category.ts
│       ├── affiliateProduct.ts
│       └── blockContent.ts
└── sanity.config.ts             # Sanity configuration
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd gardenpal-blog
npm install
```

### 2. Set Up Sanity

1. Create a new Sanity project at [sanity.io](https://www.sanity.io/)
2. Copy your project ID and dataset name
3. Create a `.env.local` file:

```bash
# Copy the example file
cp env.example .env.local
```

4. Update `.env.local` with your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-10
SANITY_API_TOKEN=your_token_here
```

### 3. Set Up Supabase (For Analytics)

1. Go to your [Supabase project](https://supabase.com/dashboard)
2. Create two new tables:

**Table: `affiliate_clicks`**
```sql
CREATE TABLE affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_slug text NOT NULL,
  product_id text NOT NULL,
  product_name text,
  affiliate_url text,
  platform text,
  clicked_at timestamp with time zone DEFAULT now(),
  user_agent text,
  referrer text
);

-- Add index for faster queries
CREATE INDEX idx_affiliate_clicks_post_slug ON affiliate_clicks(post_slug);
CREATE INDEX idx_affiliate_clicks_product_id ON affiliate_clicks(product_id);
```

**Table: `page_views`**
```sql
CREATE TABLE page_views (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_slug text NOT NULL,
  viewed_at timestamp with time zone DEFAULT now(),
  referrer text,
  user_agent text
);

-- Add index for faster queries
CREATE INDEX idx_page_views_post_slug ON page_views(post_slug);
CREATE INDEX idx_page_views_viewed_at ON page_views(viewed_at);
```

3. Add Supabase credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit:
- **Blog**: [http://localhost:3000](http://localhost:3000)
- **Sanity Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)

## 📝 Content Management

### Accessing Sanity Studio

1. Navigate to `/studio` in your browser
2. Log in with your Sanity account
3. Start creating content!

### Content Types

#### 1. **Blog Posts**
- Title, slug, excerpt
- Main image with alt text
- Rich text body with inline images
- Author reference
- Categories
- Affiliate products
- SEO metadata
- Featured flag

#### 2. **Authors**
- Name, slug
- Profile image
- Bio

#### 3. **Categories**
- Title, slug
- Description
- Color (for badges)

#### 4. **Affiliate Products**
- Product name
- Description
- Image
- Price
- Affiliate link (Amazon, etc.)
- Platform
- Rating

## 🔗 Affiliate Link Setup

### Amazon Associates Example

1. Join [Amazon Associates](https://affiliate-program.amazon.com/)
2. Get your affiliate tracking ID
3. In Sanity Studio, create an "Affiliate Product":
   - Name: "Garden Pruning Shears"
   - Affiliate Link: `https://amazon.com/dp/PRODUCT_ID?tag=YOUR_TAG`
   - Platform: "amazon"
   - Price: "$24.99"

4. Add product to blog post
5. Clicks are automatically tracked in Supabase!

### FTC Compliance

The blog includes automatic affiliate disclosures. Make sure to:
- Display disclosure at the top of posts with affiliate links
- Use `rel="nofollow sponsored"` on affiliate links
- Include affiliate policy in your privacy page

## 🎨 Styling

The blog uses the same design system as your main GardenPal website:

### Colors
- **Garden Leaf**: `#4CAF50` - Primary green
- **Garden Leaf Light**: `#8BC34A` - Secondary green
- **Garden Soil**: `#795548` - Brown accents
- **Garden Sky**: `#E3F2FD` - Light blue backgrounds

### Typography
- Font: Inter (from Google Fonts)
- Tailwind CSS for utility classes
- `@tailwindcss/typography` for blog content

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - All values from `.env.local`
5. Deploy!

Vercel will automatically:
- Build your Next.js app
- Enable ISR (Incremental Static Regeneration)
- Provide global CDN
- Auto-deploy on git push

### Custom Domain

1. In Vercel, go to your project settings
2. Add custom domain: `blog.gardenpal.com`
3. Update DNS records as instructed
4. SSL certificate is automatically provisioned

## 📊 Analytics Dashboard

Query your affiliate performance in Supabase:

```sql
-- Top performing affiliate products
SELECT 
  product_name,
  COUNT(*) as total_clicks,
  platform
FROM affiliate_clicks
WHERE clicked_at > NOW() - INTERVAL '30 days'
GROUP BY product_name, platform
ORDER BY total_clicks DESC
LIMIT 10;

-- Most viewed blog posts
SELECT 
  post_slug,
  COUNT(*) as views
FROM page_views
WHERE viewed_at > NOW() - INTERVAL '30 days'
GROUP BY post_slug
ORDER BY views DESC
LIMIT 10;
```

## 🔐 Security

- ✅ Environment variables for sensitive data
- ✅ Supabase Row Level Security (RLS) ready
- ✅ CSP headers (configure in next.config.js)
- ✅ Sanitized user inputs
- ✅ HTTPS only in production

## 🧪 Development

### Folder Structure for New Components

```
components/blog/
├── PostCard.tsx          # Blog post preview card
├── PostContent.tsx       # Rich text renderer
├── AffiliateCard.tsx     # Affiliate product display
├── CategoryBadge.tsx     # Category pills
└── ShareButtons.tsx      # Social sharing
```

### Adding a New Content Type

1. Create schema in `sanity/schemas/`
2. Add to `sanity/schemas/index.ts`
3. Create query in `lib/sanity/queries.ts`
4. Create component in `components/blog/`
5. Add page route in `app/`

## 📚 Next Steps

1. ✅ Set up Sanity project
2. ✅ Configure Supabase tables
3. ⏳ Create your first blog post
4. ⏳ Add author profiles
5. ⏳ Create categories
6. ⏳ Add affiliate products
7. ⏳ Deploy to Vercel
8. ⏳ Set up custom domain

## 🆘 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Sanity Studio not loading
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- Ensure you've created a Sanity project
- Run `npm install` again

### Images not displaying
- Verify Sanity image URL configuration
- Check CORS settings in Sanity dashboard

## 📖 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 License

This project is part of the GardenPal application.

---

**Built with ❤️ for GardenPal**
