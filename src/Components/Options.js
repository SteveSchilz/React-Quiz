function Options({ options, dispatch, answer, correctOption }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {" "}
      {options.map((option, index) => (
        <button
          key={index}
          className={`btn btn-option 
      ${index === answer ? "answer" : ""}
      ${hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""}
      `}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
