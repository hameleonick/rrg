import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './store/'
import {initialState} from './store/initialState'
import App from './containers/app'
import "../assets/css/style.less"
//for test commit
const store = configureStore(initialState)
let b = 1;
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

