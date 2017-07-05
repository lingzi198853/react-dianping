import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router-dom'
import SearchInput from '../SearchInput'
import './style.less'

export default class HomeHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div id="home-header" className="clear-fix">
        <div className="home-header-left float-left">
          <Link to="/city">
            <span>{this.props.cityName}</span>&nbsp;
            <i className="icon-angle-down"></i>
          </Link>
        </div>
        <div className="home-header-right float-right">
          <Link to="/login"><i className="icon-user"></i>
          </Link>
        </div>
        <div className="home-header-middle">
          <div className="search-container">
            <i className="icon-search"></i>
            <SearchInput value="" enterHandle={this.enterHandle.bind(this)}></SearchInput>
          </div>
        </div>
    </div>
      )
  }
  enterHandle(value) {
    this.props.search('/search/all/' + encodeURIComponent(value))
  }
}