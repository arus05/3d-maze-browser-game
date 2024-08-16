import { test, expect } from "vitest"
import { getRandomInt } from "../../../Maze/utils/utils"
import { MinHeap } from "../MinHeap"
import { UndirectedEdge } from "../../graph/Graph"

interface Custom {
    value: number
}

const customComparator = (obj1: Custom, obj2: Custom): number => {
    if (obj1.value < obj2.value) {
        return -1
    }
    if (obj1.value > obj2.value) {
        return 1
    }
    return 0
}

const CustomSortAscComparator = (obj1: Custom, obj2: Custom) => {
    return obj1.value - obj2.value
}

const MIN = 1
const MAX = 500

const numberArray = new Array<number>()
let minNumber = Number.MAX_VALUE
for (let i = 0; i < 8; i++) {
    const random = getRandomInt(MIN, MAX)
    if (random < minNumber) {
        minNumber = random
    }
    numberArray.push(minNumber)
}

const customArray = new Array<Custom>()
let minCustomValue = Number.MAX_VALUE
for (let i = 0; i < 8; i++) {
    const random = getRandomInt(MIN, MAX)
    if (random < minCustomValue) {
        minCustomValue = random
    }
    customArray.push({
        value: random
    })
}


test("MinHeap.buildHeap", () => {
    const expected = Math.min(...numberArray)

    const heap = new MinHeap<number>(numberArray)

    expect(heap.peekMin()).toEqual(expected)

})

test("MinHeap.extractMin", () => {
    const expectedMin = Math.min(...numberArray)
    const expectedSize = numberArray.length - 1
    
    const heap = new MinHeap<number>(numberArray)

    const max = heap.extractMin()
    const size = heap.size

    expect(max).toEqual(expectedMin)
    expect(size).toEqual(expectedSize)
})

test("MinHeap.extractMin (2)", () => {
    const expected = [...numberArray]
    expected.sort((a: number, b: number) => {
        return a - b
    })

    const heap = new MinHeap<number>(numberArray)
    const actual: number[] = []

    while (heap.size > 0) {
        actual.push(heap.extractMin())
    }

    expect(actual).toEqual(expected)
})

test("MinHeap.peekMin: Custom types", () => {
    const heap = new MinHeap<Custom>(customArray, customComparator)

    const actualMinCustomValue = heap.peekMin().value

    expect(actualMinCustomValue).toEqual(minCustomValue)
})

test("MinHeap.extractMin: Custom types", () => {
    const expected = [...customArray]
    expected.sort(CustomSortAscComparator)

    const heap = new MinHeap<Custom>(customArray, customComparator)

    const actual = new Array<Custom>()

    while (heap.size > 0) {
        actual.push(heap.extractMin())
    }

    expect(actual).toEqual(expected)
})

test("MinHeap.add", () => {
    const newMin = MIN + 1

    const heap = new MinHeap<number>(numberArray)
    heap.add(newMin)

    expect(heap.peekMin()).toBe(newMin)
})

test("MinHeap: UndirectedEdge", () => {
    const edges = new Array(
        new UndirectedEdge(0, 1, 4),
        new UndirectedEdge(1, 2, 8),
        new UndirectedEdge(2, 4, 2),
        new UndirectedEdge(3, 4, 3),
        new UndirectedEdge(3, 5, 7),
        new UndirectedEdge(4, 6, 6),
    )

    const heap = new MinHeap(edges, (e1: UndirectedEdge, e2: UndirectedEdge) => {
        return e1.weight - e2.weight
    })

    const sortedEdges = new Array<UndirectedEdge>()

    while (heap.size > 0) {
        sortedEdges.push(heap.extractMin())
    }

    edges.sort((e1: UndirectedEdge, e2: UndirectedEdge) => {
        return e1.weight - e2.weight
    })

    expect(sortedEdges).toEqual(edges)
})