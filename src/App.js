const {program, Option} = require('commander')
const path = require('path')
const Component = require('./Component')
const FileHelper = require('./FileHelper')

const componentOption = new Option('-c, --component <component_name>', 'will create a new react component')

class App {
    constructor(argsList) {
        program
            .version('0.0.1', '-v, --version', 'output the current version')
            .addOption(componentOption)
            .parse(process.argv)

        this.opts = program.opts()
        this.component = program.opts().component

        this.originFolder = {
            component: path.join('assets/comp'),
        }

        this.componentFile = {
            reactComp: path.join('assets/comp/index.js'),
            reactTest: path.join('assets/comp/index.test.js'),
            reactStyle: path.join('assets/comp/index.scss'),
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
            // console.log('This is the options created', this.opts, this)

            if (this.component) {
                Component.create({
                    componentName: this.component,
                    originPath: this.originFolder.component,
                    savePath: this.saveFolder.component,
                })
            }
        } catch (err) {
            console.log('Something went wrong.')
            console.log('This is the cause: ', err)
        }
    }
}

module.exports = App
