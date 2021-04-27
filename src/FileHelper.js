const fs = require('fs')
const path = require('path')

class FileHelper {
    static fileExists(fileName) {
        try {
            if (!fs.existsSync(fileName)) {
                throw new Error('File do not exists')
            }
        } catch (err) {
            throw new Error(err)
        }
    }

    static readJson(fileName) {
        FileHelper.fileExists(fileName)
        const rawFile = fs.readFileSync(fileName)
        return JSON.parse(rawFile)
    }

    static readFile(filePath) {
        FileHelper.fileExists(filePath)

        return new Promise((result, reject) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) reject(err)
                result(data)
            })
        })
    }

    static async createFolderIfNotExists(folderPath) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, {recursive: true})
        }
    }

    static saveFile(savePath, fileName, content) {
        return new Promise((_, reject) => {
            const completePath = path.join(savePath, fileName)

            fs.writeFile(completePath, content, (err, _) => {
                if (err) reject(err)
            })
        })
    }

    static getRoot() {
        return path.resolve(__dirname)
    }

    static readRCFile() {
        try {
            const pathToFile = "./.rgrc"
            const rgrcFile = FileHelper.readJson(pathToFile)
            
            return rgrcFile
        } catch(e) {
            console.error("No '.rgrc' file.")
            return undefined
        }
    }
}

module.exports = FileHelper
