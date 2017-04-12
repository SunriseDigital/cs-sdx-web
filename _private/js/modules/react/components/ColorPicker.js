import React, { Component } from 'react'

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
  }

  initializeColorPicker(props)
  {
    $(".color-picker").find("#" + props.id).spectrum({
      color: props.color,
      change: function(color){ 
        props.onChangeColor(color.toHexString())
      }
    });
  }

  componentDidMount(){
    this.initializeColorPicker(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.color != nextProps.color)
    {
      this.initializeColorPicker(nextProps);
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