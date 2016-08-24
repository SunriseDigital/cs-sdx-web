import TextBase from './TextBase';


export default class Textarea extends TextBase {
  createFormTag(target){
    return (
      <textarea
        className="form-control text-element"
        name=""
        data-id={target.id}
        cols="30"
        rows="10"
        onChange={(e) => this.onValueChange(e)} value={target.value||""}
      >
      </textarea>
    )
  }
}

Textarea.defaultProps = {
  values: []
}
