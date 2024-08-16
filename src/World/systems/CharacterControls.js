import { getXZDirection } from "../utils/utils"

const speed = 5

class CharacterControls {

    constructor(character, camera, controls, keyControls, collisionDetection) {
        this.character = character
        this.camera = camera
        this.controls = controls
        this.keyControls = keyControls
        this.keyPressed = keyControls.getPressed()
        this.collisionDetection = collisionDetection
    }

    tick(delta) {
        const cameraXZDirection = getXZDirection(this.controls.getAzimuthalAngle())
        this.updatePlayerRotation()
        this.update(delta, cameraXZDirection)
    }

    update(delta, cameraXZDirection) {
        this.updatePlayerRotation()

        const distanceX = speed * cameraXZDirection.x * delta
        const distanceZ = speed * cameraXZDirection.y * delta

        if (this.keyPressed["a"] || this.keyPressed["A"]) {
            this.character.position.x += distanceZ
            this.character.position.z -= distanceX

            if (this.collisionDetection.detectCollision()) {
                this.character.position.x -= distanceZ
                this.character.position.z += distanceX
            }
            else {
                // Update target
                this.controls.target.x += distanceZ
                this.controls.target.z -= distanceX

                // Update camera position
                this.camera.position.x += distanceZ
                this.camera.position.z -= distanceX
            }
        }
        
        if (this.keyPressed["d"] || this.keyPressed["D"]) {
            this.character.position.x -= distanceZ
            this.character.position.z += distanceX

            if (this.collisionDetection.detectCollision()) {
                this.character.position.x += distanceZ
                this.character.position.z -= distanceX
            }
            else {
                // Update target
                this.controls.target.x -= distanceZ
                this.controls.target.z += distanceX

                // Update camera position
                this.camera.position.x -= distanceZ
                this.camera.position.z += distanceX
            }
        }
        if (this.keyPressed["w"] || this.keyPressed["W"]) {
            this.character.position.x += distanceX
            this.character.position.z += distanceZ

            if (this.collisionDetection.detectCollision()) {
                this.character.position.x -= distanceX
                this.character.position.z -= distanceZ
            }
            else {
                // Update target
                this.controls.target.x += distanceX
                this.controls.target.z += distanceZ

                // Update camera position
                this.camera.position.x += distanceX
                this.camera.position.z += distanceZ
            }
        }
        if (this.keyPressed["s"] || this.keyPressed["S"]) {
            this.character.position.x -= distanceX
            this.character.position.z -= distanceZ
            if (this.collisionDetection.detectCollision()) {
                this.character.position.x += distanceX
                this.character.position.z += distanceZ
            }
            else {
                // Update target
                this.controls.target.x -= distanceX
                this.controls.target.z -= distanceZ

                // Update camera position
                this.camera.position.x -= distanceX
                this.camera.position.z -= distanceZ
            }
        }

    }

    updatePlayerRotation() {
        this.character.rotation.z = -Math.PI - this.controls.getAzimuthalAngle()
    }

}

export { CharacterControls }
