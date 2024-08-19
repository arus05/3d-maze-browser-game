interface Primitive {
    draw(ctx: CanvasRenderingContext2D): void
}

class NullPrimitive implements Primitive{
    draw() {}
}

class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    translate(x: number = 0, y: number = 0): Point {
        return new Point(this.x + x, this.y + y)
    }
}

class Line implements Primitive{
    start: Point
    end: Point
    
    constructor(start: Point, end: Point) {
        this.start = start
        this.end = end
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.moveTo(this.start.x, this.start.y)
        ctx.lineTo(this.end.x, this.end.y)
        ctx.stroke()

        ctx.restore()
    }

    flip(): Line {
        return new Line(this.end, this.start)
    }
}

class Polyline implements Primitive {
    lines: Array<Line>

    constructor(lines: Array<Line>) {
        this.lines = lines
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save()

        ctx.lineWidth = 2
        ctx.beginPath()

        // draw first line
        ctx.moveTo(this.lines[0].start.x, this.lines[0].start.y)
        ctx.lineTo(this.lines[0].end.x, this.lines[0].end.y)

        for (let i = 1; i < this.lines.length; i++) {
            const line = this.lines[i]
            ctx.lineTo(line.start.x, line.start.y)
            ctx.lineTo(line.end.x, line.end.y)
        }
        
        ctx.stroke()

        ctx.restore()
    }
}

class DisjointLines {
    lines: Array<Line>

    constructor(lines: Array<Line>) {
        this.lines = lines
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save()

        ctx.lineWidth = 2
        
        for (let i = 0; i < this.lines.length; i++) {
            ctx.beginPath()
            const line = this.lines[i]
            ctx.moveTo(line.start.x, line.start.y)
            ctx.lineTo(line.end.x, line.end.y)
            ctx.stroke()
        }
        
        ctx.restore()
    }
}

class Polygon implements Primitive {
    lines: Array<Line>

    constructor(lines: Array<Line>) {
        this.lines = lines
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save()

        ctx.beginPath()
        ctx.lineWidth = 2

        // draw first line
        ctx.moveTo(this.lines[0].start.x, this.lines[0].start.y)
        ctx.lineTo(this.lines[0].end.x, this.lines[0].end.y)

        for (let i = 1; i < this.lines.length; i++) {
            const line = this.lines[i]
            ctx.lineTo(line.start.x, line.start.y)
            ctx.lineTo(line.end.x, line.end.y)
        }

        ctx.closePath()
        ctx.fill()

        ctx.restore()
    }
}

export { NullPrimitive, Point, Line, DisjointLines, Polyline, Polygon }