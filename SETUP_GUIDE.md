# 🎯 GardenPal Blog Setup Guide

## What You Have Now

I've created a complete Next.js + Sanity + Supabase blog system for GardenPal. Here's what's been built:

### ✅ Completed Components

1. **Next.js 15 App Router Setup**
   - Modern App Router architecture
   - TypeScript configuration
   - Tailwind CSS with GardenPal branding
   - SEO-optimized layout

2. **Sanity CMS Integration**
   - Complete content schemas (posts, authors, categories, affiliate products)
   - Rich text editor with inline images and code blocks
   - Affiliate link annotations
   - SEO metadata fields
   - Sanity Studio at `/studio` route

3. **Supabase Analytics**
   - Affiliate click tracking
   - Page view tracking
   - Analytics helper functions

4. **Design System**
   - Matches your GardenPal website colors
   - Consistent typography
   - Responsive layouts

## 🚀 Next Steps to Get Running

### Step 1: Create Sanity Project

1. Go to [sanity.io](https://www.sanity.io/) and sign up/log in
2. Click "Create Project"
3. Choose a name: "GardenPal Blog"
4. Choose dataset mode: "Production"
5. Copy your Project ID (looks like: `abc123xyz`)

### Step 2: Configure Environment Variables

1. Create `.env.local` in the project root:

```bash
cd /Users/shoshandagan/gardenpal-blog/gardenpal-blog
cp env.example .env.local
```

2. Edit `.env.local` with your actual values:

```env
# Sanity (from sanity.io dashboard)
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-10
SANITY_API_TOKEN=your_token_here

# Supabase (from your existing project)
NEXT_PUBLIC_SUPABASE_URL=https://edsqkhvctahmjwoysefl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here

# Site URL
NEXT_PUBLIC_SITE_URL=https://gardenpal.com
```

### Step 3: Create Supabase Tables

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Affiliate clicks tracking
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

CREATE INDEX idx_affiliate_clicks_post_slug ON affiliate_clicks(post_slug);
CREATE INDEX idx_affiliate_clicks_product_id ON affiliate_clicks(product_id);

-- Page views tracking
CREATE TABLE page_views (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_slug text NOT NULL,
  viewed_at timestamp with time zone DEFAULT now(),
  referrer text,
  user_agent text
);

CREATE INDEX idx_page_views_post_slug ON page_views(post_slug);
CREATE INDEX idx_page_views_viewed_at ON page_views(viewed_at);

-- Enable RLS (optional, for security)
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking)
CREATE POLICY "Allow anonymous inserts" ON affiliate_clicks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON page_views
  FOR INSERT WITH CHECK (true);
