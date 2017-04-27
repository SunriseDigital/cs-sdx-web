import React, { Component } from 'react'

export default class TextEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    if (this.props.multiline) {
      return (
        <textarea
          name={this.props.name}
          rows={this.props.rows}
          cols={this.props.cols}
          onChange={(e) => this.props.onChange(e)}
        >
          {this.props.value}
        </textarea>
      )
    } else {
      return (
        <input
          type="text"
          name={this.props.name}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={(e) => this.props.onChange(e)}
        />
      )
    }
  }
}