const path = require('path')
const FileHelper = require('./FileHelper')

class Page {
    static async create({originPath, savePath, componentName}) {
        Page.createFile({
            originPath,
            savePath,
            componentName,
            fileName: 'index.js',
        })

        Page.createFile({
            originPath,
            savePath,
            componentName,
            fileName: 'index.test.js',
        })

        Page.createFile({
            originPath,
            savePath,
            componentName,
            fileName: 'index.scss',
        })
    }

    static async createFile({originPath, savePath, fileName, componentName}) {
        const filePath = path.join(originPath, fileName)
        const raw = await FileHelper.readFile(filePath)
        const replacedContent = raw.replaceAll('NAME_COMPONENT', componentName)

        const savePathComponent = path.join(savePath, componentName)

        await FileHelper.createFolderIfNotExists(savePathComponent)
        await FileHelper.saveFile(savePathComponent, fileName, replacedContent)
    }
}

module.exports = Page
