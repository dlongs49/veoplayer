import fs from 'fs-extra'
const esmPath = "./dist/veoplayer.esm.min.js"
const globalPath = "./dist/veoplayer.global.min.js"
import json from "../package.json"   assert {"json" }
let pathList = [esmPath,globalPath]
let released  =
`
/**
 * ${json.name} v${json.version}
 * (c) 2023-${new Date().getFullYear()} ${json.author}
 * @Released under the MIT License.
 */
`
async function F() {
    try {
        for (let i = 0; i < pathList.length; i++) {
            let item = pathList[i]
            const readData = await fs.readFile(item, 'utf-8')
            const newData = readData.replace(released,"")
            const data = released + newData
            const write = await fs.outputFile(item,data)
            console.log(`${i}-----${item}`);
        }
    } catch (error) {
        console.log(error);
    }
}
F()
