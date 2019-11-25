import React from "react"

interface EmptyGridButtonProps {
  setGrid: (rows: Array<Array<number>>) => void
  generateEmptyGrid: () => Array<Array<number>>
}

const EmptyGridButton = (props: EmptyGridButtonProps) => {
  const { setGrid, generateEmptyGrid } = props

  
  return (
    <button
      onClick={() => setGrid(generateEmptyGrid())}
    >Clear</button>
  )

}

export default EmptyGridButton