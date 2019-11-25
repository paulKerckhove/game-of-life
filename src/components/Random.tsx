import React from "react"

interface RandomButtonProps {
  numRows: number
  numCols: number
  setGrid: (rows: Array<Array<number>>) => void
  runSimulation: () => void
  runningRef: React.MutableRefObject<boolean>
}

const RandomButton = (props: RandomButtonProps) => {
  const { numCols, numRows, setGrid, runSimulation, runningRef } = props
  return (
    <div>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.8 ? 1 : 0))
            );
          }
          setGrid(rows);
          runningRef.current = true;
          runSimulation();
        }}
      >
        Randomize
</button>
    </div>
  )
}

export default RandomButton