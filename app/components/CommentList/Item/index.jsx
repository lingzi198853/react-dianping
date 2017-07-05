import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Star from '../../Star'

import './style.less'

export default class Item extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const item = this.props.data
    return (
      <div className="comment-item">
        <h3>
        <i className="icon-user"></i>
        &nbsp;{item.username}</h3>
        <Star star={item.star}></Star>
        <p>{item.comment}</p>
    </div>
    )
  }
}