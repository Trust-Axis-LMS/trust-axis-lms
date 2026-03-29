export const IS_DEV = process.env.NODE_ENV === "development";

export const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 
  (IS_DEV ? "http://localhost:3000" : "https://trustacg.com");

export const COURSES_SITE_URL = process.env.NEXT_PUBLIC_COURSES_SITE_URL || 
  (IS_DEV ? "http://localhost:3001" : "https://train.trustacg.com");
