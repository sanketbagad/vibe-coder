import { RateLimiterPrisma } from "rate-limiter-flexible";
import prisma from "./db";
import { auth } from "@clerk/nextjs/server";

const FREE_POINTS = 5; // Free points per month
const FREE_DURATION = 30 * 24 * 60 * 60; // 30 days in seconds
const GENERATION_COST = 1; // Cost per generation

export async function getUsageTracker() {
  const rateLimiter = new RateLimiterPrisma({
    storeClient: prisma,
    tableName: "Usage",
    points: FREE_POINTS,
    duration: FREE_DURATION,
  });

  return rateLimiter;
}

export async function consumeCredits() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const usageTracker = await getUsageTracker();

  const result = await usageTracker.consume(userId, GENERATION_COST);

  return result;
}

export async function getUserUsage() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const usageTracker = await getUsageTracker();
  const usage = await usageTracker.get(userId);

  return usage;
}
