import { Square } from "./Maze/model/Square.ts"
import { Border } from "./Maze/model/Border.ts"
import { Maze } from "./Maze/model/Maze.ts"
import { Role } from "./Maze/model/Role.ts"
import { Renderer } from "./Maze/view/Renderer.ts"
import { MazeGraph } from "./Maze/graph/MazeGraph.ts"

import { Solution } from "./Maze/graph/Solution.ts"

const container = document.getElementById("scene-container")

function main() {
    const squares = [
        new Square(0, 0, 0, new Border(Border.TOP | Border.LEFT)),
        new Square(1, 0, 1, new Border(Border.TOP | Border.RIGHT)),
        new Square(2, 0, 2, new Border(Border.LEFT | Border.RIGHT), Role.EXIT),
        new Square(3, 0, 3, new Border(Border.TOP | Border.LEFT | Border.RIGHT)),
        new Square(4, 1, 0, new Border(Border.BOTTOM | Border.LEFT | Border.RIGHT)),
        new Square(5, 1, 1, new Border(Border.LEFT | Border.RIGHT)),
        new Square(6, 1, 2, new Border(Border.BOTTOM | Border.LEFT)),
        new Square(7, 1, 3, new Border(Border.RIGHT)),
        new Square(8, 2, 0, new Border(Border.TOP | Border.LEFT), Role.ENTRANCE),
        new Square(9, 2, 1, new Border(Border.BOTTOM)),
        new Square(10, 2, 2, new Border(Border.TOP | Border.BOTTOM)),
        new Square(11, 2, 3, new Border(Border.BOTTOM | Border.RIGHT))
    ]

    const renderer = new Renderer(200)

    // const maze = new Maze(squares)
    const maze = Maze.generate(5, 5)

    container!.append(renderer.domElement)
    
    // const graph = new MazeGraph(maze)
    // const solution = new Solution(graph.getShortestPath(maze.entrace, maze.exit))

    renderer.render(maze)
}

main()

/* ----------------------------------------- */
/*              Threejs App                  */
/* ----------------------------------------- */

// import { World } from "./World/World"

// async function main() {
//   const container = document.getElementById("scene-container")
//   const world = new World(container)
//   await world.init()
//   world.start()
// }

// try {
//   main()
// } catch(err) {
//   console.error(err)
// }