```

### Step 4: Start Development Server

```bash
cd /Users/shoshandagan/gardenpal-blog/gardenpal-blog
npm run dev
```

Visit:
- **Homepage**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio

### Step 5: Create Your First Content

1. Go to http://localhost:3000/studio
2. Log in with your Sanity account
3. Create an Author (yourself)
4. Create a Category (e.g., "Gardening Tips")
5. Create a Blog Post
6. Publish it!

## 📦 What Still Needs to Be Built

I've created the foundation, but you'll need to complete these components:

### 1. Blog List Page (`app/blog/page.tsx`)
- Displays all blog posts
- Filtering by category
- Search functionality
- Pagination

### 2. Individual Blog Post Page (`app/blog/[slug]/page.tsx`)
- Dynamic routing for posts
- SEO metadata per post
- Social sharing buttons
- Related posts
- Comments (optional)

### 3. Blog Components (`components/blog/`)
- `PostCard.tsx` - Preview card for blog list
- `PostContent.tsx` - Renders Sanity Portable Text
- `AffiliateCard.tsx` - Display affiliate products
- `AffiliateDisclosure.tsx` - FTC compliance notice
- `CategoryBadge.tsx` - Category pills
- `ShareButtons.tsx` - Social media sharing

### 4. SEO Components
- Sitemap generation (`app/sitemap.ts`)
- RSS feed (`app/rss.xml/route.ts`)
- Open Graph images
- JSON-LD structured data

### 5. API Routes
- `/api/affiliate-click` - Track clicks
- `/api/revalidate` - Webhook for Sanity updates

## 🎨 Design Mockup

Here's what the blog will look like:

```
┌──────────────────────────────────────────────┐
│  🌱 GardenPal Blog                     [Menu]│
├──────────────────────────────────────────────┤
│                                              │
│  [Featured Post - Hero Image]               │
│  "10 Essential Tools for Your First Garden"│
│  by Jane Smith | 5 min read                │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  Recent Posts                               │
│  ┌────────┐  ┌────────┐  ┌────────┐       │
│  │[Image] │  │[Image] │  │[Image] │       │
│  │ Post 1 │  │ Post 2 │  │ Post 3 │       │
│  │Category│  │Category│  │Category│       │
│  └────────┘  └────────┘  └────────┘       │
│                                              │
└──────────────────────────────────────────────┘
```

## 🔗 Integration with Main Website

### Option A: Subdomain (Recommended)
- Blog at: `blog.gardenpal.com`
- Main app at: `gardenpal.com`
- Easy to manage separately
- Better for SEO

### Option B: Subdirectory
- Blog at: `gardenpal.com/blog`
- Requires reverse proxy configuration
- Shares domain authority

## 💰 Cost Breakdown

### Free Tier Limits

**Sanity (Free)**
- 3 users
- 10,000 documents
- 5GB bandwidth/month
- Perfect for starting out!

**Supabase (Free - Your Existing Project)**
- Already covered
- Analytics tables use minimal space

**Vercel (Free)**
- Unlimited bandwidth
- 100GB build time/month
- Perfect for Next.js

**Total Monthly Cost: $0** 🎉

### When to Upgrade

**Sanity Growth ($99/mo)**
- Need >3 content editors
- Need >10k documents
- Need >5GB bandwidth

You'll likely never need to upgrade unless you have a large content team!

## 📊 Example Content Workflow

### Creating a Blog Post with Affiliate Links

1. **In Sanity Studio:**
   - Click "Post" → "Create"
   - Title: "Best Pruning Shears for Your Garden"
   - Add main image
   - Write content using rich text editor
   - Create affiliate product:
     - Name: "Felco F-2 Pruning Shears"
     - Link: `https://amazon.com/dp/B0000223IM?tag=youraffid-20`
     - Platform: Amazon
   - Add product to post
   - Add SEO meta title and description
   - Publish!

2. **What Happens:**
   - Next.js automatically generates static page
   - SEO metadata added to `<head>`
   - Affiliate links tracked in Supabase
   - Post appears on blog list

## 🚀 Deployment Checklist

- [ ] Create Sanity project
- [ ] Set up environment variables
- [ ] Create Supabase tables
- [ ] Test locally
- [ ] Create first blog post
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Add sitemap to Google Search Console
- [ ] Set up Amazon Associates account
- [ ] Add affiliate disclaimer to posts

## 🆘 Need Help?

### Common Issues

**"Module not found"**
```bash
npm install
```

**"Sanity project not found"**
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`
- Verify project exists at sanity.io

**"Failed to fetch from Supabase"**
- Check Supabase URL and anon key
- Verify tables exist
- Check RLS policies

## 📞 What to Do Next

1. **Immediate**: Set up Sanity project and environment variables
2. **Today**: Create Supabase tables and test tracking
3. **This Week**: Build blog list and post detail pages
4. **This Month**: Deploy to production and start writing content!

Would you like me to:
1. Build the remaining blog components (PostCard, PostContent, etc.)?
2. Create the blog list and detail pages?
3. Set up the API routes for tracking?
4. Help you deploy to Vercel?

Just let me know what you'd like to tackle next! 🚀

