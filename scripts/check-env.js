// Simple script to check if environment variables are loaded
console.log('=== Environment Variables Check ===')
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET)
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('===================================')

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is missing!')
  process.exit(1)
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.error('❌ NEXT_PUBLIC_SANITY_DATASET is missing!')
  process.exit(1)
}

console.log('✅ All required environment variables are set!')

