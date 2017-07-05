import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'

import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'
import { getSearchData } from '../../../fetch/search/search'

class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: [],
      hasMore: false,
      isLoadingMore: false,
      page: 0
    }
  }
  render() {
    return (
      <div>
        {
          this.state.data.length
          ? <ListComponent data={this.state.data} />
          : <div>{/* 加载中... */}</div>
        }
        {
          this.state.hasMore
          ? <LoadMore isLoadingMore = {this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
          : ''
        }
      </div>
      )
  }
  componentDidMount() {
    this.loadFirstPageData()
  }

  // 获取首页数据
  loadFirstPageData(){
    const cityName = this.props.cityName
    const category = this.props.category
    const keyword = this.props.keyword
    const result = getSearchData(0, cityName, category, keyword)
    this.resultHandle(result)
  }

  // 处理数据
  resultHandle(result){
    result.then(res => {return res.json()}).then(json => {
        const hasMore = json.hasMore
        const category = this.state.category
        const data = json.data
        this.setState({
          hasMore: hasMore,
          data: this.state.data.concat(data)
        })
    }).catch(ex => {
      if(__DEV__) {
        console.error('首页广告模块获取数据报错,', ex.message)
      }
    }) 
  }

  // 加载更多数据
  loadMoreData(){
    // 记录状态
    this.setState({
      isLoadingMore: true
    })
    const page = this.state.page
    const cityName = this.props.cityName
    const category = this.props.category
    const keyword = this.props.keyword
    const result = getSearchData(0, cityName, category, keyword)
    this.resultHandle(result)

    this.setState({
      page: page + 1,
      isLoadingMore: false
    })
  }

  // 处理重新搜索
  componentDidUpdate(prevProps, prevState) {
    const keyword = this.props.keyword
    const category = this.props.category
    // 搜索条件完全相等时，忽略。重要！！！
    if(keyword === prevProps.keyword && category === prevProps.category ) {
      return
    }

    // 重置 state
    this.setState(initialState)

    // 重新加载数据
    this.loadFirstPageData()

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
)(SearchList)