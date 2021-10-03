/* eslint-disable import/order */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/react-in-jsx-scope */
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import "./styles.scss";
import img from "./knowX_logo.png";
import { Pagination } from "@material-ui/core";

const NewestPost = () => (
  <div className="web-container">
    <Header />
    <div className="web-content">
      <SidebarLeft />
      <div className="web-content-center">
        <div className="following-post-container">
          <div className="following-post-item">
            <div className="following-post-user">
              <img src={img} alt="user-img" />
              <a href="#">Knowx Admin</a>
              <button>Follow</button>
            </div>
            <div className="following-post-title">
              <a href="#">Seminar Hướng nghiệp</a>
            </div>
            <div className="following-post-detail">
              <p className="following-post-date">15/09/2021 |</p>
              <i className="ti-angle-up">10</i>
              <i className="ti-angle-up">0</i>
              <i className="ti-angle-up">12</i>
              |
              <button>Following</button>
            </div>
            <div className="following-post-hastag">
              <a href="#">#react</a>
            </div>
          </div>
        </div>
      </div>
      <SidebarRight />
    </div>
    <Footer />
  </div>
);

export default NewestPost;
