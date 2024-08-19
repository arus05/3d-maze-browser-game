/* ----------------------------------------- */
/*              Threejs App                  */
/* ----------------------------------------- */

import { World } from "./World/World"

async function main() {
  const container = document.getElementById("scene-container")
  const world = new World(container)
  await world.init()
  world.start()
}

try {
  main()
} catch(err) {
  console.error(err)
}