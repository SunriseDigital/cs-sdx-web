import TextBase from './TextBase';

export default class Text extends TextBase {
  createFormTag(target){
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

Text.defaultProps = {
  values: []
}
