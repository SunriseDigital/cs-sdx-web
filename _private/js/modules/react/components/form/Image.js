import React, { Component } from 'react'

export default class Image extends Component {
  constructor(props){
    super(props);
    this.state = {
      naturalSizeList: {}
    }

    this.$wrapper = null;
  }

  componentDidMount(){
    this.$wrapper = $(this.refs.wrapper);
    if(this.props.data.count > 1){
      this.$wrapper
        .sortable({
  			  opacity: 0.8,
          handle: '.drag-handle',
          stop: (ev, ui) => {
            const objValues = {};
            this.props.values.forEach(image => objValues[image.id] = image);

            const newValues = [];
            this.$wrapper.find(".image-wrapper").each((key, elem) => {
              const id = elem.getAttribute("data-id");
              newValues.push(objValues[id]);
            })

            this.props.onValueChange({
              code: this.props.data.code,
              values: newValues,
            });
          }
        })
    }
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
          const imageId = 'new_' + Image.newId++;
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
      <div className="wrapper">
        <input className="form-control" type="file" onChange={e => this.onChangeInput(e)} multiple />
        <ul ref="wrapper" className="clearfix list-unstyled">
          {this.props.values.map(image => {
            return (
              <li key={image.id} data-id={image.id} className="pull-left image-wrapper">
                <div className="header">
                  <button data-id={image.id} onClick={e => this.onClickRemove(e)} className="btn btn-danger btn-sm remove" type="button">
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </button>
                </div>
                <div className="image" style={{
                  height: this.props.thumbHeight,
                  width: this.props.thumbWidth,
                }}>
                  <img
                    className="drag-handle"
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
  values: [],
}

//画像はPOST時のキー名がidになるので全体でユニークである必要があります。
Image.newId = 1;
