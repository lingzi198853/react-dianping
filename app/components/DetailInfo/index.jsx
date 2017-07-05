import React from 'react';
import Star from '../../components/Star';

import './style.less'
export default class DetailInfo extends React.Component {
  render() {
    const data = this.props.data
    return (
      <div>
          <div id="detail-info-container">
              <div className="info-container clear-fix">
                  <div className="info-img-container float-left"><img src={data.img}/></div>
                  <div className="info-content">
                      <h1>{data.title}</h1>
                      <div className="star-container">
                          <div className="star-container"><i className="icon-star light"></i><i className="icon-star light"></i><i className="icon-star light"></i><i className="icon-star light"></i><i className="icon-star"></i></div><span className="price">￥{data.price}</span></div>
                      <p className="sub-title">{data.subTitle}</p>
                  </div>
              </div>
              <p className="info-desc" dangerouslySetInnerHTML={{__html:data.desc}}></p>
          </div>
      </div>
      )
  }
}