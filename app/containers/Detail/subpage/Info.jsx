import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import DetailInfo from '../../../components/DetailInfo'
import { getInfoData } from '../../../fetch/detail/detail'

export default class Info extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      data: false
    }
  }
  render() {
    return (
      <div>
        {
          this.state.data ?
          <DetailInfo data={this.state.data} />
          : ''
        }
      </div>
      )
  }

  componentDidMount(){
    const id = this.props.id
    console.log(this.props.id)
    getInfoData(id).then((res)=>{
      return res.json()
    }).then(json => {
      this.setState({
        data: json
      })
    }).catch(ex=> {
    if(__DEV__) {
      console.error('详情页，获取商户信息出错', ex.message)
    }
  })
  }
}