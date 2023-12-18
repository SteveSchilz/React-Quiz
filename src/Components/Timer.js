import { useEffect } from "react";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function Timer({ secondsRemaining, dispatch }) {
  useEffect(
    function doTimer() {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      // Cancel the previous timer in the cleanup function
      return () => clearInterval(id);
    },

    [dispatch]
  );

  return <div className="timer">{formatTime(secondsRemaining)}</div>;
}

export default Timer;
