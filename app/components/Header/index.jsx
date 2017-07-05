import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: []
    }
  }
  render() {
    return (
      <div id="common-header"><span className="back-icon" onClick={this.clickHandle.bind(this)}><i className="icon-chevron-left"></i></span>
      <h1>{this.props.title}</h1></div>
      )
  }
  clickHandle() {
    window.history.back()
  }
}
  