import { createTRPCRouter, publicProcedure } from "../trpc";
import { v4 as uuidv4 } from "uuid";
import { env } from "~/env.mjs";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { z } from "zod";

const s3Client = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: env.NEXT_PUBLIC_S3_ACESS_KEY,
    secretAccessKey: env.NEXT_PUBLIC_S3_SECRET_KEY,
  },
});

export const pollRouter = createTRPCRouter({
  createPresignedUrl: publicProcedure.mutation(async () => {
    const imageId = uuidv4();

    return createPresignedPost(s3Client, {
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: imageId,
      Expires: 60,
      Fields: {
        key: imageId,
      },
      Conditions: [["starts-with", "$Content-Type", "image/"]],
    });
  }),
  deleteImage: publicProcedure
    .input(
      z.object({
        key: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await s3Client.send(
        new DeleteObjectCommand({
          Key: input.key,
          Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME,
        })
      );
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        options: z.array(
          z.object({ title: z.string(), imgUrl: z.string().nullish() })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.poll.create({
        data: {
          title: input.title,
          options: {
            create: input.options.map((option) => ({
              name: option.title,
              rating: 0,
            })),
          },
        },
      });
    }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.poll.findUnique({
        where: {
          id: input.id,
        },
        include: {
          options: true,
        },
      });
    }),
});
