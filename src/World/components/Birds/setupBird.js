import { AnimationMixer } from "three"

function setupParrot(data) {
    const parrot = data.scene.children[0]
    const clip = data.animations[0]

    const mixer = new AnimationMixer(parrot)
    const action = mixer.clipAction(clip)

    action.play()

    parrot.tick = (delta) => {
        mixer.update(delta)
    }

    return parrot
}

export { setupParrot }