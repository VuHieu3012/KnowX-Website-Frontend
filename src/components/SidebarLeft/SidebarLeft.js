/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import userImg from "./user-image.jpg";

const SidebarLeft = () => (
  <div className="sidebar-left">
    <div className="sidebar-profile">
      <img src={userImg} alt="" />
      <a src="#" className="user-name">CHAU TINH TRI</a>
    </div>

    <div className="sidebar-list-items">
      <div className="sidebar-item">
        <i className="ti-agenda" />
        <p> Class</p>
      </div>
      <div className="sidebar-item">
        <i className="ti-receipt" />
        <p> Certifications</p>
      </div>
      <div className="sidebar-item">
        <i className="ti-email" />
        <p> Messages</p>
      </div>
      <div className="sidebar-item">
        <i className="ti-bell" />
        <p> Notifications</p>
      </div>
    </div>
    <button className="signout-button">
      <i className="ti-back-right" />
      Sign out
    </button>
  </div>
);

export default SidebarLeft;
