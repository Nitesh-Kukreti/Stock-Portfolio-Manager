// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// 1. Create a function to initialize the client
const prismaClientSingleton = () => {
  // We use the 'pg' library to manage the actual connection pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool as any);

  return new PrismaClient({ adapter });
};

// 2. Setup the global type to avoid TypeScript errors
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// 3. Export the singleton instance
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// 4. In development, save the instance to 'globalThis'
// so it survives hot-reloading
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
