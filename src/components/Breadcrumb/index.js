
import React from "react";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBCard, MDBCardBody } from 'mdbreact';
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