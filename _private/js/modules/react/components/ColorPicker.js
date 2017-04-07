import React, { Component } from 'react'

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const self = this;

    $(".color-picker").find("#" + self.props.id).spectrum({
      color: self.props.color,
      change: function(color){ 
        self.props.onChangeColor(color.toHexString())
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.color != nextProps.color)
    {
      $(".color-picker").find("#" + this.props.id).spectrum({
        color: nextProps.color
      });
    }
  }

  render() {
    return (
      <div className="color-picker">
        <input type="text" id={this.props.id} />
      </div>
    );
  }
}