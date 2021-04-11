const path = require('path')
const FileHelper = require('./FileHelper')

class Page {
    static async create({originPath, savePath, pageName}) {
        Page.createFile({
            originPath,
            savePath,
            pageName,
            fileName: 'index.js',
        })

        Page.createFile({
            originPath,
            savePath,
            pageName,
            fileName: 'index.test.js',
        })

        Page.createFile({
            originPath,
            savePath,
            pageName,
            fileName: 'index.scss',
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
