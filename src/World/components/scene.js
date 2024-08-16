import { Color, Scene } from "three";

function createScene() {
    const scene = new Scene()
    scene.background = new Color("aquamarine")
    return scene
}

export { createScene }