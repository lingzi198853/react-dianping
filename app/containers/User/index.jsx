import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'

import Header from '../../components/Header'
import UserInfo from '../../components/UserInfo'
import OrderList from './subpage'

class User extends React.Component {
  constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
  render() {
    const userinfo = this.props.userinfo
    return (
      <div>
        <Header title="用户主页"></Header>
        <UserInfo username={userinfo.username} city={userinfo.cityName}></UserInfo>
        <OrderList username={userinfo.username}></OrderList>
      </div>
    )
  }
  componentDidMount(){
     // 如果未登录，跳转到登录页面
     if(!this.props.userinfo.username){
        this.props.history.push('/login')
     }
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
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)