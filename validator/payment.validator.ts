import { PackId } from "@/util/types";
import { z } from "zod";

export const paymentSchema = z.object({
  packId: z.enum(PackId),
});

export const paymentMetadataSchema = z.object({
  userId: z.string(),
  creditsCount: z.number(),
  packId: z.enum(PackId),
});
