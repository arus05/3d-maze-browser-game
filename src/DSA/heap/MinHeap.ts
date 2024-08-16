type Comparator<T> = (obj1: T, obj2: T) => number

function defaultComparator<T>(obj1: T, obj2: T): number {
    if (obj1 < obj2) {
        return -1
    }
    if (obj1 > obj2) {
        return 1
    }
    return 0
}

class MinHeap<T> {
    private _heap: T[]
    private _comparator: Comparator<T>

    constructor(
        initialValues?: Iterable<T>,
        comparator: Comparator<T> = defaultComparator<T>
    ) {
        this._comparator = comparator

        if (initialValues) {
            this._heap = [...initialValues]
            this.buildHeap()
        }
        else {
            this._heap = []
        }
    }

    get size() {
        return this._heap.length
    }

    public add(obj: T) {
        // append at end
        this._heap.push(obj)

        // while not root and parent < itself
            // move up
        let currentIndex = this.size - 1
        while (true) {
            if (currentIndex === 0) {
                break
            }

            const parentIndex = this.getParentIndex(currentIndex)

            if (this.lessThan(parentIndex, currentIndex)) {
                break
            }
            
            this.swap(parentIndex, currentIndex)
            currentIndex = parentIndex
        }
    }

    public peekMin() {
        return this._heap[0]
    }

    public extractMin(): T {
        if (this.size === 0) {
            throw new Error("MinHeap.extractMin: Heap is empty")
        }

        if (this.size === 1) {
            const min = this._heap.pop()!
            return min
        }

        const min = this._heap[0]
        const lastElement = this._heap.pop()!
        this._heap[0] = lastElement
        this.heapifyMin(0)

        return min
    }

    public getValues() {
        return [...this._heap]
    }

    private buildHeap() {
        if (this.size < 2) {
            return
        }

        const { start, end } = this.getInternalNodesRange()
        for (let i = end; i >= start; i--) {
            this.heapifyMin(i)
        }
    }

    private heapifyMin(index: number) {

        if (index < 0 || index >= this.size) {
            throw new Error("MinHeap.heapifyMin: Index out of range")
        }

        let smallestIndex = index

        const leftChildIndex = this.getLeftChildIndex(index)
        if (leftChildIndex !== -1 && this.lessThan(leftChildIndex, smallestIndex)) {
            smallestIndex = leftChildIndex
        }

        const rightChildIndex = this.getRightChildIndex(index)
        if (rightChildIndex !== -1 && this.lessThan(rightChildIndex, smallestIndex)) {
            smallestIndex = rightChildIndex
        }

        if (smallestIndex !== index) {
            this.swap(index, smallestIndex)
            this.heapifyMin(smallestIndex)
        }
    }

    private getLeftChildIndex(index: number) {

        if (index >= this.size) {
            throw new Error("MinHeap.getLeftChildIndex: Index out of range")
        }

        const leftChildIndex = 2 * index + 1
        if ( leftChildIndex < this.size) {
            return leftChildIndex
        } 
        return -1
    }

    private getRightChildIndex(index: number) {

        if (index >= this.size) {
            throw new Error("MinHeap.getRightChildIndex: Index out of range")
        }

        const rightChildIndex =  2 * index + 2
        if (rightChildIndex < this.size) {
            return rightChildIndex
        }
        return -1
    }

    private getParentIndex(index: number) {

        if (index >= this.size) {
            throw new Error("MinHeap.getParentIndex: Index out of range")
        }

        const parentIndex = Math.ceil(index / 2) - 1

        return parentIndex
    }

    private swap(i: number, j: number) {
        if (i < 0 || i > this.size || j < 0 || j > this.size) {
            throw new Error("MinHeap.swap: Index out of range")
        }

        const first = this._heap[i]
        this._heap[i] = this._heap[j]
        this._heap[j] = first
    }

    private getLeafNodesRange(): {
        start: number
        end: number
    } {
        if (this.size === 0) {
            throw new Error("MinHeap.getLeafNodesRange: Heap is empty")
        }
        return {
            start: Math.floor(this.size / 2),
            end: this.size - 1
        }
    }

    private getInternalNodesRange(): {
        start: number
        end: number
    } {
        if (this.size < 2) {
            throw new Error("MinHeap.getInternalNodesRange: Heap does not have any internal nodes")
        }
        return {
            start: 0,
            end: Math.floor(this.size / 2) - 1
        }
    }

    private lessThan(i: number, j: number) {
        if (i >= this.size || j >= this.size) {
            throw new Error("MinHeap.lessThan: Index out of range")
        }
        return this._comparator(this._heap[i], this._heap[j]) < 0
    }

    private equals(i: number, j: number) {
        if (i >= this.size || j >= this.size) {
            throw new Error("MinHeap.equals: Index out of range")
        }
        return this._comparator(this._heap[i], this._heap[j]) === 0
    }

    private greaterThan(i: number, j: number) {
        if (i >= this.size || j >= this.size) {
            throw new Error("MinHeap.greaterThan: Index out of range")
        }
        return this._comparator(this._heap[i], this._heap[j]) > 0
    }
}

export { MinHeap }