import React, { Component } from 'react'

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const self = this;
    $(this.refs.colorPicker).spectrum({
      color: self.props.color,
      change: function (color) {
        self.props.onChangeColor(color.toHexString())
      }
    });
  }

  render() {
    return (
      <div className="color-picker">
        <input type="text" value={this.props.color} ref="colorPicker" />
      </div>
    );
  }
}