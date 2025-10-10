# 🚀 Deploy GardenPal Blog to Vercel

## Step 1: Push to GitHub

After creating your GitHub repository at https://github.com/new, run these commands:

```bash
cd /Users/shoshandagan/gardenpal-blog/gardenpal-blog

# Add your GitHub repository as remote (replace with your actual repo URL)
git remote add origin https://github.com/Garden-Pal/gardenpal-blog.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com/new
2. **Import Git Repository**:
   - Click "Import Git Repository"
   - Select your `gardenpal-blog` repository
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

4. **Add Environment Variables**:
   Click "Environment Variables" and add these:
   
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=80etgf14
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
   
   Optional (if using Supabase analytics):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Click "Deploy"**

6. **Wait for deployment** (usually 2-3 minutes)

7. **Your blog will be live!** Vercel will give you a URL like:
   - `https://gardenpal-blog.vercel.app`
   - Or a custom domain if you set one up

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd /Users/shoshandagan/gardenpal-blog/gardenpal-blog
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - What's your project's name? gardenpal-blog
# - In which directory is your code located? ./
# - Want to override settings? No

# After deployment, set environment variables:
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
# Enter: 80etgf14

vercel env add NEXT_PUBLIC_SANITY_DATASET
# Enter: production

# Deploy to production
vercel --prod
```

## Step 3: Update Sanity CORS Settings

After deployment, you need to add your Vercel URL to Sanity's CORS settings:

1. Go to: https://www.sanity.io/manage
2. Select your project: "gardenpal-blog-studio" (ID: 80etgf14)
3. Click "API" in the left sidebar
4. Scroll to "CORS Origins"
5. Click "Add CORS origin"
6. Add your Vercel URL (e.g., `https://gardenpal-blog.vercel.app`)
7. Check "Allow credentials" ✅
8. Click "Save"

## Step 4: Update Main Website

After deployment, copy your live blog URL and update the main website:

1. Open: `/Users/shoshandagan/gardenpal-website/src/components/layout/Header.tsx`
2. Find the line with `https://gardenpal-blog.vercel.app`
3. Replace with your actual Vercel URL
4. Commit and push:
   ```bash
   cd /Users/shoshandagan/gardenpal-website
   git add src/components/layout/Header.tsx
   git commit -m "Update blog URL with live Vercel deployment"
   git push origin main
   ```

## Step 5: Test Everything

1. **Test Blog**: Visit your Vercel URL
2. **Test Sanity Studio**: Visit `https://your-vercel-url.vercel.app/studio`
3. **Test Main Website**: Check that the "Blog" button works on your live GardenPal site

## 🎉 Done!

Your blog is now live and accessible from your main GardenPal website!

## Troubleshooting

### Build Fails
- Check that all environment variables are set correctly in Vercel
- Check the build logs in Vercel dashboard

### Sanity Studio Doesn't Load
- Make sure you added your Vercel URL to Sanity CORS settings
- Check browser console for errors

### Images Don't Load
- Make sure `cdn.sanity.io` is in your Next.js image domains (already configured)
- Check that images in Sanity have proper assets

## Next Steps

1. **Custom Domain** (Optional): Add a custom domain like `blog.gardenpal.com` in Vercel settings
2. **Analytics**: Set up Vercel Analytics or Google Analytics
3. **SEO**: Submit your sitemap to Google Search Console: `https://your-url.vercel.app/sitemap.xml`

