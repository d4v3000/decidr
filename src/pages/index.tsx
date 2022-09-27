import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { prisma } from "../server/db/client";

const Home: NextPage = (props: any) => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <>
      <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
        {data[0]?.question}
      </div>
    </>
  );
};

export default Home;
