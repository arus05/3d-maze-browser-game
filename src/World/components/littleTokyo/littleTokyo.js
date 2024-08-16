import { Box3, BoxHelper, Vector3 } from "three";
import { GLTFLoader, DRACOLoader } from "three/examples/jsm/Addons.js";

import { setupModel } from "./setupModel"

async function loadLittleTokyo() {
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/vendor/draco/');
    loader.setDRACOLoader( dracoLoader );

    const littleTokyoData = await loader.loadAsync("/assets/models/LittlestTokyo.glb")

    const littleTokyo = setupModel(littleTokyoData)

    littleTokyo.scale.set(0.02, 0.02, 0.02)
    littleTokyo.position.set(0, 4.4, 0)

    // const littleTokyoHelper = new BoxHelper(littleTokyo)
    // const littleTokyoBox = new Box3().setFromObject(littleTokyoHelper)

    // console.log(littleTokyoHelper)
    // console.log(littleTokyoBox)

    // littleTokyo.add(littleTokyoHelper)
    /*
    const box = new Box3().setFromObject(object);
    const size = box.getSize(new Vector3()).length();
    const center = box.getCenter(new Vector3());
    */

    return littleTokyo
}

export { loadLittleTokyo }