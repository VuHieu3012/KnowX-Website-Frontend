/* eslint-disable import/order */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/react-in-jsx-scope */
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import "./styles.scss";
import img from "./2.jpg";
import { Pagination } from "@material-ui/core";

const ListQuestion = () => (
  <div className="web-container">
    <Header />
    <div className="web-content">
      <SidebarLeft />
      <div className="web-content-center">
        <div className="following-post-container">
          <div className="following-post-item">
            <div className="following-post-user">
              <img src={img} alt="user-img" />
              <a href="#">Nguyễn Lê Duy Anh</a>
              <button>Follow</button>
            </div>
            <div className="following-post-title">
              <a href="#">Hỏi về unit test trong Laravel</a>
            </div>
            <div className="following-post-detail">
              <p className="following-post-date">15/09/2021 |</p>
              <i className="ti-angle-up">10</i>
              <i className="ti-angle-up">0</i>
              <i className="ti-angle-up">12</i>
              |
              <button>Accepted</button>
            </div>
            <div className="following-post-hastag">
              <a href="#">#laravel</a>
            </div>
          </div>
        </div>
      </div>
      <SidebarRight />
    </div>
    <Footer />
  </div>
);

export default ListQuestion;
