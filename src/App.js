import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";

// STATUSES: loading, error, ready, active, finished

const initialState = {
  questions: [],
  status: "loading",
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
      return { ...state, status: "active" };
    case "":
      return { ...state };
    default:
      throw new Error("Unknown action type: " + action.type);
  }
}

export default function App() {
  // Note that we Destructure state into question and status.
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  function handleStart() {
    dispatch({ type: "start" });
  }

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen length={questions.length} handleStart={handleStart} />
        )}
        {status === "active" && <Question q={questions[0]} />}
        {status === "error" && (
          <p>Error! (Make sure json-server is running with "npm run server"</p>
        )}
      </Main>
    </div>
  );
}
