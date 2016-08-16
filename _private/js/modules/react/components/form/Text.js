import React, { Component } from 'react'

export default class Text extends Component {
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

  render() {
    const count = this.getCount();
    const inputs = [];
    for (var i = 0; i < count; i++) {
      const target = this.props.values[i] ? this.props.values[i] : {};
      inputs.push(
        <li key={i}>
          <input ref={"input-" + i} data-id={target.id ? target.id : 'new_' + this.newId++} className="form-control" type="text" onChange={(e) => this.onValueChange(e)} value={target.value || ""} />
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

Text.defaultProps = {
  values: []
}
