import React, { useEffect, useState, useCallback } from "react";

const GRID_SIZE = 10;

function getRandomPosition(snakeBody = []) {
  while (true) {
    const position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    const isOnSnake = snakeBody.some(
      (segment) => segment.x === position.x && segment.y === position.y
    );

    if (!isOnSnake) {
      return position;
    }
  }
}

function Row({ snakeHead, food, rowIndex }) {
  function isSnake(rowIndex, index) {
    return snakeHead.some((position) => {
      return rowIndex === position.y && index === position.x;
    });
  }
  return (
    <div className="row">
      {[...Array(GRID_SIZE)].map((_, index) => (
        <Block
          key={index}
          isSnake={isSnake(rowIndex, index)}
          isFood={food.x === index && food.y === rowIndex}
        />
      ))}
    </div>
  );
}

function Block({ isSnake, isFood }) {
  return (
    <div className={`block ${isSnake && "snake"} ${isFood && "food"}`}></div>
  );
}

export default function SnakeGame({ keyPress }) {
  const [snakeLength, setSnakeLength] = useState(3);
  const [tail, setTail] = useState([{ x: 0, y: 0 }]);
  const [food, setFood] = useState(() => getRandomPosition([{ x: 0, y: 0 }]));

  const moveSnake = useCallback(() => {
    const snakeHead = tail[tail.length - 1];
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
      if (entry.x === food.x && entry.y === food.y) {
        setSnakeLength((l) => l + 1);
        setFood(getRandomPosition([...tail, entry]));
        setTail((t) => [...t, entry]);
      } else {
        setTail((t) => {
          const newTail = [...t, entry];
          if (newTail.length > snakeLength) {
            return newTail.slice(1);
          }
          return newTail;
        });
      }
    }
  }, [keyPress, tail, snakeLength, food]);

  useEffect(() => {
    const int = setInterval(() => {
      moveSnake();
    }, 200);

    return () => {
      clearInterval(int);
    };
  }, [moveSnake]);

  return (
    <div className="container">
      {[...Array(GRID_SIZE)].map((_, index) => (
        <Row key={index} rowIndex={index} snakeHead={tail} food={food} />
      ))}
    </div>
  );
}
