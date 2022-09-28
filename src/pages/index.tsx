import type { NextPage } from "next";
import Link from "next/link";
import QuestionCreator from "../components/QuestionCreator";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <>
      <div className="pt-6 gap-3 flex flex-col items-center w-full min-h-screen bg-gray-900">
        <QuestionCreator />
        {/* <p className="font-bold text-xl">Questions: </p>
        {data.map((question) => (
          <Link key={question.id} href={"/" + question.id}>
            <div className="flex flex-row cursor-pointer">
              <p className="font-bold text-lg">{question.question}</p>
            </div>
          </Link>
        ))} */}
      </div>
    </>
  );
};

export default Home;
