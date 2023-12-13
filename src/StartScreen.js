export default function StartScreen({ length, handleStart }) {
  function handleCLick() {
    handleStart();
  }

  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3 className="">{length} questions to test your React Mastery</h3>
      <button className="btn btn-ui" onClick={handleCLick}>
        Let's Start
      </button>
    </div>
  );
}
