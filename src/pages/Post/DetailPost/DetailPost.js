/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Layout, Select } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { Input } from "reactstrap";
import Header from "../../../components/Header/Header";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import images from "../../../assets/images";

// import images from "../../assets/images";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
const { Content } = Layout;
const { Option } = Select;
const DetailPost = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Layout>
      <Header />
      <Layout>
        <SidebarLeft />
        <Content>
          <div className="container">
            <div className="postDetail-container">
              <div className="postDetail-author">
                <img src={images.knowXLogo} alt="img" />
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
                REDUX-SAGA LÀ GÌ? Redux saga là một thư viện redux middleware,
                giúp quản lý những side effect trong ứng dụng redux trở nên đơn
                giản hơn. Bằng việc sử dụng tối đa tính năng Generators (
                function* ) của ES6, nó cho phép ta viết async code nhìn giống
                như là synchronos.\ Khi view dispatch 1 action lên cho reducer
                xử lý thì trước tiên nó phải đi qua middleware Saga Khi Saga
                nhận được action mà view dispatch lên thì nó sẽ bắt lấy action
                đấy để xử lý Sau khi saga xử lý xong thì nó sẽ dùng hàm put để
                dispatch một action mới lên cho reducer (action này có thể kèm
                theo cả dữ liệu mà saga đã xử lý trước đó) Bây giờ thì reducer
                mới nhận được action, sau đó reducer sẽ xử các action theo các
                điều kiện khác nhau(tùy theo action mà saga gửi lên thì reducer
                xử lý).
              </div>
              <div className="postDetail-icons">
                <i className="fas fa-thumbs-up" />
                <i className="fas fa-thumbs-down" />
                <i className="fas fa-bookmark" />
                <i className="fas fa-star" />
              </div>

              <div className="postDetail-comment-container">
                <Input
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="Write comment..."
                />
                <div className="postDetail-comment-list">
                  <div className="comment-item">
                    <div className="comment-item-user">
                      <img src={images.knowXLogo} alt="user-img" />
                      <a href="#">Nguyễn Hoàng Nam</a>
                    </div>
                    <div className="comment-item-comment">
                      <p>Bài viết hay quá</p>
                    </div>
                    <div className="comment-item-react">
                      <i className="fas fa-thumbs-up" />
                      <i className="fas fa-thumbs-down" />
                      <p className="comment-item-reply"> Reply </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default DetailPost;
