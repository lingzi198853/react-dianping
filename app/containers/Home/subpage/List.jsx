import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'
import { getListData } from '../../../fetch/home/home'

export default class List extends React.Component {
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
      <h2 className="home-list-title">猜你喜欢</h2>
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
    const result = getListData(cityName, 0)
    this.resultHandle(result)
  }

  // 处理数据
  resultHandle(result){
    result.then(res => {return res.json()}).then(json => {
        const hasMore = json.hasMore
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
    const cityName = this.props.cityName
    const page = this.state.page
    const result = getListData(cityName, page)
    this.resultHandle(result)

    this.setState({
      page: page + 1,
      isLoadingMore: false
    })
  }
}