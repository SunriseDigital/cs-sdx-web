import React, { Component } from 'react'

export default class TextEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyDownCode: 0,
      keepInputIme: false,
      keepShiftKey: false,
      keepCtrlKey: false
    }
  }

  onKeyDown(e){
    this.setState({
      keyDownCode: e.keyCode,
      keepInputIme: false,
      keepShiftKey: (e.keyCode == 16),
      keepCtrlKey: (e.keyCode == 17)      
    });
  }

  onKeyUp(e){
    // keyDown時のkeyCodeが[229]の時はIME入力中
    if (this.state.keyDownCode == 229) {
      this.setState({keepInputIme: true});
    }

    if (this.state.keyDownCode == e.keyCode && e.keyCode == 13) {
      let keyData = {};
      keyData.shift = this.state.keepShiftKey;
      keyData.ctrl = this.state.keepCtrlKey;
      this.props.onPressEnterKey(keyData);
    }
  }

  onChange(e){
    // IME入力中は変更を行わないようにする
    if (this.state.keepInputIme) {
      return false;
    }
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