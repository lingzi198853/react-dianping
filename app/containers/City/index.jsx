import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
// 引入redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'

// 引入本地存储
import { CITYNAME } from '../../config/localStoreKey'
import localStore from '../../util/localStore'

import HeaderComponent from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'

class City extends React.Component {
  constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
  render() {
    return (
      <div>
        <HeaderComponent title='选择城市'></HeaderComponent>
        <CurrentCity cityName={this.props.userinfo.cityName}></CurrentCity>
        <CityList changeFn={this.changeCity.bind(this)}></CityList>
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
    this.props.search('/')
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