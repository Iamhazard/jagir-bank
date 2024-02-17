import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { redisdb } from "./redisdb";
import { db } from "./db";

// Initialize PrismaClient
const prisma = new PrismaClient();

// Initialize Redis adapter
const redisAdapter =  UpstashRedisAdapter(redisdb);

// Initialize Prisma adapter
const prismaAdapter = PrismaAdapter(db);

// Create a composite adapter
const compositeAdapter = {
  getAdapter: async () => {
    return {
      ...redisAdapter,
      ...prismaAdapter,
    };
  },
};

export default compositeAdapter;
