//REFERENCING ENVIRONMENT VARIABLE to reference our hosted hosting port via strapi or dev 
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export const NEXT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'

export const PER_PAGE = 3