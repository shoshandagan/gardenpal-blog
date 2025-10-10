# 🚀 Deployment Guide - GardenPal Blog

## Quick Deploy to Vercel (Recommended)

### Step 1: Push to GitHub

```bash
cd /Users/shoshandagan/gardenpal-blog/gardenpal-blog

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: GardenPal Blog with Next.js + Sanity"

# Create a new GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/gardenpal-blog.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Add Environment Variables

In Vercel project settings, add these environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=80etgf14
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-10
SANITY_API_TOKEN=(get from sanity.io/manage)

NEXT_PUBLIC_SUPABASE_URL=https://edsqkhvctahmjwoysefl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkc3FraHZjdGFobWp3b3lzZWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTkyOTQsImV4cCI6MjA1OTE3NTI5NH0.VOBwuPpZGrzyij5aIp4xg4ii3HZge9vNq1I03ESn_LQ

NEXT_PUBLIC_SITE_URL=https://your-blog.vercel.app
```

### Step 4: Deploy!

Click "Deploy" and wait for the build to complete.

## Custom Domain Setup

### Option A: Subdomain (blog.gardenpal.com)

1. In Vercel, go to your project settings
2. Click "Domains"
3. Add domain: `blog.gardenpal.com`
4. Add DNS record in your domain provider:
   ```
   Type: CNAME
   Name: blog
   Value: cname.vercel-dns.com
   ```

### Option B: Subdirectory (gardenpal.com/blog)

This requires a reverse proxy setup. Contact me if you need this option.

## Sanity API Token

To allow Vercel to fetch content from Sanity:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project (80etgf14)
3. Go to "API" → "Tokens"
4. Click "Add API token"
5. Name: "Vercel Production"
6. Permissions: "Viewer" (read-only)
7. Copy the token and add to Vercel environment variables

## Automatic Deployments

Vercel will automatically deploy when you:
- Push to `main` branch
- Merge a pull request

## Revalidation Webhook (Optional)

To automatically rebuild when you publish content in Sanity:

1. In Vercel, go to Settings → Git
2. Copy the "Deploy Hook" URL
3. In Sanity Studio:
   - Go to [sanity.io/manage](https://www.sanity.io/manage)
   - Select your project
   - Go to "API" → "Webhooks"
   - Add webhook:
     - Name: "Vercel Deploy"
     - URL: [Your Deploy Hook URL]
     - Dataset: production
     - Trigger on: Create, Update, Delete

## Performance Optimization

Your blog is already optimized with:
- ✅ Static Site Generation (SSG)
- ✅ Incremental Static Regeneration (ISR)
- ✅ Image Optimization
- ✅ CDN Distribution
- ✅ Automatic Code Splitting

## Monitoring

### Analytics
- View affiliate clicks in Supabase dashboard
- Query page views with SQL
- Track performance in Vercel Analytics

### SEO
- Submit sitemap to Google Search Console: `https://your-domain.com/sitemap.xml`
- Monitor indexing status
- Track keyword rankings

## Cost Breakdown

### Free Tier Limits
- **Vercel**: Unlimited bandwidth, 100GB build time/month
- **Sanity**: 3 users, 10k documents, 5GB bandwidth
- **Supabase**: Already covered in your existing project

### When You'll Need to Upgrade
- **Vercel**: Never (unless you need enterprise features)
- **Sanity**: When you exceed 10k posts or 5GB bandwidth
- **Supabase**: When you exceed free tier limits

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
vercel --force
```

### Images Not Loading
- Check Sanity project ID in environment variables
- Verify image URLs in Sanity dashboard

### 404 on Blog Posts
- Ensure posts are published in Sanity
- Check slug format (should be lowercase, hyphenated)
- Verify ISR is working (wait 60 seconds after publishing)

## Next Steps After Deployment

1. ✅ Test all pages
2. ✅ Create first blog post in Sanity Studio
3. ✅ Submit sitemap to Google Search Console
4. ✅ Set up Amazon Associates account
5. ✅ Add affiliate products
6. ✅ Share your first post!

## Support

Need help? Check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)

---

**Your blog is ready to launch! 🚀**
