import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// 引入redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'

// 引入本地存储
import localStore from '../../util/localStore'

import HeaderComponent from '../../components/Header'
import Info from './subpage/Info'
import Buy from './subpage/Buy'
import Comment from './subpage/Comment'

class City extends React.Component {
  constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
  render() {
    const id = this.props.match.params.id
    return (
      <div>
        <HeaderComponent title='商户详情'></HeaderComponent>
        <Info id={id}></Info>
        <Buy></Buy>
        <Comment id={id}></Comment>
      </div>
    )
  }
  changeCity(newCity){
    if(newCity == null) {
      return
    }
    // 修改redux
    const userinfo = this.props.userinfo
    userinfo.cityName = newCity
    this.props.userInfoActions.update(userinfo)

    // 修改本地存储
    localStore.setItem(CITYNAME, newCity)

    // 跳转页面
    this.props.history.push('/')
  }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)