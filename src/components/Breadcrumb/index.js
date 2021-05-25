
import React from "react";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBCard, MDBCardBody } from 'mdbreact';
import { Router, Switch, Route } from "react-router";
import styles from "./style.module.scss";
const Breadcrumb = () => {
  return (
    <MDBCard className="mt-2">
      <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
        <MDBBreadcrumb light color="primary">
          <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
          <MDBBreadcrumbItem active>Library</MDBBreadcrumbItem>
        </MDBBreadcrumb>
      </MDBCardBody>
    </MDBCard>

  );
}

export default Breadcrumb;