# 🚀 Quick Start Guide

## ✅ What's Already Done

I've completed the entire blog setup for you! Here's what you have:

### Infrastructure ✅
- Next.js 15 blog application
- Sanity CMS integration (Project ID: 80etgf14)
- Supabase analytics tables created
- Environment variables configured
- All components built

### Features ✅
- Blog list page with featured posts
- Individual blog post pages with SEO
- Affiliate product cards with click tracking
- Rich text editor support
- Image optimization
- Sitemap & robots.txt
- Responsive design matching GardenPal branding

## 🎯 Your Blog is Running!

**Development server**: http://localhost:3000

### Available Routes:
- **Homepage**: http://localhost:3000
- **Blog List**: http://localhost:3000/blog
- **Sanity Studio**: http://localhost:3000/studio

## 📝 Create Your First Blog Post

### Step 1: Access Sanity Studio

1. Open http://localhost:3000/studio
2. Log in with your Sanity account
3. You'll see the content management interface

### Step 2: Create an Author

1. Click "Author" in the sidebar
2. Click "Create new Author"
3. Fill in:
   - Name: Your name
   - Slug: Click "Generate" from name
   - Upload a profile image (optional)
   - Add a bio
4. Click "Publish"

### Step 3: Create a Category

1. Click "Category" in the sidebar
2. Click "Create new Category"
3. Fill in:
   - Title: "Gardening Tips"
   - Slug: Click "Generate"
   - Description: "Helpful tips for gardeners"
   - Color: #4CAF50 (or any hex color)
4. Click "Publish"

### Step 4: Create Your First Post

1. Click "Blog Post" in the sidebar
2. Click "Create new Blog Post"
3. Fill in:
   - **Title**: "10 Essential Tools for Your First Garden"
   - **Slug**: Click "Generate from title"
   - **Author**: Select the author you created
   - **Main Image**: Upload a featured image
   - **Categories**: Select "Gardening Tips"
   - **Excerpt**: "Discover the must-have tools every beginner gardener needs..."
   - **Body**: Write your content using the rich text editor
   - **SEO Settings**:
     - Meta Title: "10 Essential Gardening Tools for Beginners"
     - Meta Description: "Complete guide to essential gardening tools..."
4. Click "Publish"

### Step 5: View Your Post

1. Go to http://localhost:3000/blog
2. You should see your post!
3. Click on it to view the full post

## 🔗 Adding Affiliate Products

### Step 1: Join Amazon Associates

1. Go to https://affiliate-program.amazon.com/
2. Sign up for an account
3. Get your affiliate tracking ID (e.g., `yourname-20`)

### Step 2: Create an Affiliate Product in Sanity

1. In Sanity Studio, click "Affiliate Product"
2. Click "Create new Affiliate Product"
3. Fill in:
   - **Name**: "Felco F-2 Pruning Shears"
   - **Description**: "Professional-grade pruning shears..."
   - **Image**: Upload product image
   - **Price**: "$24.99"
   - **Affiliate Link**: `https://amazon.com/dp/B0000223IM?tag=yourname-20`
   - **Platform**: Select "Amazon Associates"
   - **Rating**: 4.5
4. Click "Publish"

### Step 3: Add Product to Blog Post

1. Edit your blog post
2. Scroll to "Affiliate Products"
3. Click "Add item" and select your product
4. Click "Publish"

### Step 4: View Tracking

Clicks are automatically tracked in Supabase! Query them:

```sql
SELECT * FROM affiliate_clicks ORDER BY clicked_at DESC;
```

## 📊 Analytics Dashboard

### View Click Stats

Go to your Supabase dashboard and run:

```sql
-- Top products by clicks
SELECT 
  product_name,
  COUNT(*) as clicks,
  platform
FROM affiliate_clicks
WHERE clicked_at > NOW() - INTERVAL '30 days'
GROUP BY product_name, platform
ORDER BY clicks DESC;

-- Most viewed posts
SELECT 
  post_slug,
  COUNT(*) as views
FROM page_views
WHERE viewed_at > NOW() - INTERVAL '30 days'
GROUP BY post_slug
ORDER BY views DESC;
```

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
garden: {
  leaf: '#4CAF50',      // Primary green
  leafLight: '#8BC34A', // Light green
  soil: '#795548',      // Brown
  sky: '#E3F2FD',       // Light blue
  stone: '#D7CCC8'      // Beige
}
```

### Add Custom Components

Create new components in `components/blog/`:

```typescript
// components/blog/NewsletterSignup.tsx
export function NewsletterSignup() {
  return (
    <div className="bg-garden-sky p-6 rounded-lg">
      <h3>Subscribe to our newsletter</h3>
      {/* Add form */}
    </div>
  )
}
```

## 🚀 Deploy to Production

When you're ready to launch:

1. Push to GitHub
2. Deploy to Vercel (see DEPLOYMENT.md)
3. Add custom domain
4. Submit sitemap to Google

## 📚 Documentation

- **README.md** - Complete technical documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **DEPLOYMENT.md** - Deployment guide
- **This file** - Quick start guide

## 🆘 Troubleshooting

### "Module not found" errors
```bash
cd /Users/shoshandagan/gardenpal-blog/gardenpal-blog
npm install
```

### Sanity Studio not loading
- Check that NEXT_PUBLIC_SANITY_PROJECT_ID is correct in `.env.local`
- Verify you're logged into Sanity

### Images not displaying
- Make sure images are uploaded in Sanity
- Check browser console for errors

## ✨ What's Next?

1. ✅ Create your first blog post
2. ✅ Add affiliate products
3. ✅ Customize colors/styling
4. ✅ Deploy to production
5. ✅ Start writing content!

## 💡 Content Ideas

- "How to Start a Vegetable Garden"
- "Best Plants for Beginners"
- "Seasonal Gardening Calendar"
- "Common Gardening Mistakes to Avoid"
- "Top 10 Gardening Tools Under $50"

---

**Your blog is ready! Start creating amazing content! 🌱**

Need help? All the documentation is in this folder!
