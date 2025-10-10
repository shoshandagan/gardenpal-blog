import { AlertCircle } from 'lucide-react'

export function AffiliateDisclosure() {
  return (
    <div className="bg-garden-accent/10 border-l-4 border-garden-leaf rounded-r-lg p-4 my-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-garden-leaf flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="font-semibold">Affiliate Disclosure:</strong> This post contains affiliate links. 
            If you purchase through these links, we may earn a small commission at no additional cost to you. 
            This helps support our blog and allows us to continue providing valuable gardening content. 
            We only recommend products we genuinely believe in and have researched thoroughly.
          </p>
        </div>
      </div>
    </div>
  )
}
