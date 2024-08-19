import { MazeGraph } from "./graph/MazeGraph";
import { getRandomInt } from "./utils/utils";
import { Border } from "./model/Border";
import { Role } from "./model/Role";
import { Square } from "./model/Square";

class Maze {
    private _squares: Array<Square>
    private _entrance!: Square
    private _exit!: Square
    private _width: number
    private _height: number
    private _graph: MazeGraph | null = null
    
    constructor(squares: Array<Square>) {
        this._squares = squares

        const { width, height } = Maze.computeArea(squares)
        this._width = width
        this._height = height

        for (const square of squares) {
            if (square.role === Role.ENTRANCE) {
                this._entrance = square
                break
            }
        }

        for (const square of squares) {
            if (square.role === Role.EXIT) {
                this._exit = square
                break
            }
        }

        this.verifyArea()
    }

    get squares() {
        return this._squares
    }

    get entrace() {
        return this._entrance
    }

    get exit() {
        return this._exit
    }

    get width() {
        return this._width
    }

    get height() {
        return this._height
    }

    static generate(width: number, height: number): Maze {
        const squares = MazeGraph.generateRandomMazeSquares(width, height)

        const entranceLocation = Math.random()

        if (entranceLocation < 0.25) {  // entrance top
            let randomCol = getRandomInt(0, width-1)
            const entrance = squares[randomCol]
            entrance.role = Role.ENTRANCE
            // entrance.border.remove(Border.TOP)

            randomCol = getRandomInt(0, width-1)
            const exit = squares[width * (height - 1) + randomCol]
            exit.role = Role.EXIT
            exit.border.remove(Border.BOTTOM)
        }
        else if (entranceLocation < 0.5) {  // entrance bottom
            let randomCol = getRandomInt(0, width-1)
            const entrance = squares[width * (height - 1) + randomCol]
            entrance.role = Role.ENTRANCE
            // entrance.border.remove(Border.BOTTOM)

            randomCol = getRandomInt(0, width-1)
            const exit = squares[randomCol]
            exit.role = Role.EXIT
            exit.border.remove(Border.TOP)
        }
        else if (entranceLocation < 0.75) {  // entrance left
            let randomRow = getRandomInt(0, height-1)
            const entrance = squares[randomRow * width]
            entrance.role = Role.ENTRANCE
            // entrance.border.remove(Border.LEFT)

            randomRow = getRandomInt(0, height-1)
            const exit = squares[randomRow * width + width - 1]
            exit.role = Role.EXIT
            exit.border.remove(Border.RIGHT)
        }
        else {  // entrance right
            let randomRow = getRandomInt(0, height-1)
            const entrance = squares[randomRow * width + width - 1]
            entrance.role = Role.ENTRANCE
            // entrance.border.remove(Border.RIGHT)

            randomRow = getRandomInt(0, height-1)
            const exit = squares[randomRow * width]
            exit.role = Role.EXIT
            exit.border.remove(Border.LEFT)
        }

        return new Maze(squares)
    }

    solve() {
        if (!this._graph) {
            this._graph = new MazeGraph(this._squares, this.width, this.height)
        }
        
        const solution = this._graph.solve(this._entrance, this._exit)

        return solution
    }

    getSquare(row: number, col: number) {
        return this._squares[row * this._width + col]
    }

    // ---------------------------------------
    //        Private static methods 
    // ---------------------------------------
    private static computeArea(squares: ReadonlyArray<Square>): {
        width: number,
        height: number
    } {
        let rowMax: number = 0
        let columnMax: number = 0

        for (const square of squares) {
            if (square.row > rowMax) {
                rowMax = square.row
            }
            if (square.column > columnMax) {
                columnMax = square.column
            }
        }

        return { width: columnMax + 1, height: rowMax + 1}
    }

    private verifyArea() {
        if (this.squares.length !== this.height * this.width) {
            throw new Error("Maze: Number of squares don't match the size of the maze")
        }
    }

}

export { Maze }