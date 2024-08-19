import { Graph, UndirectedEdge } from "../../DSA/graph/Graph";
import { Border } from "../model/Border";
import { Square } from "../model/Square";
import { getRandomInt } from "../utils/utils";
import { Solution } from "./Solution";

type Vertex = Square

class MazeGraph {
    private _graph: Graph<Vertex>
    private _indexOf = new Map<Vertex, number>

    constructor(squares: Array<Square>, width: number, height: number) {
        this._graph = new Graph(squares.length)

        for (let i = 0; i < this._graph.size; i++) {
            // initialize vertices
            this._graph.addVertexData(i, squares[i])

            // initialize map
            this._indexOf.set(squares[i], i)
        }

        // initialize edges
        for (let i = 0; i < this._graph.size; i++) {
            const square = squares[i]
            if ((square.border.value & Border.RIGHT) === 0) {
                if (square.column + 1 < width) {
                    const rightSquareIndex = square.row * width + square.column + 1
                    const weight = 1
                    this._graph.addEdge(i, rightSquareIndex, weight)
                }
            }
            if ((square.border.value & Border.BOTTOM) === 0) {
                if (square.row + 1 < height) {
                    const bottomSquareIndex = (square.row + 1) * width + square.column
                    const weight = 1
                    this._graph.addEdge(i, bottomSquareIndex, weight)
                }
            }
        }
    }

    static generateRandomMazeSquares(width: number, height: number): Array<Square> {
        const MIN_WEIGHT = 1
        const MAX_WEIGHT = 1000

        // generate generic maze graph with random weights
        const size = width * height
        const graph = new Graph(size)
        for (let vertexIndex = 0; vertexIndex < size; vertexIndex++) {
            const row = Math.floor(vertexIndex / width)
            const col = vertexIndex % width
            if (col < width - 1) {
                // add right edge
                graph.addEdge(vertexIndex, vertexIndex + 1, getRandomInt(MIN_WEIGHT, MAX_WEIGHT))
            }
            if (row < height - 1) {
                // add bottom edge
                graph.addEdge(vertexIndex, vertexIndex + width, getRandomInt(MIN_WEIGHT, MAX_WEIGHT))
            }
        }

        // find the minimum spanning tree using kruskal
        const edges = graph.kruskal()

        // turn the minimum spanning tree into an array of squares
        const squares = new Array<Square>(size)
        for (let i = 0; i < size; i++) {
            const row = Math.floor(i / width)
            const col = i % width  
            squares[i] = new Square(i, row, col, new Border(Border.ALL))
        }

        edges.forEach((edge: UndirectedEdge) => {
            if (Math.abs(edge.first - edge.second) === 1) {
                // horizontal edge
                if (edge.first < edge.second) {
                    squares[edge.first].border.remove(Border.RIGHT)
                    squares[edge.second].border.remove(Border.LEFT)
                }
                else {
                    squares[edge.first].border.remove(Border.LEFT)
                    squares[edge.second].border.remove(Border.RIGHT)
                }
            }
            else {
                // vertical edge
                if (edge.first < edge.second) {
                    squares[edge.first].border.remove(Border.BOTTOM)
                    squares[edge.second].border.remove(Border.TOP)
                }
                else {
                    squares[edge.first].border.remove(Border.TOP)
                    squares[edge.second].border.remove(Border.BOTTOM)
                }
            }
        })

        return squares
    }

    solve(src: Vertex, dest: Vertex): Solution {
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

        return new Solution(shortestPathVertices)
    }
    
}

export { MazeGraph }