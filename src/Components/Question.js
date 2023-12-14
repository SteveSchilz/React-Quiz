import Options from "./Options.js";

export default function Question({ q, dispatch, answer }) {
  return (
    <div>
      <h4>Question: {q.question}</h4>
      <Options
        options={q.options}
        dispatch={dispatch}
        answer={answer}
        correctOption={q.correctOption}
      />
    </div>
  );
}
