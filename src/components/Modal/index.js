import { MDBBtn, MDBCol, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow } from 'mdbreact';
import React,{ useState } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide,title,children }) => {

  return (isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <MDBModal size="lg" isOpen={isShowing} toggle={hide}>
        <MDBModalHeader toggle={hide}>{title}</MDBModalHeader>
        <MDBModalBody>
          {children}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={hide}>Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </React.Fragment>, document.body
  ) : null)
}
export default Modal;