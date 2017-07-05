import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
// redux流
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFild from './actions/userinfo'

// 本地缓存配置
import LocalStore from './util/localStore'
import { CITYNAME } from './config/localStoreKey'

import Home from './containers/Home'
import City from './containers/City'
import Login from './containers/Login'
import Detail from './containers/Detail'
import Search from './containers/Search'
import User from './containers/User'

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      initDone: false
    }
  }
  render() {
    const history = createBrowserHistory()
    return (
      <div>
        {
          this.state.initDone ? 
          <Router>
            <div>
              <Route exact path="/" component={Home}/>
              <Route path="/city" component={City}/>
              <Route path="/login" component={Login}/>
              <Route path="/detail/:id" component={Detail}/>
              <Route path="/search/:category/:keyword?" component={Search}/>
              <Route path="/user" component={User}/>
            </div>
          </Router>
          : <div>正在加载...</div>
        }
      </div>
    )
  }

  componentDidMount() {
    // 获取位置信息
    let cityName = LocalStore.getItem(CITYNAME)
    if(cityName == null) {
      cityName = '北京'
    }
    // 将城市信息存储到redux中
    this.props.userinfoActions.update({
      cityName: cityName
    })
    // 更改状态
    this.setState({
      initDone: true
    })
  }
}

function mapStateToProps(state) {
  return {
  }
}
function mapDispatchToProps(dispatch) {
  return {
    userinfoActions: bindActionCreators(userInfoActionsFromOtherFild, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App)