import { AxesHelper, GridHelper, BoxHelper } from "three"

function createAxesHelper() {
    const helper = new AxesHelper(3)
    helper.position.set(-3.5, 0, -3.5)
    return helper
}

function createGridHelper() {
    const helper = new GridHelper()
    return helper
}

function createBoxHelper(obj, color) {
    const boundingBox = new BoxHelper(obj, color)
    return boundingBox
}

export { createAxesHelper, createGridHelper, createBoxHelper }