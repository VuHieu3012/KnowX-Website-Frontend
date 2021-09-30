/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import logo from "./4h+logo.png";

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo">
      <img src={logo} alt="footer logo" />
    </div>
    <div className="footer-resources">
      <h5>RESOURCES</h5>
      <div className="footer-resources-content">
        <div className="footer-resources-left">
          <a href="#">Post</a>
          <a href="#">Question</a>
          <a href="#">Video Call</a>
        </div>
        <div className="footer-resources-right">
          <a href="#">Find buddy</a>
          <a href="#">Find mentor</a>
        </div>
      </div>
    </div>
    <div className="contact">
      <h5>CONTACT US</h5>
      <a href="#"> <i className="ti-email" /></a>
      <a href="#"> <i className="ti-facebook" /></a>
    </div>
  </div>
);

export default Footer;
