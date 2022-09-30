import { z } from "zod";
import { prisma } from "../../server/db/client";
import { createRouter } from "./context";

export const questionRouter = createRouter()
  .query("get-all-my-questions", {
    async resolve({ ctx }) {
      if (!ctx.token) return [];
      return await prisma.question.findMany({
        where: {
          ownerToken: {
            equals: ctx.token,
          },
        },
      });
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const question = await prisma.question.findFirst({
        where: {
          id: input.id,
        },
      });

      return { question, isOwner: question?.ownerToken === ctx.token };
    },
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(5).max(255),
      options: z.array(z.string().max(255)).min(2),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) return { error: "Unauthorized" };
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
          ownerToken: ctx.token,
        },
      });
    },
  });
