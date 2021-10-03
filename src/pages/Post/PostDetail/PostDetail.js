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
import img from "./knowX_logo.png";

// eslint-disable-next-line arrow-body-style
const PostDetail = () => {
  return (
    <div className="web-container">
      <Header />
      <div className="web-content">
        <SidebarLeft />
        <div className="web-content-center">
          <div className="postDetail-container">
            <div className="postDetail-author">
              <img src={img} alt="img" />
              <a href="#">Vũ Quốc Hiệu</a>
              <button>Follow</button>
            </div>
            <div className="postDetail-date">Published 20/09/2021</div>
            <div className="postDetail-hastag">
              <a href="#">#react</a>
            </div>
            <div className="postDetail-title">
              <h5>Tìm hiểu về redux saga qua ví dụ thực tế</h5>
              <i className="ti-more-alt">
                <div className="postDetail-option">
                  <a href="#">Edit</a>
                  <a href="#">Delete</a>
                </div>
              </i>
            </div>
            <div className="postDetail-content">
              REDUX-SAGA LÀ GÌ?
              Redux saga là một thư viện redux middleware, giúp quản lý những side effect trong ứng dụng redux trở nên đơn giản hơn. Bằng việc sử dụng tối đa tính năng Generators ( function* ) của ES6, nó cho phép ta viết async code nhìn giống như là synchronos.\
              Khi view dispatch 1 action lên cho reducer xử lý thì trước tiên nó phải đi qua middleware Saga
              Khi Saga nhận được action mà view dispatch lên thì nó sẽ bắt lấy action đấy để xử lý
              Sau khi saga xử lý xong thì nó sẽ dùng hàm put để dispatch một action mới lên cho reducer (action này có thể kèm theo cả dữ liệu mà saga đã xử lý trước đó)
              Bây giờ thì reducer mới nhận được action, sau đó reducer sẽ xử các action theo các điều kiện khác nhau(tùy theo action mà saga gửi lên thì reducer xử lý).
            </div>
            <div className="postDetail-icons">
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
                    <p>Bài viết hay quá</p>
                  </div>
                  <div className="comment-item-react">
                    <i className="fas fa-thumbs-up" />
                    <i className="fas fa-thumbs-down" />
                    |
                    <p className="comment-item-reply"> Reply </p>
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

export default PostDetail;
