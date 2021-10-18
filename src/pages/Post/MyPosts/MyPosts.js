/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Layout, Select, Button, Tooltip } from "antd";
import { createFromIconfontCN, SearchOutlined } from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import images from "../../../assets/images";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
const { Content } = Layout;
const { Option } = Select;

const MyPosts = () => {
  const [listPost, setList] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getPersonal() {
      const token = sessionStorage.getItem("token");
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user",
          requestOptions
        );
        const responseJSON = await response.json();
        setUser(responseJSON.data);
        console.log("personal: ", user);
      } catch (error) {
        console.log("Faild fetch user : ", error.message);
      }
    }

    async function getPostData() {
      const token = sessionStorage.getItem("token");
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/posts",
          requestOptions
        );
        const responseJSON = await response.json();
        setList(responseJSON.data);
        console.log("list post: ", listPost);
      } catch (error) {
        console.log("Failed fetch list Posts", error.message);
      }
    }
    getPersonal();
    getPostData();
  }, []);

  // convert timestams to date
  const formatDate = (timestams) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    };
    return new Date(timestams).toLocaleDateString(undefined, options);
  };

  let myPostsData = [];
  if (listPost.length !== 0) {
    myPostsData = listPost.map((post) => (
      <div className="content">
        <div className="user-profile">
          <img className="avatar" src={images.knowXLogo} />
          <span className="user-name">{user.full_name}</span>
        </div>
        <div className="title">
          <Link exact to={`/post/detail/${post.id}`}>
            {post.title}
          </Link>
        </div>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className>
          <span className="time">{formatDate(post.updated_at)}</span>
          <div className="react">
            <span className="like"> </span>
            <span className="dislike"> </span>
            <span className="comment"> </span>
          </div>
        </div>
        <div className="hashtag">
          <span>{post.hashtag}</span>
        </div>
      </div>
    ));
  } else {
    myPostsData = <p>Chưa có bài viết nào !</p>;
  }
  return (
    <Layout>
      <Header />
      <Layout>
        <SidebarLeft />
        <Content>
          <div className="container">
            <div>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginRight: "25px",
                }}
              >
                MY POSTS
              </span>
              <Tooltip title="search">
                <Button shape="circle" icon={<SearchOutlined />} size="large" />
              </Tooltip>
            </div>
            {myPostsData}
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default MyPosts;
