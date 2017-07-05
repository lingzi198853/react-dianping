import React from 'react';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
      /*this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);*/
      this.state = {
        initDone: false
      }
  }
  render() {
    return (
      <div>
        {
          this.state.initDone ? this.props.children : <div>正在加载...</div>
        }
      </div>
    )
  }

  comonentDidMount() {
    // 获取位置信息
    let cityName = LocalStore.getItem(CITYNAME)
    if(cityName == null) {
      cityName = '北京'
    }
    // 更改状态
    this.setState({
      initDone: true
    })
  }
}