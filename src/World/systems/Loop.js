import { Clock } from "three"

class Loop {
    constructor(renderer, scene, camera, controls, keyControls, characterControls) {
        this.renderer = renderer
        this.scene = scene
        this.camera = camera
        this.controls = controls
        this.keyControls = keyControls
        this.characterControls = characterControls
        this.updatables = []
        this.clock = new Clock()
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick()
            this.renderer.render(this.scene, this.camera)
        })
    }

    stop() {
        this.renderer.setAnimationLoop(null)
    }

    tick() {
        const delta = this.clock.getDelta()

        // Update default animations
        for (const updatable of this.updatables) {
            updatable.tick(delta)
        }

        // Update character movements
        this.characterControls.tick(delta)
    }
}

export { Loop }