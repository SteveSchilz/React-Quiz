import { useState, useReducer } from "react";

// Reducer Function
// @param state = current state,
// @param action = some action to take(parameter from dispatch function)
//        action is {type: stuff,  payload=value}
// @returns new State value  (Whatever value we return will become the new state)
function reducer(state, action) {
  console.log(state, action);

  if (action.type === "inc") {
    return state + action.payload;
  } else if (action.type === "dec") {
    return state - action.payload;
  } else if (action.type === "setCount") {
    return action.payload;
  } else if (action.type === "defineCount") {
    return action.payload;
  }
  return state + action.payload;
}

function DateCounter() {
  // useReducer function returns current state and a dispatch function
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: step });
  };

  const inc = function () {
    dispatch({ type: "inc", payload: step });
  };

  const defineCount = function (e) {
    dispatch({ type: "defineCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "defineCount", payload: 0 });
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
