import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";

// STATUSES: loading, error, ready, active, finished

const initialState = {
  questions: [],
  status: "loading",
};

// ACTIONS:
// * dataReceived: fetch data completed.
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "dataFailed":
      return { ...state, status: "error", questions: [] };
    case "":
      return { ...state };
    default:
      throw new Error("Unknown action type: " + action.type);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        {state.status === "loading" && <Loader />}
        {state.status === "ready" && <p>Ready</p>}
        {state.status === "error" && <p>Error!</p>}
      </Main>
    </div>
  );
}
