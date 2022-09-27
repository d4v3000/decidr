import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../../server/db/client";

export const questionRouter = trpc.router().query("get-all", {
  async resolve() {
    return await prisma.question.findMany();
  },
});
