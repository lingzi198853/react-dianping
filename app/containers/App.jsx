import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <p>head</p>
        {this.props.children}
        <p>foot</p>
      </div>
    )
  }
}