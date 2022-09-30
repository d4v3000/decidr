import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../utils/trpc";

const QuestionPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery(["questions.get-by-id", { id }]);

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Question not found</div>;

  return (
    <>
      <div className="pt-6 gap-3 flex flex-col justify-center items-center w-full h-full">
        {data.isOwner && (
          <div className="bg-red-200 rounded-md p-3">You are the Owner!</div>
        )}
        <p className="font-bold text-xl">Question: </p>
        <p className="font-bold text-lg">{data.question?.question}</p>
      </div>
    </>
  );
};

function QuestionPage() {
  const { query } = useRouter();
  const { id } = query;

  if (typeof id !== "string") {
    return <div>Invalid id</div>;
  }

  return <QuestionPageContent id={id} />;
}

export default QuestionPage;
