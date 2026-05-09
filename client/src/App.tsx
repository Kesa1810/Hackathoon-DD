// react
import { useState, useEffect, useRef } from "react";

const textToType = "The quick brown fox jumps over the lazy dog";

export default function App() {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);

  const intervalRef = useRef<number | null>(null);

  // Start timer on first keystroke
  const handleChange = (value: string) => {
    if (startTime === null) {
      setStartTime(Date.now());
    }
    setInput(value);
  };

  // WPM calculation loop
  useEffect(() => {
    if (startTime === null) return;

    intervalRef.current = window.setInterval(() => {
      const now = Date.now();
      const timeInMinutes = (now - startTime) / 1000 / 60;

      const wordsTyped = input.trim().split(/\s+/).length;

      const calculatedWpm =
        timeInMinutes > 0 ? Math.round(wordsTyped / timeInMinutes) : 0;

      setWpm(calculatedWpm);
    }, 500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [input, startTime]);

  const isCorrect = textToType.startsWith(input);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial",
      padding: "20px"
    }}>
      
      <h2>Typing Racer</h2>

      <p style={{ fontSize: "20px", marginBottom: "20px", textAlign: "center" }}>
        {textToType}
      </p>

      <input
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Start typing..."
        style={{
          padding: "10px",
          fontSize: "18px",
          width: "400px",
          border: "2px solid gray",
          borderColor: isCorrect ? "green" : "red"
        }}
      />

      <div style={{ marginTop: "15px", fontSize: "18px" }}>
        🚀 WPM: <b>{wpm}</b>
      </div>

      <p>
        {isCorrect ? "✔ On track" : "❌ Typing error"}
      </p>

    </div>
  );
}