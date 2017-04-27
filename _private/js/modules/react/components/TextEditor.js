import React, { Component } from 'react'

export default class TextEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyCode: ""
    }
  }

  onKeyDown(e){
    //for checked japanese IME input
    this.setState({
      keyCode: e.keyCode
    });
  }

  onKeyUp(e){
    //enter key
    if (this.state.keyCode == e.keyCode && e.keyCode == 13) {
      this.props.onPressEnterKey(e.target.value);
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
          onKeyDown={(e) => this.onKeyDown(e)}
          onKeyUp={(e) => this.onKeyUp(e)}
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
          onChange={(e) => this.props.onChange(e.target.value)}
          onKeyDown={(e) => this.onKeyDown(e)}
          onKeyUp={(e) => this.onKeyUp(e)}
        />
      )
    }
  }
}