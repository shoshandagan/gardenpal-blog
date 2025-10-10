import { supabase } from './client'

export interface AffiliateClick {
  post_slug: string
  product_id: string
  product_name: string
  affiliate_url: string
  platform: string
}

export interface PageView {
  post_slug: string
  referrer?: string
  user_agent?: string
}

/**
 * Track affiliate link click
 */
export async function trackAffiliateClick(click: AffiliateClick) {
  try {
    const { error } = await supabase.from('affiliate_clicks').insert([
      {
        ...click,
        clicked_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error('Error tracking affiliate click:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error('Error tracking affiliate click:', error)
    return { success: false, error }
  }
}

/**
 * Track page view
 */
export async function trackPageView(view: PageView) {
  try {
    const { error } = await supabase.from('page_views').insert([
      {
        ...view,
        viewed_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error('Error tracking page view:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error('Error tracking page view:', error)
    return { success: false, error }
  }
}

/**
 * Get affiliate click stats for a product
 */
export async function getProductClickStats(productId: string) {
  try {
    const { data, error, count } = await supabase
      .from('affiliate_clicks')
      .select('*', { count: 'exact', head: false })
      .eq('product_id', productId)

    if (error) {
      console.error('Error fetching click stats:', error)
      return { clicks: 0, error }
    }

    return { clicks: count || 0, data }
  } catch (error) {
    console.error('Error fetching click stats:', error)
    return { clicks: 0, error }
  }
}

