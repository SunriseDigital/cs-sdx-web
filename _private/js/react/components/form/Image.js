import React, { Component } from 'react'

export default class Image extends Component {
  constructor(props){
    super(props);
    this.state = {
      naturalSizeList: {}
    }

    this.newImageId = 1;
  }


  onLoadImage(e){
    const img = e.currentTarget;
    const newList = {...this.state.naturalSizeList};
    newList[img.getAttribute("data-id")] = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    }
    this.setState({"naturalSizeList": newList});
  }

  displayNaturalSize(image){
    if(this.state.naturalSizeList[image.id]){
      return (
        <div className="text-center">
          W:{this.state.naturalSizeList[image.id].width}&nbsp;
          H:{this.state.naturalSizeList[image.id].height}
        </div>
      )
    } else {
      return null;
    }
  }

  onClickRemove(e){
    const imgId = e.currentTarget.getAttribute("data-id");
    this.props.onValueChange({
      code: this.props.data.code,
      values: this.props.values.filter(image => image.id != imgId),
    });
  }

  onChangeInput(e){
    const input = e.currentTarget;
    if (input.files && input.files.length > 0) {
        for (var i = 0; i < input.files.length; i++) {
          const imageId = 'new_' + this.newImageId++;
          const reader = new FileReader();
          const file = input.files[i];
          reader.onload = (e) => {
            this.props.onValueChange({
              code: this.props.data.code,
              values: [...this.props.values, {id: imageId, path: e.target.result, file: file}],
            });
          }
          reader.readAsDataURL(file)
        }
    }
  }

  render() {
    return (
      <div>
        <input className="form-control" type="file" onChange={e => this.onChangeInput(e)} multiple />
        <ul className="clearfix list-unstyled">
          {this.props.values.map(image => {
            return (
              <li key={image.id} className="pull-left">
                <div>
                  <button data-id={image.id} onClick={e => this.onClickRemove(e)} className="btn btn-danger btn-sm" type="button">
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </button>
                </div>
                <div style={{
                  height: this.props.thumbHeight,
                  width: this.props.thumbWidth,
                }}>
                  <img
                    onLoad={e => this.onLoadImage(e)}
                    src={image.path} data-id={image.id}
                    style={{
                      maxHeight: this.props.thumbHeight,
                      maxWidth: this.props.thumbWidth,
                      display: 'block',
                      margin: 'auto',
                      width: 'auto',
                      height: 'auto',
                    }}
                  />
                </div>
                {this.displayNaturalSize(image)}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

Image.defaultProps = {
  thumbHeight: "180px",
  thumbWidth: "180px",
  onClickRemove: ()=>{},
}
