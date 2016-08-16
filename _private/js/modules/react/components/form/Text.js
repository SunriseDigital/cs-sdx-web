import TextBase from './TextBase';

export default class Text extends TextBase {
  createFormTag(key, target){
    return (
      <input ref={"input-" + key} data-id={target.id ? target.id : 'new_' + this.newId++} className="form-control" type="text" onChange={(e) => this.onValueChange(e)} value={target.value || ""} />
    )
  }
}

Text.defaultProps = {
  values: []
}
