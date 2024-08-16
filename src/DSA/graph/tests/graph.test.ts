import { expect, test } from "vitest"
import { Graph, UndirectedEdge } from "../Graph"

test("Graph.getShortestPath", () => {
    const graph = new Graph<any>(7)
    graph.addEdge(0, 1, 2)
    graph.addEdge(0, 2, 6)
    graph.addEdge(1, 3, 5)
    graph.addEdge(2, 3, 8)
    graph.addEdge(3, 5, 15)
    graph.addEdge(3, 4, 10)
    graph.addEdge(4, 5, 6)
    graph.addEdge(4, 6, 2)
    graph.addEdge(5, 6, 6)

    const expectedVertices = [0, 1, 3, 4, 6]
    const expectedLength = 19
    
    const shortestPath = graph.getShortestPath(0, 6)
    
    expect(shortestPath.vertices).toEqual(expectedVertices)
    expect(shortestPath.length).toEqual(expectedLength)
})

test("Graph.kruskal", () => {
    const graph = new Graph<string>(7)
    graph.addVertexData(0, 'A')
    graph.addVertexData(1, 'B')
    graph.addVertexData(2, 'C')
    graph.addVertexData(3, 'D')
    graph.addVertexData(4, 'E')
    graph.addVertexData(5, 'F')
    graph.addVertexData(6, 'G')

    graph.addEdge(0, 1, 4)  
    graph.addEdge(0, 6, 10)
    graph.addEdge(0, 2, 9)  
    graph.addEdge(1, 2, 8)  
    graph.addEdge(2, 3, 5)  
    graph.addEdge(2, 4, 2)  
    graph.addEdge(2, 6, 7)  
    graph.addEdge(3, 4, 3)  
    graph.addEdge(3, 5, 7)  
    graph.addEdge(4, 6, 6)  
    graph.addEdge(5, 6, 11)

    const result = new Array(...graph.kruskal())
    result.sort((a: UndirectedEdge, b: UndirectedEdge) => {
        if (a.first !== b.first) {
            return a.first - b.first
        }
        return a.second - b.second
    })

    const expectedResult = new Array(
        new UndirectedEdge(0, 1, 4),
        new UndirectedEdge(1, 2, 8),
        new UndirectedEdge(2, 4, 2),
        new UndirectedEdge(3, 4, 3),
        new UndirectedEdge(3, 5, 7),
        new UndirectedEdge(4, 6, 6),
    )

    expect(result).toEqual(expectedResult)
})