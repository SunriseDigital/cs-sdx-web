import React, { Component } from 'react'

export default class Textarea extends Component {
  constructor(props){
    super(props);
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

  render() {
    const count = this.props.data.count === undefined ? 1 : this.props.data.count;
    const inputs = [];
    for (var i = 0; i < count; i++) {
      const target = this.props.values[i] ? this.props.values[i] : {};
      inputs.push(
        <li key={i}>
          <textarea ref={"input-" + i} className="form-control" name="" data-id={target.id} cols="30" rows="10" onChange={(e) => this.onValueChange(e)} value={target.value||""}></textarea>
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

Textarea.defaultProps = {
  values: []
}
