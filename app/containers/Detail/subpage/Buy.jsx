import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import BuyAndStore from '../../../components/BuyAndStore'

export default class Buy extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return (
      <div>
        <BuyAndStore></BuyAndStore>
      </div>

      )
  }
}