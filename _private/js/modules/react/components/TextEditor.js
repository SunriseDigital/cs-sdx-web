import React, { Component } from 'react'

export default class TextEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyCode: {},
      keepInputIme: false
    }
  }

  onKeyDown(e){
    let keepInputIme = false;
    // keyDown時のkeyCode
    // Firefox[0],IE,Chrome,Safari[229]の時はIME入力中
    if (e.keyCode == 0 || e.keyCode == 229) {
      keepInputIme = true;
    }
    this.setState({
      keyCode: {
        down: (this.state.keyCode.down) ? this.state.keyCode.down.concat(e.keyCode) : [e.keyCode]
      },
      keepInputIme: keepInputIme
    });
  }

  onKeyUp(e){
    if (this.state.keyCode.down.includes(e.keyCode) && e.keyCode == 13) {
      let data = this.state.keyCode;
      // IME入力中はfalseを返す
      if (this.state.keepInputIme) {
        data = false;
      }
      this.props.onPressEnterKey(data);
    }
    this.setState({
      keyCode: {
        down: []
      },
      keepInputIme: false
    })
  }

  onChange(e){
    this.props.onChange(e.target.value);
  }

  render() {
    if (this.props.multiline) {
      return (
        <textarea
          name={this.props.name}
          rows={this.props.rows}
          cols={this.props.cols}
          onChange={(e) => this.onChange(e)}
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
          onChange={(e) => this.onChange(e)}
          onKeyDown={(e) => this.onKeyDown(e)}
          onKeyUp={(e) => this.onKeyUp(e)}
        />
      )
    }
  }
}