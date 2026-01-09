import { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);
  const hrs = String(Math.floor(time / 3600)).padStart(2, "0");
  const mins = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const secs = String(time % 60).padStart(2, "0");
  return (
    <div>
      <h2>Timer App</h2>

      <p>
        {hrs}:{mins}:{secs}
      </p>

      <button onClick={() => setRunning(true)}>Start</button>
      <button onClick={() => setRunning(false)}>Stop</button>
      <button
        onClick={() => {
          setRunning(false);
          setTime(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Timer;
