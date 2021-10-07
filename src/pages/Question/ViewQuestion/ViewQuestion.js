/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Button, Stack } from "@material-ui/core";
import { Input } from "reactstrap";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import img from "./2.jpg";
// eslint-disable-next-line arrow-body-style
const ViewQuestion = () => {
  return (
    <div className="web-container">
      <Header />
      <div className="web-content">
        <SidebarLeft />
        <div className="web-content-center">
          <div className="postDetail-container">
            <div className="postDetail-author">
              <img src={img} alt="img" />
              <a href="#">Nguyễn Lê Duy Anh</a>
              <button>Follow</button>
              <div className="postDetail-date">Published 03/10/2021</div>
            </div>

            <div className="postDetail-hastag">
              <a href="#">#laravel</a>
              <a href="#">#php</a>
            </div>
            <br />
            <div className="postDetail-title">
              <h5>Hỏi về Unit Test trong Laravel</h5>
              <i className="ti-more-alt">
                <div className="postDetail-option">
                  <a href="#">Edit</a>
                  <a href="#">Delete</a>
                </div>
              </i>
            </div>
            <div className="postDetail-content"> Em viết unit test nó toàn chạy vào .env, làm thế nào để nó dùng .env=testing ạ? Em cảm ơn.</div>
            <div className="postDetail-icons">
              <Button variant="contained">ANSWER</Button>
              <i className="fas fa-thumbs-up" />
              <i className="fas fa-thumbs-down" />
              <i className="fas fa-bookmark" />
              <i className="fas fa-star" />
            </div>

            <div className="postDetail-comment-container">
              <Input type="text" name="comment" id="comment" placeholder="Write comment..." />
              <div className="postDetail-comment-list">
                <div className="comment-item">
                  <div className="comment-item-user">
                    <img src={img} alt="user-img" />
                    <a href="#">Nguyễn Hoàng Nam</a>
                  </div>
                  <div className="comment-item-comment">
                    <p>Bạn thêm option --env=testing vào trong command thì nó phpunit sẽ dùng file .env.testing trong project  https://laravel.com/docs/8.x/testing#the-env-testing-environment-file</p>
                  </div>
                  <div className="comment-item-react">
                    <i className="fas fa-thumbs-up" />
                    <i className="fas fa-thumbs-down" />
                    |
                    
                    <Button variant="contained" size="small" className="comment-item-reply"> Reply </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <SidebarRight />
      </div>
      <Footer />
    </div>
    // eslint-disable-next-line semi
  )
};

export default ViewQuestion;
