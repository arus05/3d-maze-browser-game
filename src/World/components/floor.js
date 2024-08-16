import { Mesh, PlaneGeometry, MeshStandardMaterial, TextureLoader } from "three"

async function createMaterial() {
    const loader = new TextureLoader()

    const [
        colorMap,
        aoMap,
        roughnessMap,
        heightMap,
        metalnessMap,
        normalMap
    ] = await Promise.all([
        loader.loadAsync("/assets/textures/grass/wispy-grass-meadow_albedo.png"),
        loader.loadAsync("/assets/textures/grass/wispy-grass-meadow_ao.png"),
        loader.loadAsync("/assets/textures/grass/wispy-grass-meadow_roughness.png"),
        loader.loadAsync("/assets/textures/grass/wispy-grass-meadow_height.png"),
        loader.loadAsync("/assets/textures/grass/wispy-grass-meadow_metallic.png"),
        loader.loadAsync("/assets/textures/grass/wispy-grass-meadow_normal-ogl.png")
    ])

    const material = new MeshStandardMaterial({
        map: colorMap,
        aoMap: aoMap,
        roughnessMap: roughnessMap,
        displacementMap: heightMap,
        metalnessMap: metalnessMap,
        normalMap: normalMap,
    })

    return material
}

async function createFloor() {
    const plane = new Mesh(
        new PlaneGeometry(100, 100),
        await createMaterial()
    )

    plane.rotation.x = -Math.PI/2;

    return plane
}

export { createFloor }