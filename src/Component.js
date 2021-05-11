const path = require('path')
const FileHelper = require('./FileHelper')

class Page {
    static async create({originPath, savePath, componentName, fileList}) {
        fileList.forEach((fileName) => {
            Page.createFile({
                originPath,
                savePath,
                componentName,
                fileName,
            })
        })
    }

    static async createFile({originPath, savePath, fileName, componentName}) {
        const filePath = path.join(originPath, fileName)
        const raw = await FileHelper.readFile(filePath)
        const replacedContent = raw.replace(/NAME_COMPONENT/g, componentName)
        const savePathComponent = path.join(savePath, componentName)
        await FileHelper.createFolderIfNotExists(savePathComponent)
        await FileHelper.saveFile(savePathComponent, fileName, replacedContent)
    }
}

module.exports = Page
