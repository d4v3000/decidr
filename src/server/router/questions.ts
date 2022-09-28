import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../server/db/client";

export const questionRouter = trpc
  .router()
  .query("get-all", {
    async resolve() {
      return await prisma.question.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(5).max(255),
    }),
    async resolve({ input }) {
      const newQuestion = await prisma.question.create({
        data: {
          question: input.question,
        },
      });
    },
  });
