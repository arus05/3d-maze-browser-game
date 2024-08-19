import { Border } from "../../model/Border";
import { DisjointLines, Line, NullPrimitive, Point, Polygon, Polyline } from "./primitives";

function drawBorder(ctx: CanvasRenderingContext2D, border: Border, topLeft: Point, squareSize: number): void {
    const topRight = topLeft.translate(squareSize, 0)
    const bottomLeft = topLeft.translate(0, squareSize)
    const bottomRight = topLeft.translate(squareSize, squareSize)
    const topLine = new Line(topLeft, topRight)
    const bottomLine = new Line(bottomLeft, bottomRight)
    const rightLine = new Line(topRight, bottomRight)
    const leftLine = new Line(topLeft, bottomLeft)

    // Four lines
    if (border.value === (Border.TOP | Border.BOTTOM | Border.LEFT | Border.RIGHT)) {
        return new Polygon([topLine, rightLine, bottomLine.flip(), leftLine.flip()]).draw(ctx)
    }

    // Three lines
    if (border.value === (Border.TOP | Border.BOTTOM | Border.RIGHT)) {
        return new Polyline([topLine, rightLine, bottomLine.flip()]).draw(ctx)
    }

    if (border.value === (Border.BOTTOM | Border.LEFT | Border.RIGHT)) {
        return new Polyline([leftLine, bottomLine, rightLine.flip()]).draw(ctx)
    }

    if (border.value === (Border.TOP | Border.BOTTOM | Border.LEFT)) {
        return new Polyline([topLine.flip(), leftLine, bottomLine]).draw(ctx)
    }

    if (border.value === (Border.TOP | Border.LEFT | Border.RIGHT)) {
        return new Polyline([leftLine.flip(), topLine, rightLine]).draw(ctx)
    }

    // Two lines
    // Connected
    if (border.value === (Border.TOP | Border.RIGHT)) {
        return new Polyline([topLine, rightLine]).draw(ctx)
    }

    if (border.value === (Border.RIGHT | Border.BOTTOM)) {
        return new Polyline([rightLine, bottomLine.flip()]).draw(ctx)
    }

    if (border.value === (Border.BOTTOM | Border.LEFT)) {
        return new Polyline([leftLine, bottomLine]).draw(ctx)
    }

    if (border.value === (Border.LEFT | Border.TOP)) {
        return new Polyline([leftLine.flip(), topLine]).draw(ctx)
    }

    // Disjoint
    if (border.value === (Border.TOP | Border.BOTTOM)) {
        return new DisjointLines([topLine, bottomLine]).draw(ctx)
    }

    if (border.value === (Border.LEFT | Border.RIGHT)) {
        return new DisjointLines([leftLine, rightLine]).draw(ctx)
    }

    // One line
    if (border.value === (Border.TOP)) {
        return topLine.draw(ctx)
    }

    if (border.value === Border.BOTTOM) {
        return bottomLine.draw(ctx)
    }

    if (border.value === (Border.LEFT)) {
        return leftLine.draw(ctx)
    }

    if (border.value === Border.RIGHT) {
        return rightLine.draw(ctx)
    }

    // No line
    if (border.value === Border.NONE) {
        return new NullPrimitive().draw()
    }
}

export { drawBorder }