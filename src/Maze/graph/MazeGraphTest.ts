import { Graph } from "../../DSA/graph/Graph";
import { Border } from "../model/Border";
import { Maze } from "../model/Maze";
import { Square } from "../model/Square";

type Vertex = Square

class MazeGraph {
    private _graph: Graph<Vertex>
    private _indexOf = new Map<Vertex, number>

    constructor(maze: Maze) {
        this._graph = new Graph(maze.height * maze.width)

        for (let i = 0; i < this._graph.size; i++) {
            // initialize vertices
            this._graph.addVertexData(i, maze.squares[i])

            // initialize map
            this._indexOf.set(maze.squares[i], i)
        }

        // initialize edges
        for (let i = 0; i < this._graph.size; i++) {
            const square = maze.squares[i]
            if ((square.border.value & Border.RIGHT) === 0) {
                if (square.column + 1 < maze.width) {
                    const rightSquareIndex = square.row * maze.width + square.column + 1
                    const weight = 1
                    this._graph.addEdge(i, rightSquareIndex, weight)
                }
            }
            if ((square.border.value & Border.BOTTOM) === 0) {
                if (square.row + 1 < maze.height) {
                    const bottomSquareIndex = (square.row + 1) * maze.width + square.column
                    const weight = 1
                    this._graph.addEdge(i, bottomSquareIndex, weight)
                }
            }
        }
    }

    getShortestPath(src: Vertex, dest: Vertex): Array<Vertex> {
        const srcIndex = this._indexOf.get(src) ?? -1
        const destIndex = this._indexOf.get(dest) ?? -1

        if (srcIndex === -1 || destIndex === -1) {
            throw new Error("MazeGraph.getShortestPath: Invalid source or destination vertices")
        }

        const shortestPath = this._graph.getShortestPath(srcIndex, destIndex)
        const shortestPathIndices = shortestPath.vertices

        const shortestPathVertices = new Array<Vertex>()

        for (const i of shortestPathIndices) {
            shortestPathVertices.push(this._graph.getData(i))
        }

        return shortestPathVertices
    }
}

class MazeEdge {
    start: Vertex
    end: Vertex
    weight: number
    
    constructor(start: Vertex, end: Vertex) {
        this.start = start
        this.end = end
        this.weight = (Math.sqrt(
            (this.start.column - this.end.column)**2 + (this.start.row - this.end.row)**2
        ))
    }
}

export { MazeGraph }