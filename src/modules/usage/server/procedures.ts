import { getUserUsage, getUsageTracker } from "@/lib/usage";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const usageRouter = createTRPCRouter({
  status: protectedProcedure.query(async () => {
    try {
      const usage = await getUserUsage();
      return usage;
    } catch (error) {
      return null;
    }
  }),
});
