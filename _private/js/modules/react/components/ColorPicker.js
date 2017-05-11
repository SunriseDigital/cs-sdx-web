import React, { Component } from 'react'

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.$colorPicker = $(this.refs.colorPicker);

    this.$colorPicker.spectrum({
      color: this.props.color,
      change: (color) => {
        this.props.onChangeColor(color.toHexString())
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.color != nextProps.color) {
      this.$colorPicker.spectrum("set", nextProps.color);
    }
  }

  render() {
    return (
      <div className="color-picker">
        <input type="text" ref="colorPicker" />
      </div>
    );
  }
}