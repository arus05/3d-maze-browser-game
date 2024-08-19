import { GLTFLoader } from "three/examples/jsm/Addons.js"

import { setupParrot } from "./setupBird"

async function loadBird(position = {
    x: 0, y: 2, z: 10
}) {
    const loader = new GLTFLoader()
    const parrotData = await loader.loadAsync("/assets/models/Parrot.glb")

    const parrot = setupParrot(parrotData)
    parrot.position.set(position.x, position.y, position.z)
    parrot.rotation.set(Math.PI / 2, 0, Math.PI)

    return { parrot }
}

export { loadBird }