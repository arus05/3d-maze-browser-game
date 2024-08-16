import { WebGLRenderer } from "three";

function createRenderer() {
    const renderer = new WebGLRenderer()
    renderer.physicallyCorrectLights = true
    renderer.antialias = true
    return renderer
}

export { createRenderer }