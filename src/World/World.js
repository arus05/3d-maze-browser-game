import { createScene } from "./components/scene"
import { createCamera } from "./components/camera"
import { createLights } from "./components/lights"
import { createFloor } from "./components/floor"
import { createAxesHelper, createBoxHelper, createGridHelper } from "./components/helpers"
import { loadBirds } from "./components/Birds/birds"
import { loadLittleTokyo } from "./components/littleTokyo/littleTokyo"

import { createRenderer } from "./systems/renderer"
import { Resizer } from "./systems/Resizer"
import { Loop } from "./systems/Loop"
import { createControls } from "./systems/cameraControls"
import { KeyControls } from "./systems/KeyControls"
import { CharacterControls } from "./systems/CharacterControls"

import { CollisionDetection } from "./systems/CollisionDetection"

let scene
let camera
let renderer
let loop
let controls
let keyControls
let characterControls
let collisionDetection

class World {
    constructor(container) {
        // Setup
        scene = createScene()
        camera = createCamera()

        renderer = createRenderer()
        container.append(renderer.domElement)

        keyControls = new KeyControls()

        // Create scene objects
        const axesHelper = createAxesHelper()
        const gridHelper = createGridHelper()
        const { mainLight, ambientLight } = createLights()

        // Add scene objects to scene
        scene.add(axesHelper, gridHelper, mainLight, ambientLight)

        // Setup resizer
        new Resizer(renderer, camera, container)
    }

    // Asynchronous constructor
    async init() {
        const [
            { parrot },
            floor,
            littleTokyo
        ] = await Promise.all([
            loadBirds(),
            createFloor(),
            loadLittleTokyo()
        ])

        controls = createControls(camera, renderer.domElement, parrot)

        collisionDetection = new CollisionDetection(parrot)
        collisionDetection.addCollidable(littleTokyo)
        
        characterControls = new CharacterControls(parrot, camera, controls, keyControls, collisionDetection)

        loop = new Loop(renderer, scene, camera, controls, keyControls, characterControls)

        // Add objects to scene
        scene.add(
            parrot,
            littleTokyo,
            floor,
        )

        // Add animated scene objects to loop.updatables
        loop.updatables.push(parrot, controls)

    }

    render() {
        renderer.render(scene, camera)
    }

    start() {
        loop.start()
    }

    stop() {
        loop.stop()
    }
}

export { World }