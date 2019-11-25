import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

import RandomButton from "./components/Random"
import EmptyGridButton from "./components/ClearGrid"
import RunSimulationButton from "./components/RunSimulation"

const numRows: number = 50;
const numCols: number = 50;

const operations: Array<number[]> = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const generateEmptyGrid = () => {
  const rows: Array<number[]> = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

const App: React.FC = () => {
  const [grid, setGrid] = useState<Array<Array<number>>>(generateEmptyGrid());
  const [running, setRunning] = useState<boolean>(true);
  const runningRef = useRef<boolean>(running);

  runningRef.current = running;

  const runSimulation = useCallback(() => {
    console.log(runningRef.current)
    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors: number = 0;
            operations.forEach(([x, y]) => {
              const newI: number = i + x;
              const newK: number = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);

  return (
    <>
      <RunSimulationButton
        setRunning={setRunning}
        runningRef={runningRef}
        runSimulation={() => runSimulation()}
        running={running}
      />
      <RandomButton
        runSimulation={() => runSimulation()}
        numRows={numRows}
        numCols={numCols}
        setGrid={setGrid}
        runningRef={runningRef}
      />
      <EmptyGridButton
        setGrid={() => setGrid(generateEmptyGrid)}
        generateEmptyGrid={() => generateEmptyGrid()}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((_, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "black" : undefined,
                border: "solid 1px black"
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default App;