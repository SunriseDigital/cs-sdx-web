import React, { Component } from 'react'

export default class TextBase extends Component {
  constructor(props){
    super(props);
      this.newId = 1;
  }

  getCount(){
    return this.props.data.count === undefined ? 1 : this.props.data.count;
  }

  onValueChange(){
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

  componentDidMount(){
    const $wrapper = $(this.refs.wrapper);
    $wrapper
      .sortable({
			  opacity: 0.8,
        handle: '.handle',
        stop: (ev, ui) => {

        }
      })
  }

  render() {
    const count = this.getCount();
    const inputs = [];
    for (var i = 0; i < count; i++) {
      const target = this.props.values[i] ? this.props.values[i] : {};
      inputs.push(
        <li data-id={target.id} key={i}>
          <span className="handle" ><i className="fa fa-bars" aria-hidden="true"></i></span>{this.createFormTag(i, target)}
        </li>
      );
    }
    return (
      <ul ref="wrapper" className="list-unstyled">
        {inputs}
      </ul>
    )
  }
}
