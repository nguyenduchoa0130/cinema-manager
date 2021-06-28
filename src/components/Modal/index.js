import { MDBBtn, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow } from 'mdbreact';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.module.scss';

const Modal = ({ isShowing, hide,title,children }) => {

  return (isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <MDBModal size="lg" isOpen={isShowing} toggle={hide}>
        <MDBModalHeader toggle={hide}>{title}</MDBModalHeader>
        <MDBModalBody className={styles.children}>
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