import { Vector2 } from "three"

function getXZDirection(azimuth) {
    const vector = new Vector2(-Math.sin(azimuth), -Math.cos(azimuth))
    vector.normalize()
    return vector
}

export {
    getXZDirection
}