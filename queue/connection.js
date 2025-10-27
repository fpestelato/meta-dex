import { Redis } from "ioredis";

export const ENRICHMENT_QUEUE = "enrichment-queue";

export const connectionOpts = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT) || 6379,
};

export const redisConnection = new Redis(connectionOpts);
