import { OrbitControls } from "three/examples/jsm/Addons.js";
import { degToRad } from "three/src/math/MathUtils.js";

function createControls(camera, canvas, character) {
    const controls = new OrbitControls(camera, canvas)

    camera.position.copy(character.position)
    camera.position.y += 5
    camera.position.z += 12
    
    controls.target.copy(character.position)
    controls.target.y += 2

    controls.enableDamping = true
    controls.enablePan = false
    controls.maxPolarAngle = degToRad(85)

    controls.tick = (delta, keyPressed, cameraXZDirection) => {
        controls.update(delta)
    }

    return controls
}

export { createControls }