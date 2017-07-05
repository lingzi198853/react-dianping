import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import CommentList from '../../../components/CommentList'
import { getCommentData } from '../../../fetch/detail/detail'
import LoadMore from '../../../components/LoadMore'

import './style.less'

export default class Comment extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      data: [],
      hasMore: false,
      isLoadingMore: false,
      page: 0
    }
  }
  render() {
    return (
      <div className="detail-comment-subpage">
        <h2>用户点评</h2>
        {
          this.state.data.length
          ?<CommentList data={this.state.data}></CommentList>
          : ''
        }
        {
          this.state.hasMore
          ? <LoadMore isLoadingMore = {this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
          : ''
        }
      </div>
      )
  }

  componentDidMount(){
    this.loadFirstPageData()
  }
  // 加载首页数据
  loadFirstPageData(){
    const id = this.props.id
    const result = getCommentData(0, id)
    this.resultHandle(result)
  }
  // 加载更多数据
  loadMoreData(){
    this.setState({
      isLoadingMore: true
    })

    const id = this.props.id
    const page = this.state.page
    const result = getCommentData(page, id)
    this.resultHandle(result)

    this.setState({
      page: page + 1,
      isLoadingMore: false
    })
  }
  // 处理数据
  resultHandle(result){
    console.log(result)
    result.then(res => {return res.json()}).then(json => {
        const hasMore = json.hasMore
        const data = json.data
        this.setState({
          hasMore: hasMore,
          data: this.state.data.concat(data)
        })
    }).catch(ex=>{
      console.error('详情页获取用户评论数据出错, ', ex.message)
    })
  }
}