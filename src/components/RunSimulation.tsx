import React from "react"

interface RunSimulationButtonProps {
  setRunning: (running: boolean) => void
  runningRef: React.MutableRefObject<boolean> 
  runSimulation: () => void
  running: boolean
}

const RunSimulationButton = (props: RunSimulationButtonProps) => {
  const { setRunning, running, runSimulation, runningRef } = props
  return (
    <button
      onClick={() => {
        setRunning(!running);
        if (!running) {
          runningRef.current = true;
          runSimulation();
        }
      }}
    >
      {running ? "stop" : "start"}
    </button>
  )
}

export default RunSimulationButton