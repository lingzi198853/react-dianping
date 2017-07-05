import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import SearchHeader from '../../components/SearchHeader'
import SearchList from './subpage';

export default class Search extends React.Component {
  constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
  render() {
    const params = this.props.match.params
    return (
      <div>
        <SearchHeader keyword={params.keyword}></SearchHeader>
        <SearchList category={params.category} keyword={params.keyword}></SearchList>
      </div>
    )
  }
}