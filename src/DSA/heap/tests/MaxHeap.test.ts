import { test, expect } from "vitest"
import { MaxHeap } from "../MaxHeap"
import { getRandomInt } from "../../../Maze/utils/utils"

test("MaxHeap.buildHeap", () => {
    const arr = [1,3,4,2,234,23,26434,2334]
    const expected = Math.max(...arr)

    const heap = new MaxHeap<number>(arr)

    expect(heap.peekMax()).toEqual(expected)

})

test("MaxHeap.extractMax", () => {
    const arr: number[] = []
    for (let i = 0; i < 8; i++) {
        arr.push(getRandomInt(1, 500))
    }

    const expectedMax = Math.max(...arr)
    const expectedSize = arr.length - 1
    
    const heap = new MaxHeap<number>(arr)

    const max = heap.extractMax()
    const size = heap.size

    expect(max).toEqual(expectedMax)
    expect(size).toEqual(expectedSize)
})

test("MaxHeap.extractMax (2)", () => {
    const arr = new Array<number>()

    for (let i = 0; i < 8; i++) {
        arr.push(getRandomInt(1, 500))
    }

    const expected = [...arr]
    expected.sort((a: number, b: number) => {
        return b - a
    })

    const heap = new MaxHeap<number>(arr)
    const actual: number[] = []

    while (heap.size > 0) {
        actual.push(heap.extractMax())
    }

    expect(actual).toEqual(expected)
})

test("MaxHeap.peekMax: Custom types", () => {
    interface Custom {
        value: number
    }

    const comparator = (obj1: Custom, obj2: Custom): number => {
        if (obj1.value < obj2.value) {
            return -1
        }
        if (obj1.value > obj2.value) {
            return 1
        }
        return 0
    }

    const arr = new Array<Custom>()
    let max = 0
    for (let i = 0; i < 5; i++) {
        const random = getRandomInt(1,30)
        if (random > max) {
            max = random
        }
        arr.push({
            value: random
        })
    }

    const heap = new MaxHeap<Custom>(arr, comparator)

    const actualMax = heap.peekMax()

    expect(actualMax.value).toEqual(max)
})

test("MaxHeap.extractMax: Custom types", () => {
    interface Custom {
        value: number
    }

    const arr = new Array<Custom>()
    for (let i = 0; i < getRandomInt(5, 10); i++) {
        arr.push({
            value: getRandomInt(10,30)
        })
    }

    const sortComparator = (obj1: Custom, obj2: Custom) => {
        return obj2.value - obj1.value
    }
    const expected = [...arr]
    expected.sort(sortComparator)

    const comparator = (obj1: Custom, obj2: Custom) => {
        return obj1.value - obj2.value
    }
    const heap = new MaxHeap<Custom>(arr, comparator)

    const actual = new Array<Custom>()

    while (heap.size > 0) {
        actual.push(heap.extractMax())
    }

    expect(actual).toEqual(expected)
})

test("MaxHeap.add", () => {
    const arr = new Array<number>()
    const addedValue = 501

    for (let i = 0; i < 8; i++) {
        arr.push(getRandomInt(1, 500))
    }

    const heap = new MaxHeap<number>(arr)
    heap.add(addedValue)

    expect(heap.peekMax()).toBe(addedValue)

})