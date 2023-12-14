import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import NextButton from "./NextButton.js";
import Progress from "./Progress.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";

// STATUSES: loading, error, ready, active, finished

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
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
      return { ...state, status: "active", index: 0 };
    case "setCurrent":
      return { ...state, index: action.payload };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      if (state.index < state.questions.length)
        return { ...state, index: state.index + 1, answer: null };
      else return state;
    case "":
      return { ...state };
    default:
      throw new Error("Unknown action type: " + action.type);
  }
}

export default function App() {
  // Note that we Destructure state into question and status.
  const [{ questions, status, index, answer }, dispatch] = useReducer(
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
    if (index > 0) {
      dispatch({ type: "setCurrent", payload: index - 1 });
    }
  }
  function handleNext() {
    if (index < numQuestions) {
      dispatch({ type: "setCurrent", payload: index + 1 });
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
            <Progress current={index} length={numQuestions} />
            <Question
              q={questions[index]}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
        {status === "error" && (
          <p>Error! (Make sure json-server is running with "npm run server"</p>
        )}
      </Main>
    </div>
  );
}
