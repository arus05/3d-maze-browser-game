import { Role } from "./Role";
import { Square } from "./Square";

class Maze {
    private _squares: ReadonlyArray<Square>
    private _entrance!: Square
    private _exit!: Square
    private _width: number
    private _height: number
    
    constructor(squares: ReadonlyArray<Square>) {
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