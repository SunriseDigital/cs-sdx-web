import React, { Component } from 'react'
import ReactModal from 'react-modal';
import assign from 'object-assign'

export default class Modal extends Component {
  constructor(props){
    super(props);
    this.style = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      },
      overlay: {
        zIndex                : '10010'
      }
    };
    if (this.props.style){
      if(this.props.style.content){
        this.style.content = assign(this.style.content, this.props.style.content);
      }

      if(this.props.style.overlay){
        this.style.overlay = assign(this.style.overlay, this.props.style.overlay);
      }
    }
  }

  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.style){
      if(nextProps.style.content){
        this.style.content = assign(this.style.content, nextProps.style.content);
      }

      if(nextProps.style.overlay){
        this.style.overlay = assign(this.style.overlay, nextProps.style.overlay);
      }
    }
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        contentLabel={this.props.contentLabel}
        style={this.style}
        closeTimeoutMS={this.props.closeTimeoutMS}
        onRequestClose={this.props.onRequestClose}
        onAfterOpen={this.props.onAfterOpen}
        parentSelector={this.props.parentSelector}
      >
        {this.props.children}
      </ReactModal>
    )
  }
}
