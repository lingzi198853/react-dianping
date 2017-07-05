import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
export default class UserInfo extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return (
      <div className="userinfo-container">
          <p><i className="icon-user"></i>
            &nbsp;
            <span>18925295248</span>
          </p>
          <p><i className="icon-map-marker"></i>
            &nbsp;
            <span>上海</span>
          </p>
      </div>
      )
  }
}