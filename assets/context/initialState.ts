import {useContext} from 'react'
import {StateContext} from './index'

export interface State {
    count: number
}

export const initialState: State = {
    count: 0,
}

export const useState = () => useContext(StateContext)
