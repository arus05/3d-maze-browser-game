import { Graph } from "../../DSA/graph/Graph";
import { Border } from "../model/Border";
import { Maze } from "../model/Maze";
import { Square } from "../model/Square";

type Node = Square

class MazeGraph {
    nodes: ReadonlyArray<Node>
    edges: ReadonlySet<Edge>

    private constructor(nodes: ReadonlyArray<Node>, edges: Set<Edge>) {
        this.nodes = nodes
        this.edges = edges
    }

    static createFromMaze(maze: Maze): MazeGraph {
        const nodes = [...maze.squares]
        const edges = MazeGraph.getEdges(maze)

        return new MazeGraph(nodes, edges)
    }

    static generateRandom(width: number, height: number) {
        const nodes: Array<Node> = []
    }

    private static getEdges(maze: Maze): Set<Edge> {
        const edges = new Set<Edge>()

        for (const square of maze.squares) {
            if ((square.border.value & Border.RIGHT) === 0) {
                if (square.column + 1 < maze.width) {
                    const rightSquare = maze.squares[square.row * maze.width + square.column + 1]
                    edges.add(new Edge(square, rightSquare))
                    edges.add(new Edge(rightSquare, square))
                }
            }
            if ((square.border.value & Border.BOTTOM) === 0) {
                if (square.row + 1 < maze.height) {
                    const bottomSquare = maze.squares[(square.row + 1) * maze.width + square.column]
                    edges.add(new Edge(square, bottomSquare))
                    edges.add(new Edge(bottomSquare, square))
                }
            }
        }

        return edges
    }

    getShortestPath(source: Square, dest: Square): Array<Node> {
        const distance = new Map<Square, number>()
        const prev = new Map<Square, Square | null>()
        for (const node of this.nodes) {
            distance.set(node, Number.MAX_VALUE)
            prev.set(node, null)
        }
        distance.set(source, 0)
        
        const unvisited = new Set<Node>(this.nodes)

        while (unvisited.size > 0) {
            const minNode = Array.from(unvisited).reduce((prev, curr) => {
                return (distance.get(curr)! < distance.get(prev)!) ? curr : prev
            })

            unvisited.delete(minNode)
    
            for (const edge of this.edges) {
                if (edge.start === minNode) {
                    if (distance.get(edge.start)! + edge.weight < distance.get(edge.end)!) {
                        distance.set(edge.end, distance.get(edge.start)! + edge.weight)
                        prev.set(edge.end, edge.start)
                    }
                }
            }
        }
        
        const shortestPath = new Array<Node>()

        let curr = dest
        while (true) {
            if (curr === source) {
                shortestPath.push(curr)
                break
            }
            shortestPath.push(curr)
            curr = prev.get(curr)!
        }

        return shortestPath
    }
    
}

class Edge {
    start: Node
    end: Node
    weight: number
    
    constructor(start: Node, end: Node) {
        this.start = start
        this.end = end
        this.weight = (Math.sqrt(
            (this.start.column - this.end.column)**2 + (this.start.row - this.end.row)**2
        ))
    }
}

export { MazeGraph }