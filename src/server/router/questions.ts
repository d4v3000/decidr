import * as trpc from "@trpc/server";
import { create } from "domain";
import { z } from "zod";
import { prisma } from "../../server/db/client";

export const questionRouter = trpc
  .router()
  .query("get-all", {
    async resolve() {
      return await prisma.question.findMany();
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.question.findFirst({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(5).max(255),
      options: z.array(z.string().max(255)).min(2),
    }),
    async resolve({ input }) {
      return await prisma.question.create({
        data: {
          question: input.question,
          options: {
            create: [
              ...input.options.map((option) => {
                return {
                  answer: option,
                  value: 0,
                };
              }),
            ],
          },
        },
      });
    },
  });
