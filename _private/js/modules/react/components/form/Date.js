import React, { Component } from 'react'
import dateFormat from 'dateformat'

export default class DateElement extends Component {
  constructor(props){
    super(props);
  }

  onValueChange(e){
    this.props.onValueChange({
      values: [{value: e.currentTarget.value}],
      code: this.props.data.code
    });
  }

  onClickCurrentDate(){
    const now = new Date();
    this.props.onValueChange({
      values: [{value: dateFormat(now, "yyyy-mm-dd HH:MM:ss")}],
      code: this.props.data.code
    });
  }

  render() {
    let value = "";
    if(this.props.values && this.props.values[0] &&  this.props.values[0].value){
      value = this.props.values[0].value;
    }

    return (
      <div className="wrapper item">
        <input
          className="form-control date-element"
          type="text"
          onChange={(e) => this.onValueChange(e)}
          value={value}
        />
        <button type="button" className="btn btn-default current-datetime" onClick={e => this.onClickCurrentDate()}>
          現在日時
        </button>
      </div>
    )
  }
}
