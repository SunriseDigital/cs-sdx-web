import React, { Component } from 'react'

export default class TextEditor extends Component {
  constructor(props){
    super(props);
    this.keepInputIme = false;
  }

  onKeyDown(e){
    // keyDown時のkeyCode
    // Firefox[0],IE,Chrome,Safari[229]の時はIME入力中
    if (e.keyCode === 0 || e.keyCode === 229) {
      this.keepInputIme = true;
    }
  }

  onKeyUp(e){
    if (!this.keepInputIme && e.key === "Enter") {
      this.props.onPressEnterKey(e);
    }
    this.keepInputIme = false;
  }

  onChange(e){
    this.props.onChange(e.target.value);
  }

  render() {
    if (this.props.multiline) {
      return (
        <textarea
          name={this.props.name}
          value={this.props.value}
          rows={this.props.rows}
          cols={this.props.cols}
          placeholder={this.props.placeholder}
          onChange={(e) => this.onChange(e)}
          onKeyDown={(e) => this.onKeyDown(e)}
          onKeyUp={(e) => this.onKeyUp(e)}
        />
      )
    } else {
      return (
        <input
          type="text"
          name={this.props.name}
          placeholder={this.props.placeholder}
          onChange={(e) => this.onChange(e)}
          onKeyDown={(e) => this.onKeyDown(e)}
          onKeyUp={(e) => this.onKeyUp(e)}
        />
      )
    }
  }
}