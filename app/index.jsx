import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import './static/css/common.less'
import './static/css/font.css'

// 性能测试
import Perf from 'react-addons-perf'
if (__DEV__) {
    window.Perf = Perf
}

// 创建Redux 的 store 对象
const store = configureStore()

import App from './appContainer';

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
