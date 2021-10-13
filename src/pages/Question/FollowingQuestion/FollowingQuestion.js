/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Layout, Select } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import images from "../../../assets/images";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
const { Content } = Layout;
const { Option } = Select;
const FollowingQuestion = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Layout>
      <Header />
      <Layout>
        <SidebarLeft />
        <Content>
          <div className="container-homepage">
            <div>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginRight: "25px",
                }}
              >
                All Updates
              </span>
              <Select
                defaultValue="Followings"
                style={{
                  width: 200,
                  borderRadius: "5px",
                }}
                onChange={handleChange}
              >
                <Option value="followings">Followings</Option>
                <Option value="newest">Newest</Option>
                <Option value="topRead">Top red</Option>
                <Option value="masterPost">Master post</Option>
                <Option value="createPost">Create post</Option>
              </Select>
            </div>
            <div className="content">
              <div className="user-profile">
                <img className="avatar" src={images.knowXLogo} />
                <span className="user-name">KnowX Admin</span>
                <span className="following">Following</span>
              </div>
              <div className="title">
                <Link to="/post/detail">
                  Seminar hướng nghiệp “Hello world” cho tân sinh viên
                </Link>
              </div>
              <div className="description">
                {/* Vừa qua, Khoa công nghệ thông tin (CNTT) ĐH Thái Bình Dương đã
                tổ chức Seminar “Những kiến thức, kỹ năng sinh viên IT cần có
                khi tìm việc” thu hút gần 100 sinh viên, học sinh THPT tham dự.
                Đặc biệt, sinh viên năm cuối được huấn luyện một số kỹ năng và
                được phỏng vấn,........... */}
              </div>
              <div className>
                <span className="time">15/09/2021</span>
                <div className="react">
                  <span className="like"> </span>
                  <span className="dislike"> </span>
                  <span className="comment"> </span>
                </div>
              </div>
              <div className="hashtag">
                <span>#admin</span>
                <span>#seminar</span>
              </div>
            </div>
            <div className="content">
              <div className="user-profile">
                <img className="avatar" src={images.knowXLogo} />
                <span className="user-name">Hoàng Anh</span>
                <span className="following">Following</span>
              </div>
              <div className="title">React: Hello world!</div>
              <div className="description">
                {/* This is the first chapter in a step-by-step guide about main
                React concepts. You can find a list of all its chapters in the
                navigation sidebar. If you’re reading this from a mobile device,
                you can access the navigation by pressing the button in the
                bottom right corner of your screen. */}
              </div>
              <div className>
                <span className="time">15/09/2021</span>
                <div className="react">
                  <span className="like"> </span>
                  <span className="dislike"> </span>
                  <span className="comment"> </span>
                </div>
              </div>
              <div className="hashtag">
                <span>#admin</span>
                <span>#seminar</span>
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

export default FollowingQuestion;
