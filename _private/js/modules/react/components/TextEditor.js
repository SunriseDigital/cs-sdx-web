import React, { Component } from 'react'

export default class TextEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    if (this.props.multiline) {
      // <textarea>
      return (
        <textarea></textarea>
      )

    } else {
      // <input type="text">
      return (
        <input type="text" />
      )
    }
  }
}