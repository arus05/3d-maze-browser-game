import { GLTFLoader } from "three/examples/jsm/Addons.js"

import { setupParrot } from "./setupBirds"

async function loadBirds() {
    const loader = new GLTFLoader()
    const parrotData = await loader.loadAsync("/assets/models/Parrot.glb")

    const parrot = setupParrot(parrotData)
    parrot.position.set(0, 2, 10)
    parrot.rotation.set(Math.PI / 2, 0, Math.PI)

    return { parrot }
}

export { loadBirds }