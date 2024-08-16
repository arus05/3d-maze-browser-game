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

class MaxHeap<T> {
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

            if (this.greaterThan(parentIndex, currentIndex)) {
                break
            }
            
            this.swap(parentIndex, currentIndex)
            currentIndex = parentIndex
        }
    }

    public peekMax() {
        return this._heap[0]
    }

    public extractMax(): T {
        if (this.size === 0) {
            throw new Error("MaxHeap.extractMax: Heap is empty")
        }

        if (this.size === 1) {
            const max = this._heap.pop()!
            return max
        }

        const max = this._heap[0]
        const lastElement = this._heap.pop()!
        this._heap[0] = lastElement
        this.heapifyMax(0)

        return max
    }

    public getValues() {
        return [...this._heap]
    }

    private buildHeap() {
        const { start, end } = this.getInternalNodesRange()
        for (let i = end; i >= start; i--) {
            this.heapifyMax(i)
        }
    }

    private heapifyMax(index: number) {

        if (index < 0 || index >= this.size) {
            throw new Error("MaxHeap.heapifyMax: Index out of range")
        }

        let largestIndex = index

        const leftChildIndex = this.getLeftChildIndex(index)
        if (leftChildIndex !== -1 && this.greaterThan(leftChildIndex, largestIndex)) {
            largestIndex = leftChildIndex
        }

        const rightChildIndex = this.getRightChildIndex(index)
        if (rightChildIndex !== -1 && this.greaterThan(rightChildIndex, largestIndex)) {
            largestIndex = rightChildIndex
        }

        if (largestIndex !== index) {
            this.swap(index, largestIndex)
            this.heapifyMax(largestIndex)
        }
    }

    private getLeftChildIndex(index: number) {

        if (index >= this.size) {
            throw new Error("MaxHeap.getLeftChildIndex: Index out of range")
        }

        const leftChildIndex = 2 * index + 1
        if ( leftChildIndex < this.size) {
            return leftChildIndex
        } 
        return -1
    }

    private getRightChildIndex(index: number) {

        if (index >= this.size) {
            throw new Error("MaxHeap.getRightChildIndex: Index out of range")
        }

        const rightChildIndex =  2 * index + 2
        if (rightChildIndex < this.size) {
            return rightChildIndex
        }
        return -1
    }

    private getParentIndex(index: number) {

        if (index >= this.size) {
            throw new Error("MaxHeap.getParentIndex: Index out of range")
        }

        const parentIndex = Math.ceil(index / 2) - 1

        return parentIndex
    }

    private swap(i: number, j: number) {
        if (i < 0 || i > this.size || j < 0 || j > this.size) {
            throw new Error("MaxHeap.swap: Index out of range")
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
            throw new Error("MaxHeap.getLeafNodesRange: Heap is empty")
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
            throw new Error("MaxHeap.getInternalNodesRange: Heap does not have any internal nodes")
        }
        return {
            start: 0,
            end: Math.floor(this.size / 2) - 1
        }
    }

    private lessThan(i: number, j: number) {
        if (i >= this.size || j >= this.size) {
            throw new Error("MaxHeap.lessThan: Index out of range")
        }
        return this._comparator(this._heap[i], this._heap[j]) < 0
    }

    private equals(i: number, j: number) {
        if (i >= this.size || j >= this.size) {
            throw new Error("MaxHeap.equals: Index out of range")
        }
        return this._comparator(this._heap[i], this._heap[j]) === 0
    }

    private greaterThan(i: number, j: number) {
        if (i >= this.size || j >= this.size) {
            throw new Error("MaxHeap.greaterThan: Index out of range")
        }
        return this._comparator(this._heap[i], this._heap[j]) > 0
    }
}

export { MaxHeap }