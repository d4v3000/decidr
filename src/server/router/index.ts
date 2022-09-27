import * as trpc from "@trpc/server";
import { questionRouter } from "./questions";
import superjson from "superjson";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge("questions.", questionRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
