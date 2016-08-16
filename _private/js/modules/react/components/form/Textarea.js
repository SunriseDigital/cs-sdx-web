import TextBase from './TextBase';


export default class Textarea extends TextBase {
  createFormTag(key, target){
    return (
      <textarea ref={"input-" + key} className="form-control" name="" data-id={target.id ? target.id : 'new_' + this.newId++} cols="30" rows="10" onChange={(e) => this.onValueChange(e)} value={target.value||""}></textarea>
    )
  }
}

Textarea.defaultProps = {
  values: []
}
