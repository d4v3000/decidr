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

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutate({ question: question });
        }}
        className="w-1/3"
      >
        <input
          ref={inputRef}
          disabled={isLoading}
          placeholder="Enter a question"
          className="border border-gray-400 rounded-md bg-transparent w-full text-gray-400 p-2 active:outline-none focus:outline-none"
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
        />
      </form>
    </>
  );
}

export default QuestionCreator;
