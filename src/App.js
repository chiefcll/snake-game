import logo from "./logo.svg";
import "./App.css";
import SnakeGame from "./SnakeGame";
import { useState } from "react";

function App() {
  const [keyPress, setKeyPress] = useState();
  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      setKeyPress("Down");
      return;
    }
    if (e.key === "ArrowUp") {
      setKeyPress("Up");
      return;
    }

    if (e.key === "ArrowLeft") {
      setKeyPress("Left");
      return;
    }

    if (e.key === "ArrowRight") {
      setKeyPress("Right");
    }
  }
  document.addEventListener("keydown", handleKeyDown);

  return (
    <div className="App">
      <SnakeGame keyPress={keyPress || "Down"}></SnakeGame>
    </div>
  );
}

export default App;
