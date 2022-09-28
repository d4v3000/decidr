import React from "react";
import { trpc } from "../utils/trpc";

function QuestionCreator() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: () => {
      setQuestion("");
      client.invalidateQueries("questions.get-all");
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });
  const [question, setQuestion] = React.useState("");
  const [answers, setAnswers] = React.useState<string[]>([]);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutate({ question: question });
        }}
        className="w-1/3 gap-6 flex flex-col my-20"
      >
        <input
          ref={inputRef}
          disabled={isLoading}
          placeholder="Enter a question"
          className="border border-gray-400 rounded-md bg-transparent w-full text-gray-400 p-2 active:outline-none focus:outline-none"
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
        />

        <div className="h-96 overflow-auto flex flex-col gap-2 p-4">
          {answers.map((answer, index) => (
            <div className="flex gap-2" key={index}>
              <input
                disabled={isLoading}
                placeholder="Enter an answer"
                className="border border-gray-400 rounded-md bg-transparent w-full text-gray-400 p-2 active:outline-none focus:outline-none"
                type="text"
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
              />

              <button
                className="w-10 h-10 bg-transparent border border-gray-400 rounded-md p-2 text-gray-400"
                onClick={() => {
                  const newAnswers = [...answers];
                  newAnswers.splice(index, 1);
                  setAnswers(newAnswers);
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button
          className="w-full bg-transparent border border-gray-400 border-dashed rounded-md p-2 text-gray-400"
          onClick={() => answers.push("")}
        >
          Create new answer +
        </button>
      </form>
    </>
  );
}

export default QuestionCreator;
