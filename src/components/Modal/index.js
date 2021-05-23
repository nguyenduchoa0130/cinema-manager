import { MDBBtn, MDBCol, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow } from 'mdbreact';
import React,{ useState } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide }) => {

  return (isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <MDBModal size="lg" isOpen={isShowing} toggle={hide}>
        <MDBModalHeader toggle={hide}>MDBModal title</MDBModalHeader>
        <MDBModalBody>
          (...)
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