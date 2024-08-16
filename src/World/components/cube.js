import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

import { degToRad } from "three/src/math/MathUtils.js";

const rotationPerSecond = degToRad(-30)
const speed = 5

function createCube() {
    const geometry = new BoxGeometry(2, 2, 2)
    const material = new MeshStandardMaterial({ color: "white" })

    const cube = new Mesh(geometry, material)

    cube.position.set(0, 1, 0)
    cube.rotation.set(degToRad(-30), degToRad(-30), degToRad(-30))

    cube.tick = (delta, keyPressed, cameraXZDirection) => {
        // default motion
        const rotation = delta * rotationPerSecond
        cube.rotation.x += rotation
        cube.rotation.y += rotation
        cube.rotation.z += rotation

        // handle user input
        // console.log(cameraXZDirection)
        const distanceX = speed * cameraXZDirection.x * delta
        const distanceZ = speed * cameraXZDirection.y * delta
        // if (keyPressed["a"] || keyPressed["A"]) {   // left (-x)
        //     cube.position.x += distanceX
        //     cube.position.z += distanceZ
        // }
        // if (keyPressed["d"] || keyPressed["D"]) {   // right (+x)
        //     cube.position.x += distance
        // }
        if (keyPressed["w"] || keyPressed["W"]) {   // forward (-z)
            cube.position.x += distanceX
            cube.position.z += distanceZ
        }
        // if (keyPressed["s"] || keyPressed["S"]) {   // backward (+z)
        //     cube.position.z += distance
        // }

    }

    return cube
}

export { createCube }