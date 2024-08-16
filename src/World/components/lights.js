import { DirectionalLight, HemisphereLight } from "three";

function createLights() {
    const mainLight = new DirectionalLight("white", 6);
    mainLight.position.set(3, 10, 0)

    const ambientLight = new HemisphereLight("white", 0x84b745, 3)
    
    return { mainLight, ambientLight }
}

export { createLights }