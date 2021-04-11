const path = require('path')
const FileHelper = require('./FileHelper')

class Context {
    static async create({originPath, savePath}) {
        Context.createFile({
            originPath,
            savePath,
            fileName: 'index.js',
        })

        Context.createFile({
            originPath,
            savePath,
            fileName: 'initialState.js',
        })

        Context.createFile({
            originPath,
            savePath,
            fileName: 'reducer.js',
        })

        Context.createFile({
            originPath,
            savePath,
            fileName: 'useActions.js',
        })
    }

    static async createFile({originPath, savePath, fileName}) {
        const filePath = path.join(originPath, fileName)
        const raw = await FileHelper.readFile(filePath)
        const savePathComponent = path.join(savePath)

        await FileHelper.createFolderIfNotExists(savePathComponent)
        await FileHelper.saveFile(savePathComponent, fileName, raw)
    }
}

module.exports = Context
