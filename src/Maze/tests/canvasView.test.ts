import { Maze } from "../Maze.ts"
import { Renderer } from "../views/canvas/Renderer.ts"

const container = document.getElementById("scene-container")

function main() {
    const renderer = new Renderer(50)

    const maze = Maze.generate(20, 20)
    const solution = maze.solve()

    container!.append(renderer.domElement)

    renderer.render(maze, solution)
}

main()