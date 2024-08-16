import { Box3, Sphere, Vector3 } from "three"

class CollisionDetection {
    constructor(character) {
        this.character = character  // character of type Object3D
        this.collidables = []   // Array of Box3 collidables
    }

    detectCollision(position = this.character.position) {
        const boundingSphere = new Sphere(position, 1)
        for (const collidable of this.collidables) {
            if (collidable.intersectsSphere(boundingSphere)) {
                console.log("collide")
                return true
            }
        }

        return false
    }

    addCollidable(...objects) {
        for (let i=0; i<objects.length; i++) {
            this.collidables.push(new Box3().setFromObject(objects[i]))
        }
    }

}

export { CollisionDetection }