const {program, Option} = require('commander')
const fs = require('fs')
const path = require('path')
const Component = require('./Component')
const Context = require('./Context')
const FileHelper = require('./FileHelper')

class App {
    constructor() {
        program
            .version(FileHelper.readJson('package.json').version, '-v, --version', 'output the current version')
            .addOption(new Option('-c, --component <component_name>', 'will create a new react component'))
            .addOption(new Option('-t, --context', 'will create the context for the project'))
            .parse(process.argv)

        this.opts = program.opts()

        this.originFolder = {
            component: path.join('node_modules/react-generator-tool/assets/comp'),
            context: path.join('node_modules/react-generator-tool/assets/context'),
        }

        this.saveFolder = {
            component: path.join('src/components'),
            pages: path.join('src/pages'),
            view: path.join('src/views'),
            context: path.join('src/context'),
        }
    }

    async main() {
        try {
            if (this.opts.start) {
            }

            if (this.opts.component) {
                Component.create({
                    componentName: this.component,
                    originPath: this.originFolder.component,
                    savePath: this.saveFolder.component,
                })
            }

            if (this.opts.context) {
                Context.create({
                    originPath: this.originFolder.context,
                    savePath: this.saveFolder.context,
                })
            }
        } catch (err) {
            console.log('Something went wrong.')
            console.log('This is the cause: ', err)
        }
    }
}

module.exports = App
