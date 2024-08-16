function getRandomRGB(): string {
    const color = `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`
    return color
}

function getRandomInt(min: number = 0, max: number = 0) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(
        (x1 - x2)**2 + (y1 - y2)**2
    )
}

export { getRandomRGB, getRandomInt, getDistance }