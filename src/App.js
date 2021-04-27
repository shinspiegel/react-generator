const {program, Option} = require('commander')
const {exec} = require('child_process')
const fs = require('fs')
const path = require('path')
const Page = require('./Page')
const Component = require('./Component')
const Context = require('./Context')
const FileHelper = require('./FileHelper')

class App {
    constructor() {
        program
            .version(FileHelper.readJson('package.json').version, '-v, --version', 'output the current version')
            .addOption(new Option('-c, --component <component_name>', 'will create a new react component'))
            .addOption(new Option('-p, --page <page_name>', 'will create a new page'))
            .addOption(new Option('-t, --context', 'will create the context for the project'))
            .addOption(new Option('-s, --start', 'will remove the src folder and create a new one'))
            .parse(process.argv)

        this.opts = program.opts()

        this.originFolder = {
            component: path.join('node_modules/react-generator-tool/assets/comp'),
            pages: path.join('node_modules/react-generator-tool/assets/comp'),
            context: path.join('node_modules/react-generator-tool/assets/context'),
            main: path.join('node_modules/react-generator-tool/assets/main'),
        }

        this.components = [
            "index.js",
            "index.scss",
            "index.test.js"
        ]

        this.saveFolder = {
            component: path.join('src/components'),
            pages: path.join('src/pages'),
            context: path.join('src/context'),
            source: path.join('src'),
        }

        this.pages = [
            "index.js",
            "index.scss",
            "index.test.js"
        ]

        const generatorFile = FileHelper.readRCFile()

        console.log("Generator?", generatorFile)

        this.updateFromGenerator(generatorFile)


    }

    async main() {
        try {
            if (this.opts.start) this.start()
            if (this.opts.component) this.component()
            if (this.opts.context) this.context()
            if (this.opts.page) this.page()
        } catch (err) {
            console.log('Something went wrong.')
            console.log('This is the cause: ', err)
        }
    }

    updateFromGenerator(generatorFile) {
        if(generatorFile) {
            if(generatorFile.saveFolder) {
                if(generatorFile.saveFolder.component) {
                    this.saveFolder.component = path.join(generatorFile.saveFolder.component)
                }

                if(generatorFile.saveFolder.pages) {
                    this.saveFolder.pages = path.join(generatorFile.saveFolder.pages)
                }

                if(generatorFile.saveFolder.context) {
                    this.saveFolder.context = path.join(generatorFile.saveFolder.context)
                }
            }

            if(generatorFile.originFolder) {
                if(generatorFile.originFolder.component) {
                    this.originFolder.component = path.join(generatorFile.originFolder.component)
                }

                if(generatorFile.originFolder.pages) {
                    this.originFolder.pages = path.join(generatorFile.originFolder.pages)
                }

                if(generatorFile.originFolder.context) {
                    this.originFolder.context = path.join(generatorFile.originFolder.context)
                }
            }

            if(generatorFile.components) {
                this.components = generatorFile.components
            }

            if(generatorFile.pages) {
                this.pages = generatorFile.pages
            }
        }
    }

    async start() {
        const libs = ['react', 'react-dom', 'react-router-dom', '@testing-library/react', 'node-sass']

        await this.run('yarn add ' + libs.join(' ')).catch((e) => console.error(e))

        if (fs.existsSync(this.saveFolder.source)) {
            fs.rmSync(this.saveFolder.source, {recursive: true})
        }

        fs.mkdirSync(this.saveFolder.source, {recursive: true})

        this.createFile({
            fileName: 'index.js',
            originPath: this.originFolder.main,
            savePath: this.saveFolder.source,
        })

        this.createFile({
            fileName: 'routes.js',
            originPath: this.originFolder.main,
            savePath: this.saveFolder.source,
        })

        this.context()
    }

    async createFile({originPath, savePath, fileName}) {
        const filePath = path.join(originPath, fileName)
        const raw = await FileHelper.readFile(filePath)
        const savePathComponent = path.join(savePath)
        await FileHelper.createFolderIfNotExists(savePathComponent)
        await FileHelper.saveFile(savePathComponent, fileName, raw)
    }

    run(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`)
                    reject(error)
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`)
                    reject(stderr)
                }

                resolve(stdout)
            })
        })
    }

    page() {
        Page.create({
            pageName: this.opts.page,
            originPath: this.originFolder.pages,
            savePath: this.saveFolder.pages,
            fileList: this.pages
        })
    }

    component() {
        Component.create({
            componentName: this.opts.component,
            originPath: this.originFolder.component,
            savePath: this.saveFolder.component,
            fileList: this.components
        })
    }

    context() {
        Context.create({
            originPath: this.originFolder.context,
            savePath: this.saveFolder.context,
        })
    }
}

module.exports = App
