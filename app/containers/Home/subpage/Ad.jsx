import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeAd from '../../../components/HomeAd'
import { getAdData } from '../../../fetch/home/home'

export default class Ad extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: []
    }
  }
  render() {
    return (
      <div>
        {
          this.state.data.length
          ? <HomeAd data={this.state.data} />
          : <div>{/* 加载中... */}</div>
        }
      </div>
      )
  }
  componentDidMount() {
    // 获取广告数据
    getAdData().then(res => {return res.json()}).then(json => {
      if(json.length) {
        this.setState({
          data: json
        })
      }
    }).catch(ex => {
      if(__DEV__) {
        console.error('首页广告模块获取数据报错,', ex.message)
      }
    })
    
  }
}