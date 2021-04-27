const path = require('path')
const FileHelper = require('./FileHelper')

class Page {
    static async create({originPath, savePath, pageName, fileList}) {
        fileList.forEach(fileName => {
            Page.createFile({
                originPath,
                savePath,
                pageName,
                fileName,
            })
        })
    }

    static async createFile({originPath, savePath, fileName, pageName}) {
        const filePath = path.join(originPath, fileName)
        const raw = await FileHelper.readFile(filePath)
        const replacedContent = raw.replaceAll('NAME_COMPONENT', pageName)

        const savePathComponent = path.join(savePath, pageName)

        await FileHelper.createFolderIfNotExists(savePathComponent)
        await FileHelper.saveFile(savePathComponent, fileName, replacedContent)
    }
}

module.exports = Page
