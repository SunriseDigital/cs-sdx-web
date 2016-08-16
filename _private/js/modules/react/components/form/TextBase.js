import React, { Component } from 'react'

export default class TextBase extends Component {
  constructor(props){
    super(props);
      this.newId = 1;
  }

  getCount(){
    return this.props.data.count === undefined ? 1 : this.props.data.count;
  }

  onValueChange(e){
    const count = this.getCount();
    const values = [];
    for (var i = 0; i < count; i++) {
      const elem = this.refs["input-" + i];
      values.push({
        value: elem.value,
        id: elem.getAttribute('data-id'),
      });
    }

    this.props.onValueChange({
      values: values,
      code: this.props.data.code
    });
  }

  createFormTag(){
    throw new Error("Imprements createFormTag");
  }

  render() {
    const count = this.getCount();
    const inputs = [];
    for (var i = 0; i < count; i++) {
      const target = this.props.values[i] ? this.props.values[i] : {};
      inputs.push(
        <li key={i}>
          {this.createFormTag(i, target)}
        </li>
      );
    }
    return (
      <ul className="list-unstyled">
        {inputs}
      </ul>
    )
  }
}
