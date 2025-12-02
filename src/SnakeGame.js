import React, { useEffect, useState } from "react";

const GRID_SIZE = 10;

function Row({ snakeHead, rowIndex }) {
  function isSnake(rowIndex, index) {
    return snakeHead.some((position) => {
      return rowIndex === position.y && index === position.x;
    });
  }
  return (
    <div className="row">
      {[...Array(GRID_SIZE)].map((_, index) => (
        <Block key={index} isSnake={isSnake(rowIndex, index)} />
      ))}
    </div>
  );
}

function Block({ isSnake }) {
  return <div className={`block ${isSnake && "snake"}`}></div>;
}

export default function SnakeGame({ keyPress }) {
  const [snakeLength, setSnakeLength] = useState(4);
  const [tail, setTail] = useState([{ x: 0, y: 0 }]);

  function moveSnake(keyPress) {
    setTail((t) => {
      const snakeHead = t[t.length - 1];
      let entry = null;
      if (keyPress === "Down") {
        entry = {
          y: Math.min(snakeHead.y + 1, GRID_SIZE - 1),
          x: snakeHead.x,
        };
      }

      if (keyPress === "Up") {
        entry = {
          y: Math.max(snakeHead.y - 1, 0),
          x: snakeHead.x,
        };
      }

      if (keyPress === "Right") {
        entry = {
          y: snakeHead.y,
          x: Math.min(snakeHead.x + 1, GRID_SIZE - 1),
        };
      }

      if (keyPress === "Left") {
        entry = {
          y: snakeHead.y,
          x: Math.max(snakeHead.x - 1, 0),
        };
      }

      if (entry) {
        const newTail = [...t, entry];
        if (newTail.length > snakeLength) {
          return newTail.slice(1);
        }
        return newTail;
      }

      return t;
    });
  }

  useEffect(() => {
    const int = setInterval(() => {
      moveSnake(keyPress);
    }, 500);

    return () => {
      clearInterval(int);
    };
  }, [keyPress]);

  return (
    <div className="container">
      {[...Array(GRID_SIZE)].map((_, index) => (
        <Row key={index} rowIndex={index} snakeHead={tail} />
      ))}
    </div>
  );
}
