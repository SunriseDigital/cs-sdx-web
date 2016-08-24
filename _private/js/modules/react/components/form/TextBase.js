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

    this.$list = null;
  }

  getCount(){
    return this.props.data.count === undefined ? 1 : this.props.data.count;
  }

  onValueChange(e){
    const values = [];
    this.$list.find('.text-element').each((key, elem) => {
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
    this.$list = $(this.refs.list);
    if(this.props.data.count == 1){
      if(this.props.values.length == 0){
        this.onClickAdd();
      }
    } else {
      this.$list
        .sortable({
  			  opacity: 0.8,
          handle: '.drag-handle',
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

  getDragHandle(target){
    if(this.props.data.count == 1){
      return null;
    } else {
      return (
        <div className="drag-handle">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
      )
    }
  }

  render() {
    let addButton = null;
    if(this.props.data.count > 1){
      addButton = (
        <button className="btn btn-primary add" type="button" onClick={() => this.onClickAdd()}>
          <i className="fa fa-plus" aria-hidden="true"></i>&nbsp; 追加
        </button>
      )
    }

    return (
      <div className="wrapper">
        {addButton}
        <ul ref="list" className="list-unstyled list">
          {this.props.values.map(target => {
            return (
              <li key={target.id} className="clearfix item">
                {this.getDragHandle(target)}
                <div className="element">
                  {this.createFormTag(target)}
                </div>
                {this.getDeleteButton(target)}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
