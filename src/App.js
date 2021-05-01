const {program, Option} = require('commander')
const {exec} = require('child_process')
const fs = require('fs')
const path = require('path')
const Page = require('./Page')
const Component = require('./Component')
const Context = require('./Context')
const FileHelper = require('./FileHelper')
const {default: StringHelper} = require('./StringHelper')

class App {
    constructor() {
        program
            .version(FileHelper.readJson('package.json').version, '-v, --version', 'output the current version')
            .addOption(new Option('-c, --component <component_name>', 'will create a new react component'))
            .addOption(new Option('-p, --page <page_name>', 'will create a new page'))
            .addOption(new Option('-t, --context', 'will create the context for the project'))
            .parse(process.argv)

        this.opts = program.opts()

        this.source = {
            component: path.join('node_modules/react-generator-tool/assets/comp'),
            pages: path.join('node_modules/react-generator-tool/assets/comp'),
            context: path.join('node_modules/react-generator-tool/assets/context'),
            main: path.join('node_modules/react-generator-tool/assets/main'),
        }

        this.components = ['index.js', 'index.scss', 'index.test.js']

        this.destiny = {
            component: path.join('src/components'),
            pages: path.join('src/pages'),
            context: path.join('src/context'),
            source: path.join('src'),
        }

        this.pages = ['index.js', 'index.scss', 'index.test.js']

        const generatorFile = FileHelper.readRCFile()

        console.log('Generator?', generatorFile)

        this.updateFromGenerator(generatorFile)
    }

    async main() {
        try {
            if (this.opts.component) this.component()
            if (this.opts.context) this.context()
            if (this.opts.page) this.page()
        } catch (err) {
            console.log('Something went wrong.')
            console.log('This is the cause: ', err)
        }
    }

    updateFromGenerator(generatorFile) {
        if (generatorFile) {
            if (generatorFile.destiny) {
                if (generatorFile.destiny.component) {
                    this.destiny.component = path.join(generatorFile.destiny.component)
                }

                if (generatorFile.destiny.pages) {
                    this.destiny.pages = path.join(generatorFile.destiny.pages)
                }

                if (generatorFile.destiny.context) {
                    this.destiny.context = path.join(generatorFile.destiny.context)
                }
            }

            if (generatorFile.source) {
                if (generatorFile.source.component) {
                    this.source.component = path.join(generatorFile.source.component)
                }

                if (generatorFile.source.pages) {
                    this.source.pages = path.join(generatorFile.source.pages)
                }

                if (generatorFile.source.context) {
                    this.source.context = path.join(generatorFile.source.context)
                }
            }

            if (generatorFile.components) {
                this.components = generatorFile.components
            }

            if (generatorFile.pages) {
                this.pages = generatorFile.pages
            }
        }
    }

    async createFile({originPath, savePath, fileName}) {
        const filePath = path.join(originPath, fileName)
        const raw = await FileHelper.readFile(filePath)
        const savePathComponent = path.join(savePath)
        await FileHelper.createFolderIfNotExists(savePathComponent)
        await FileHelper.saveFile(savePathComponent, fileName, raw)
    }

    page() {
        Page.create({
            pageName: StringHelper.capitalize(this.opts.page),
            originPath: this.source.pages,
            savePath: this.destiny.pages,
            fileList: this.pages,
        })
    }

    component() {
        Component.create({
            componentName: StringHelper.capitalize(this.opts.component),
            originPath: this.source.component,
            savePath: this.destiny.component,
            fileList: this.components,
        })
    }

    context() {
        Context.create({
            originPath: this.source.context,
            savePath: this.destiny.context,
        })
    }
}

module.exports = App
