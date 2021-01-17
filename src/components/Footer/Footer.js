import React from "react";

import { Nav, Navbar } from "react-bootstrap";
import { FaFacebookSquare, FaEnvelope } from "react-icons/fa";
import { ImPhone } from "react-icons/im";

const Footer = () => {
  return (
    <div id="footer-wrapper">
      <Navbar className=" footer-custom">
        <Nav className="mr-auto" id="footer-custom-links">
          <Nav.Link className="footer-link" href="tel: +6108 9332 8397">
            <ImPhone />
          </Nav.Link>

          <Nav.Link
            className="footer-link"
            href="mailto: sorpotters@hotmail.com"
          >
            <FaEnvelope />
          </Nav.Link>
          <Nav.Link
            className="footer-link"
            href="https://www.facebook.com/southriverpotters/"
          >
            <FaFacebookSquare />
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Footer;
