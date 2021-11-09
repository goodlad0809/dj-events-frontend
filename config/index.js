export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"
export const PER_PAGE = process.env.PER_PAGE || 5
export const NEXT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"
export const IS_PROD = process.env.NODE_ENV !== "development"