
type EnvType = "development" | "production" | "test";

// Normalized NODE_ENV (defaults to 'development' if undefined)

export const NODE_ENV: EnvType =
  (process.env.NODE_ENV as EnvType) || "development";

// Boolean flags for easy usage
export const ENV = {
  DEV: NODE_ENV === "development",
  PROD: NODE_ENV === "production",
  TEST: NODE_ENV === "test",
} as const;

//  Optional helpers (use only if you prefer function style)
export const isDev = () => ENV.DEV;
export const isProd = () => ENV.PROD;
export const isTest = () => ENV.TEST;
