function Progress({ current, length }) {
  return (
    <div className="progress">
      {current + 1} of {length}
      <span>===</span>
    </div>
  );
}

export default Progress;
