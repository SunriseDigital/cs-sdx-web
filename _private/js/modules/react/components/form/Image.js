import React, { Component } from 'react'

export default class Image extends Component {
  constructor(props){
    super(props);
    this.state = {
      naturalSizeList: {}
    }

    this.$wrapper = null;
  }

  getMaxCount(){
    if(this.props.data.count == undefined){
      return 1;
    }

    return this.props.data.count;
  }

  componentDidMount(){
    this.$wrapper = $(this.refs.wrapper);
    if(this.getMaxCount() > 1){
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
    let count = this.props.values.length;
    let overMaxCount = 0;
    if (input.files && input.files.length > 0) {
      for (var i = 0; i < input.files.length; i++) {
        if(count < this.getMaxCount()){
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
          count++;
        } else {
          ++overMaxCount;
        }
      }
    }

    if(overMaxCount > 0){
      alert("画像は" + this.getMaxCount() + "枚まで登録可能です。" + overMaxCount + "枚の画像が破棄されました。");
    }

    //クリアしておかないとonChaangeが呼ばれない。
    input.value = "";
  }

  getFileName(image){
    if(image.file){
      return image.file.name;
    } else {
      const paths = image.path.split('/');
      return paths[paths.length - 1];
    }
  }

  render() {
    const descriptions = this.props.data.description || [];
    const inputFileProps = {
      multiple: this.getMaxCount() > 1,
      disabled: this.getMaxCount() <= this.props.values.length
    }
    return (
      <div className="wrapper">
        <input className="form-control" type="file" onChange={e => this.onChangeInput(e)}  {...inputFileProps} />
        {descriptions.map((value, key) => {
          return <p key={key} className="description">{value}</p>
        })}
        <ul ref="wrapper" className="clearfix list-unstyled list">
          {this.props.values.map(image => {
            return (
              <li key={image.id} data-id={image.id} className="pull-left image-wrapper item">
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
                <div>{this.getFileName(image)}</div>
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
