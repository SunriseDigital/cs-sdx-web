import TextBase from './TextBase';

export default class Text extends TextBase {
  createFormTag(target){
    if(this.props.data.select){
      return (
        <select
          data-id={target.id}
          className="form-control text-element"
          onChange={(e) => this.onValueChange(e)} value={target.value || ""}
        >
          {this.props.data.select.map((option, key) => {
            return (
              <option key={key} value={option.value}>{option.label}</option>
            )
          })}
        </select>
      )
    } else {
      return (
        <input
          data-id={target.id}
          className="form-control text-element"
          type="text"
          onChange={(e) => this.onValueChange(e)} value={target.value || ""}
        />
      )
    }
  }
}

Text.defaultProps = {
  values: []
}
