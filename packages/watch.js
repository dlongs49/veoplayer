import fs from 'fs-extra'
const path = "./packages/bin/excss.js"
const cssPath = "./packages/style/style.css"
async function F() {
    try {
        const ensure = await fs.ensureFile(path)
        const readData = await fs.readFile(cssPath, 'utf-8')
        const data = "export const cssStr = `" + readData + "`"
        const write = await fs.outputFile(path,data)
        console.log("----"+write);
    } catch (error) {
        console.log(error);
    }
}
F()