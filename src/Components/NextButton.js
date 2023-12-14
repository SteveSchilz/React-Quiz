function NextButton({ index, numQuestions, dispatch, answer }) {
  if (answer === null) return null;
  const maxIndex = numQuestions - 1;

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        index < maxIndex
          ? dispatch({ type: "nextQuestion" })
          : dispatch({ type: "finish" })
      }
    >
      {index < maxIndex ? "Next" : "Finish"}
    </button>
  );
}

export default NextButton;
