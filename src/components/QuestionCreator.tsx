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
      >
        <input
          ref={inputRef}
          disabled={isLoading}
          className="border border-gray-500 rounded-md"
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
        />
      </form>
    </>
  );
}

export default QuestionCreator;
