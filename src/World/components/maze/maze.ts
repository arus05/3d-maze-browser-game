import { Group, Object3D, Vector3 } from "three"
import { createCellBorders } from "./cell"
import { Maze } from "../../../Maze/Maze"

function createMaze(maze: Maze, height: number = 7, blocksPerBorder: number = 5, blockSize: number = 1): {
    mazeMesh: Object3D,
    mazeEntrance: Vector3
} {
    const mazeMesh = new Group()
    mazeMesh.position.y += (height / 2)

    const mazeEntrance = new Vector3()

    for (const square of maze.squares) {
        const cellBorders = createCellBorders(square, "grey", height, blocksPerBorder, blockSize)
        mazeMesh.add(cellBorders)

        if (maze.entrace === square) {
            mazeEntrance.x = cellBorders.position.x + (blocksPerBorder * blockSize) / 2
            mazeEntrance.z = cellBorders.position.z + (blocksPerBorder * blockSize) / 2
        }
    }

    return {
        mazeMesh,
        mazeEntrance
    }
}

export { createMaze }