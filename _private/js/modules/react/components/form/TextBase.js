import React, { Component } from 'react'

export default class TextBase extends Component {
  constructor(props){
    super(props);
    this.newId = 1;

    const inputs = [];
    this.props.values.forEach((target) => {
      inputs.push(this.createFormTag(target))
    });
    this.state = {
      inputs: inputs
    }

    this.$wrapper = null;
  }

  getCount(){
    return this.props.data.count === undefined ? 1 : this.props.data.count;
  }

  onValueChange(e){
    const values = [];
    this.$wrapper.find('.text-element').each((key, elem) => {
      const $elem = $(elem)
      values.push({
        id: $elem.attr("data-id"),
        value: $elem.val(),
      });
    });

    this.props.onValueChange({
      values: values,
      code: this.props.data.code
    });
  }

  createFormTag(){
    throw new Error("Imprements createFormTag");
  }

  componentDidMount(){
    this.$wrapper = $(this.refs.wrapper);
    if(this.props.data.count == 1){
      if(this.props.values.length == 0){
        this.onClickAdd();
      }
    } else {
      this.$wrapper
        .sortable({
  			  opacity: 0.8,
          handle: '.handle',
          stop: (ev, ui) => {
            this.onValueChange();
          }
        })
    }
  }

  onClickAdd(){
    const values = [...this.props.values];
    values.push({id: 'new_' + this.newId++, value: ""})
    this.props.onValueChange({
      values: values,
      code: this.props.data.code
    });
  }

  onClickDelete(e){
    const id = e.currentTarget.getAttribute("data-id");
    this.props.onValueChange({
      values: this.props.values.filter(target => target.id != id),
      code: this.props.data.code
    });
  }

  getDeleteButton(target){
    if(this.props.data.count == 1){
      return null;
    } else {
      return (
        <div className="delete">
          <button data-id={target.id} className="btn btn-danger" type="button" onClick={(e) => this.onClickDelete(e)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
      )
    }
  }

  render() {
    let addButton = null;
    let dragHandle = null;
    if(this.props.data.count > 1){
      addButton = (
        <button className="btn btn-primary" type="button" onClick={() => this.onClickAdd()}>
          <i className="fa fa-plus" aria-hidden="true"></i>&nbsp; 追加
        </button>
      )

      dragHandle = (
        <div className="handle">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
      )
    }

    return (
      <div>
        {addButton}
        <ul ref="wrapper" className="list-unstyled">
          {this.props.values.map(target => {
            return (
              <div key={target.id} className="clearfix">
                {dragHandle}
                <div className="body">
                  {this.createFormTag(target)}
                </div>
                {this.getDeleteButton(target)}
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}
