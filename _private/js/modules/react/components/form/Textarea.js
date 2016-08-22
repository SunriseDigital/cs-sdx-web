import TextBase from './TextBase';


export default class Textarea extends TextBase {
  createFormTag(target){
    return (
      <li key={target.id}>
        <textarea
          className="form-control textarea-element"
          name=""
          data-id={target.id}
          cols="30"
          rows="10"
          onChange={(e) => this.onValueChange(e)} value={target.value||""}
        >
        </textarea>
      </li>
    )
  }
}

Textarea.defaultProps = {
  values: []
}
