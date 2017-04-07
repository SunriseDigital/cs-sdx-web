import React, { Component } from 'react'

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log(this.props.color)
    $(".color-picker").find("#" + this.props.id).spectrum({
      color: this.props.color,
    });
  }

  componentWillReceiveProps() {
    $(".color-picker").find("#" + this.props.id).spectrum({
      color : this.props.color
    });
  }

  render() {    
    return (
      <div className="color-picker">
        <input type="text" id={this.props.id} />
      </div>
    );
  }
}