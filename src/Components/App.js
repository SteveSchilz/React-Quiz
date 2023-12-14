import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Progress from "./Progress.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";

// STATUSES: loading, error, ready, active, finished

const initialState = {
  questions: [],
  status: "loading",
  current: 0,
  answer: null,
};

// ACTIONS:
// * dataReceived: fetch data completed.
// * dataFailed:   failed to fetch data
// * start:        begin quiz
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "dataFailed":
      return { ...state, status: "error", questions: [] };
    case "start":
      return { ...state, status: "active", current: 0 };
    case "setCurrent":
      return { ...state, current: action.payload };
    case "newAnswer":
      const question = state.questions[state.current];
      return {
        ...state,
        answer: action.payload,
      };
    case "":
      return { ...state };
    default:
      throw new Error("Unknown action type: " + action.type);
  }
}

export default function App() {
  // Note that we Destructure state into question and status.
  const [{ questions, status, current, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const numQuestions = questions.length;

  function handleStart() {
    dispatch({ type: "start" });
  }
  function handlePrevious() {
    if (current > 0) {
      dispatch({ type: "setCurrent", payload: current - 1 });
    }
  }
  function handleNext() {
    if (current < numQuestions) {
      dispatch({ type: "setCurrent", payload: current + 1 });
    }
  }

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen length={numQuestions} handleStart={handleStart} />
        )}
        {status === "active" && (
          <>
            <Progress current={current} length={numQuestions} />
            <Question
              q={questions[current]}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              dispatch={dispatch}
              answer={answer}
            />
          </>
        )}
        {status === "error" && (
          <p>Error! (Make sure json-server is running with "npm run server"</p>
        )}
      </Main>
    </div>
  );
}
