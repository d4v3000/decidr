import React from "react";
import { trpc } from "../utils/trpc";
import { PlusIcon } from "@heroicons/react/24/solid";

function QuestionCreator() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: () => {
      setQuestion("");
      setAnswers(["", ""]);
      client.invalidateQueries("questions.get-all-my-questions");
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });
  const [question, setQuestion] = React.useState("");
  const [answers, setAnswers] = React.useState<string[]>(["", ""]);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutate({ question: question, options: answers });
        }}
        className="w-2/5 gap-6 flex flex-col my-20"
      >
        <div className="p-3">
          <input
            ref={inputRef}
            disabled={isLoading}
            placeholder="Enter a question"
            className="border border-gray-600 focus:border-gray-500 rounded-md bg-transparent w-full  p-2 active:outline-none focus:outline-none"
            type="text"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="max-h-96 overflow-auto flex flex-col gap-2 p-3">
          {answers.map((answer, index) => (
            <div className="flex gap-2 relative" key={index}>
              <input
                disabled={isLoading}
                autoFocus={index === answers.length - 1}
                placeholder="Enter an answer"
                className="border border-gray-600 focus:border-gray-500 rounded-md bg-transparent w-full  p-2 active:outline-none focus:outline-none"
                type="text"
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
              />

              <button
                type="button"
                className="w-10 h-10 absolute right-1 bg-transparent rounded-md p-2 "
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

        <div className="p-3 flex flex-col items-center gap-4">
          <button
            className="flex justify-center w-full py-4 gap-1 bg-transparent border border-gray-600 hover:border-gray-500 hover:text-gray-400 border-dashed rounded-md "
            onClick={(e) => {
              e.preventDefault();
              setAnswers([...answers, ""]);
            }}
          >
            <PlusIcon className="w-6 h-6 inline-block" />
            Add option
          </button>
          <button type="submit" className="w-fit">
            <span className="font-bold text-xl">Create question</span>
          </button>
        </div>
      </form>
    </>
  );
}

export default QuestionCreator;
