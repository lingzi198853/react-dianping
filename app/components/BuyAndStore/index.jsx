import React from 'react';

import './style.less'
export default class Star extends React.Component {
  render() {
    return (
      <div className="buy-store-container clear-fix">
          <div className="item-container float-left">
              <button>收藏</button>
          </div>
          <div className="item-container float-right">
              <button>购买</button>
          </div>
      </div>

      )
  }
}