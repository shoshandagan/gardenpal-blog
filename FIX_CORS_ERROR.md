# Fix CORS Error in Sanity Studio

## The Problem
You're seeing a `CorsOriginError` because your Sanity project needs to allow requests from `localhost`.

## The Solution - Add CORS Origins in Sanity Dashboard

### Step 1: Go to Sanity Dashboard
1. Open your browser and go to: **https://www.sanity.io/manage**
2. Log in with your Sanity account
3. Click on your project: **"gardenpal-blog-studio"** (Project ID: `80etgf14`)

### Step 2: Add CORS Origins
1. In the left sidebar, click **"API"**
2. Scroll down to **"CORS Origins"** section
3. Click **"Add CORS origin"**
4. Add the following origins (one at a time):
   - `http://localhost:3011`
   - `http://localhost:3010`
   - `http://localhost:3000`
   - `http://localhost:3001`
   - `http://localhost:3002`
   - `http://localhost:3003`
   - `http://localhost:3004`
   - `http://localhost:3005`
   - `http://localhost:3006`
   - `http://localhost:3007`
   - `http://localhost:3008`
   - `http://localhost:3009`
5. For each origin, make sure to **check the "Allow credentials" box** ✅
6. Click **"Save"** after adding each origin.

### Step 3: Restart Your Development Server
After adding the origins in the Sanity dashboard, restart your Next.js development server to ensure the changes take effect.

```bash
cd /Users/shoshandagan/gardenpal-blog/gardenpal-blog && pkill -f "next.*gardenpal-blog" && sleep 2 && PORT=3011 npm run dev
```

### Step 4: Access Sanity Studio
Go to your browser and visit: `http://localhost:3011/studio`

## Alternative: Use Sanity Studio V3 (Simpler)
If you continue having issues, we can switch to Sanity Studio V3 which has better localhost support.

## Troubleshooting
- Make sure you're logged into the correct Sanity account
- Double-check the project ID is `80etgf14`
- Ensure you're adding the exact URLs (including http://)
- Try clearing your browser cache after adding CORS origins