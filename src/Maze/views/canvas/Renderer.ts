import { Maze } from "../../Maze"
import { Line, Point, Polyline } from "./primitives"
import { drawBorder } from "./decomposer"
import { Solution } from "../../graph/Solution"
import { Square } from "../../model/Square"

const SQUARE_SIZE: number = 50

class Renderer {
    squareSize: number
    offset: number
    domElement: HTMLCanvasElement   
    context: CanvasRenderingContext2D
    lineWidth: number = 2

    constructor(squareSize: number = SQUARE_SIZE) {
        this.squareSize = squareSize
        this.domElement = document.createElement("canvas")
        this.context = this.domElement.getContext("2d")!
        this.offset = Math.floor(this.lineWidth / 2)
    }

    render(maze: Maze, solution: Solution | null = null) {
        const margin = this.lineWidth
        this.domElement.width = maze.width * this.squareSize + margin
        this.domElement.height = maze.height * this.squareSize + margin

        for (const square of maze.squares) {
            this.context.fillStyle = "white"

            this.context.fillRect(
                square.column * this.squareSize + this.offset,
                square.row * this.squareSize + this.offset,
                this.squareSize,
                this.squareSize
            )

            drawBorder(
                this.context,
                square.border,
                new Point(square.column * this.squareSize + this.offset, square.row * this.squareSize + this.offset),
                this.squareSize
            )
        }

        this.drawRoles(maze)

        if (solution) {
            const lines = []
            for (let i = solution.squares.length - 1; i >= 1; i--) {
                this.context.strokeStyle = "red"
                const startSquare = solution.squares[i]
                const endSquare = solution.squares[i-1]

                const line = new Line(
                    new Point(
                        startSquare.column * this.squareSize + this.offset + Math.floor(this.squareSize / 2),
                        startSquare.row * this.squareSize + this.offset + Math.floor(this.squareSize / 2)
                    ),
                    new Point(
                        endSquare.column * this.squareSize + this.offset + Math.floor(this.squareSize / 2),
                        endSquare.row * this.squareSize + this.offset + Math.floor(this.squareSize / 2)
                    )
                )

                lines.push(line)
            }
            new Polyline(lines).draw(this.context)
        }

    }

    drawRoles(maze: Maze) {
        const entrance = maze.entrace
        const exit = maze.exit

        const imageSize = Math.floor(this.squareSize / 2)

        const entranceImage = new Image(imageSize, imageSize)
        entranceImage.src = "/assets/images/stickman.svg"

        entranceImage.onload = () => {
            const entraceTopLeft = this.getTopLeft(entrance)

            this.context.drawImage(
                entranceImage,
                entraceTopLeft.x + Math.floor((this.squareSize - imageSize) / 2),
                entraceTopLeft.y + Math.floor((this.squareSize - imageSize) / 2),
                imageSize,
                imageSize
            )
        }

        const exitImage = new Image(imageSize, imageSize)
        exitImage.src = "/assets/images/flag.svg"
        exitImage.onload = () => {
            const exitTopLeft = this.getTopLeft(exit)
    
            this.context.drawImage(
                exitImage,
                exitTopLeft.x + Math.floor((this.squareSize - imageSize) / 2),
                exitTopLeft.y + Math.floor((this.squareSize - imageSize) / 2),
                imageSize,
                imageSize
            )
        }


    }

    getTopLeft(square: Square): Point {
        const x = square.column * this.squareSize + this.offset
        const y = square.row * this.squareSize + this.offset
        return new Point(x, y)
    }


}

export { Renderer }