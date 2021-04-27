# React Generator Tool

This is a small package to help my project to generate quick components and quick pages.

The intend of this project is to avoid repetition on creating the same basic files over and over.

### How to install it?

You can use `npm` or `yarn` to install:

`npm install react-generator-tool` or `yarn add react-generator-tool` for this project.

### How to use it?

```sh
# You can use the full name
yarn react-generator-tool -h

# Or you can use the short name
yarn rg -h
```

They have the following commands available:

```
Options:
  -v, --version                     output the current version
  -c, --component <component_name>  will create a new react component
  -p, --page <page_name>            will create a new page
  -t, --context                     will create the context for the project
  -s, --start                       will remove the src folder and create a new one
  -h, --help                        display help for command
```

#### The `.rgrc` file

This is a small file that can be used to customize the paths for origin and destination folders. And add or remove files for the generation tool.

This a example with all the option available and the default values:

```json
{
    "saveFolder": {
        "component": "src/components",
        "pages": "src/pages",
        "context": "src/context"
    },
    "originFolder": {
        "component": "node_modules/react-generator-tool/assets/comp",
        "pages": "node_modules/react-generator-tool/assets/comp",
        "context": "node_modules/react-generator-tool/assets/context"
    },
    "components": [
        "index.js",
        "index.scss",
        "index.test.js"
    ],
    "pages": [
        "index.js",
        "index.scss",
        "index.test.js"
    ]
}
```

For the components and pages, on the `assets` folder for the `react-generator-tool`, they have the following files to be used: `index.css`, `index.scss`, `index.js`, `index.tsx`, `index.test.js`, `index.test.tsx`. You can add, remove or change only the files if you want on the components.


#### Component (-c) or Page (-p)

With a simple usage of `yarn rg -c ComponentName` or `yarn rg -p PageName` , this will create a folder inside the components or pages folder with the following files:

```js
// index.js
import React from 'react'
import './index.scss'

const ComponentName = ({}) => {
    return <div className='ComponentName'>ComponentName</div>
}

export default ComponentName
```

```scss
// index.scss
.ComponentName {
}
```

```js
// index.test.js
import {render} from '@testing-library/react'
import ComponentName from './index'

describe('components/ComponentName', () => {
    test('should render the components without any props', () => {
        const {container} = render(<ComponentName />)
        expect(container.childNodes.length).toBeGreaterThan(0)
    })
})
```

#### Context (-t)

This will create a basic app context for the application using the [`ContextAPI`](https://reactjs.org/docs/context.html) with [`useReducer`](https://reactjs.org/docs/hooks-reference.html) hook. This will add a folder called context on the `src` or your project with the following files:

```js
// index.js
import React, {useReducer, createContext} from 'react'
import Reducer from './reducer'
import InitialState from './initialState'

export const AppContext = createContext(InitialState)

export const ContextProvider = ({children, initialState}) => {
    if (!initialState) initialState = InitialState

    const [state, dispatch] = useReducer(Reducer, initialState)

    return <AppContext.Provider value={{state, dispatch}}>{children}</AppContext.Provider>
}
```

```js
// initialState.js
const InitialState = {
    count: 0,
}

export default InitialState
```

```js
// reducer.js
const Reducer = (state, {type, payload}) => {
    switch (type) {
        case cases.count:
            return {
                ...state,
                count: payload,
            }

        default:
            return state
    }
}

export const cases = {
    count: 'COUNT',
}

export default Reducer
```

```js
// useActions hook
import {useContext} from 'react'
import {AppContext} from './index'
import {cases} from './reducer'

const useActions = () => {
    const {dispatch, state} = useContext(AppContext)

    const countUp = async () => {
        dispatch({type: cases.count, payload: state.count + 1})
    }

    return {
        state,

        countUp,
    }
}

export default useActions
```

## Things missing

I'm still on this project. There is a lot of features missing, right know it only does my intend for my kind of projects and standards that I do use.

Because every cool kid need a roadmap, this is the things I want to do:

-   [x] Allow use of a `.rgrc` file to customize the origin of the component
-   [x] Allow other kind of components
-   [ ] Do a better job on the `--start`, right now it's too slow and remove the whole `src`folder
-   [ ] Make the `--start` to create the `.prettierrc` with the things I like
-   [ ] Check the libs installed before install new ones
