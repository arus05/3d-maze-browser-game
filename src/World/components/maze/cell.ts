import { BoxGeometry, ColorRepresentation, Group, Mesh, MeshStandardMaterial, Object3D } from "three";
import { Square } from "../../../Maze/model/Square";

function createCellBorders(square: Square, color: ColorRepresentation, height: number, blocksPerBorder: number, blockSize: number): Object3D {
    const width = blocksPerBorder * blockSize
    const depth = blockSize

    const cellBorders = new Group()

    const borderMaterial = new MeshStandardMaterial({
        color
    })

    if (square.border.hasTop()) {
        const borderTop = new Mesh(
            new BoxGeometry(width, height, depth),
            borderMaterial
        )
        borderTop.position.set(width / 2, 0, depth / 2)
        cellBorders.add(borderTop)
    }
    
    if (square.border.hasBottom()) {
        const borderBottom = new Mesh(
            new BoxGeometry(width, height, depth),
            borderMaterial
        )
        borderBottom.position.set(
            width / 2,
            0,
            depth / 2 + (blocksPerBorder - 1) * blockSize
        )
        cellBorders.add(borderBottom)
    }

    if (square.border.hasLeft()) {
        const borderLeft = new Mesh(
            new BoxGeometry(depth, height, width),
            borderMaterial
        )
        borderLeft.position.set(
            depth / 2,
            0,
            width / 2
        )
        cellBorders.add(borderLeft)
    }

    if (square.border.hasRight()) {
        const borderRight = new Mesh(
            new BoxGeometry(depth, height, width),
            borderMaterial
        )
        borderRight.position.set(
            depth / 2 + (blocksPerBorder - 1) * blockSize,
            0,
            width / 2
        )
        cellBorders.add(borderRight)
    }

    cellBorders.position.set(
        square.column * (blocksPerBorder - 1) * blockSize,
        0,
        square.row * (blocksPerBorder - 1) * blockSize
    )

    return cellBorders
}

export { createCellBorders }