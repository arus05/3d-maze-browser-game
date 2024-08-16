class Resizer {
    constructor(renderer, camera, container) {
        this.renderer = renderer
        this.camera = camera
        this.container = container

        this.setSize()

        window.addEventListener("resize", () => {
            this.setSize()
        })

    }

    setSize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
    }



}

export { Resizer }