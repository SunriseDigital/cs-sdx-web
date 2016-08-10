import React, { Component } from 'react'

export default class Date extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <input className="form-control" type="date"/>
      </div>
    )
  }
}
