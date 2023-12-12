import { useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
}
