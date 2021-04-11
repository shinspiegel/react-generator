const path = require('path')
const FileHelper = require('./FileHelper')

class Page {
    static async create({originPath, savePath, pageName}) {
        Page.createFile({
            originPath,
            savePath,
            pageName,
            extension: '.js',
            fileName: 'index.js',
        })

        Page.createFile({
            originPath,
            savePath,
            pageName,
            extension: '.test.js',
            fileName: 'index.test.js',
        })

        Page.createFile({
            originPath,
            savePath,
            pageName,
            extension: '.scss',
            fileName: 'index.scss',
        })
    }

    static async createFile({originPath, savePath, fileName, extension, pageName}) {
        const filePath = path.join(originPath, fileName)
        const raw = await FileHelper.readFile(filePath)
        const replacedContent = raw.replaceAll('NAME_COMPONENT', pageName)

        const savePathComponent = path.join(savePath, pageName)

        await FileHelper.createFolderIfNotExists(savePathComponent)
        await FileHelper.saveFile(savePathComponent, pageName + extension, replacedContent)
    }
}

module.exports = Page
