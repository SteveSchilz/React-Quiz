import Options from "./Options.js";

export default function Question({ q, handleNext, handlePrevious }) {
  return (
    <div>
      <h4>Question: {q.question}</h4>
      <Options options={q.options} />
      <button>Check</button>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
