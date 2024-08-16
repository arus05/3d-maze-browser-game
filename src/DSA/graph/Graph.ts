import { MinHeap } from "../heap/MinHeap"

class Graph<T> {
    private _isDirected: boolean
    private _size: number
    private _adjMatrix: number[][]
    private _vertexData: T[]

    public constructor(size: number, isDirected: boolean = false) {
        this._size = size
        this._isDirected = isDirected
        this._adjMatrix = new Array(size).fill(null).map(() => {
            return new Array(size).fill(null)
        })
        this._vertexData = new Array<T>(this._size)
    }

    get size() {
        return this._size
    }

    get vertexData() {
        return this._vertexData
    }

    getData(vertexIndex: number) {
        if (vertexIndex < 0 || vertexIndex >= this.size) {
            throw new Error("Graph.getData: Invalid vertex")
        }

        return this.vertexData[vertexIndex]
    }

    addEdge(start: number, end: number, weight: number = 0) {
        if (start < 0 || start >= this.size || end < 0 || end >= this.size) {
            throw new Error("Graph.addEdge: Invalid vertices")
        }

        this._adjMatrix[start][end] = weight

        if (!this._isDirected) {
            this._adjMatrix[end][start] = weight 
        }
    }

    addVertexData(index: number, data: T) {
        if (
            index >= 0 && index < this._size
        ) {
            this.vertexData[index] = data
        }
    }

    getShortestPath(source: number, dest: number): ShortestPath {
        if (
            (source < 0 || source >= this._size) ||
            (dest < 0 || dest >= this._size)
        ) {
            throw new Error("Graph.getShortestPath: Invalid source and destination")
        }

        const distance = new Array<number>()
        const prev = new Array<number>()

        for (let i = 0; i < this._size; i++) {
            distance[i] = Number.MAX_VALUE
            prev[i] = i
        }

        distance[source] = 0
        
        const unvisited = new Set<number>()
        for (let i = 0; i < this._size; i++) {
            unvisited.add(i)
        }

        while (unvisited.size > 0) {
            const minVertex = Array.from(unvisited).reduce((prev, curr) => {
                return (distance[curr] < distance[prev]) ? curr : prev
            })

            unvisited.delete(minVertex)

            for (let i = 0; i < this._size; i++) {
                const edgeWeight = this._adjMatrix[minVertex][i]
                if ( edgeWeight !== null ) {
                    if (distance[minVertex] + edgeWeight < distance[i]) {
                        distance[i] = distance[minVertex] + edgeWeight
                        prev[i] = minVertex
                    }
                }
            }
        }
        
        const verticesInShortestPath = new Array<number>()
        let length = 0

        let curr = dest
        while (true) {
            verticesInShortestPath.unshift(curr)
            
            const prevOfCurr = prev[curr]

            if (prevOfCurr === curr) {
                break
            }

            length += this._adjMatrix[prevOfCurr][curr]

            curr = prevOfCurr
        }

        return new ShortestPath(verticesInShortestPath, length)
    }

    kruskal() {
        if (this._isDirected) {
            throw new Error("Graph.kruskal: Kruskal's only works for undirected graphs")
        }

        // sort edges
        const edgeArray = new Array<UndirectedEdge>()
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col <= row; col++) {
                if (this._adjMatrix[row][col] !== null) {
                    const edge = new UndirectedEdge(row, col, this._adjMatrix[row][col])
                    edgeArray.push(edge)
                }
            }
        }
        const edges = new MinHeap<UndirectedEdge>(edgeArray, (e1: UndirectedEdge, e2: UndirectedEdge) => {
            return e1.weight - e2.weight
        })

        // for each edge
            // if edge does not form a cycle, add it to the solution
        const includedEdges = new Set<UndirectedEdge>()
        const parent = new Array<number>(this.size).fill(0).map((_, index) => index)
        const height = new Array<number>(this.size).fill(0)
        while (edges.size > 0 && includedEdges.size < this.size - 1) {
            const minEdge = edges.extractMin()
            const firstRoot = this.findRoot(parent, minEdge.first)
            const secondRoot = this.findRoot(parent, minEdge.second)

            if (firstRoot !== secondRoot) {
                includedEdges.add(minEdge)
                this.union(parent, height, firstRoot, secondRoot)
            }
        }

        return includedEdges
    }

    private union(parent: number[], height: number[], first: number, second: number) {
        const firstRoot = this.findRoot(parent, first)
        const secondRoot = this.findRoot(parent, second)

        if (height[firstRoot] > height[secondRoot]) {
            parent[secondRoot] = firstRoot
        }
        else if (height[secondRoot] > height[firstRoot]) {
            parent[firstRoot] = secondRoot
        }
        else {
            parent[secondRoot] = firstRoot
            height[firstRoot] += 1
        }
    }

    private findRoot(parent: number[], index: number): number {
        let current = index

        while (parent[current] !== current) {
            current = parent[current]
        }

        return current
    }

}

class UndirectedEdge {
    first: number
    second: number
    weight: number

    constructor(first: number, second: number, weight: number = 0) {
        if (first < second) {
            this.first = first
            this.second = second
        }
        else {
            this.first = second
            this.second = first
        }
        this.weight = weight
    }
}

class DirectedEdge {
    start: number
    end: number
    weight: number

    constructor(start: number, end: number, weight: number = 0) {
        this.start = start
        this.end = end
        this.weight = weight
    }

    flip() {
        return new DirectedEdge(this.end, this.start, this.weight)
    }

}

class ShortestPath {
    // vertices sorted from src to dest
    vertices: Array<number>
    length: number

    constructor(vertices: Array<number>, length: number) {
        this.vertices = vertices
        this.length = length
    }
}

export { UndirectedEdge, Graph }