function FinishScreen({ points, maxPoints, highScore, dispatch }) {
  const percent = Math.ceil((points / maxPoints) * 100);

  let emoji;
  if (percent === 100) emoji = "🥇";
  if (percent >= 80 && percent < 100) emoji = "🥳";
  if (percent >= 50 && percent < 80) emoji = "😎";
  if (percent >= 0 && percent < 50) emoji = "🤨";
  if (percent === 0) emoji = "🙈";
  return (
    <>
      <p className="result">
        You scored: <span>{emoji}</span>
        <strong>
          {points} out of {maxPoints} ({percent}%)
        </strong>
      </p>
      <p className="highscore">High Score: {highScore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
