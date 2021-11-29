/* eslint-disable react/prop-types */
/* eslint-disable radix */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import {
  Layout,
  Select,
  Menu,
  Dropdown,
  Button,
  Modal,
  message,
  Image,
  Avatar,
  Space,
  Divider,
} from "antd";
import { DownOutlined, BookOutlined, LikeOutlined } from "@ant-design/icons";
import { useLocation, Redirect, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import ListComment from "../Comment/ListComment";

const { Content } = Layout;

const DetailPost = () => {
  const userId = sessionStorage.getItem("user_id");
  const [modalText, setModalText] = useState("Accept delete this post?");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const arr = location.pathname.split("/");
  const selectedId = arr[arr.length - 1];

  const [selectedPost, setSelectedPost] = useState({});
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [colorBookmark, setColorBookmark] = useState("");
  const [colorLike, setColorLike] = useState("");
  const [countLike, setCountLike] = useState(0);
  const [spin, setSpin] = useState(false);

  async function handleLike() {
    const token = sessionStorage.getItem("token");
    const fm = new FormData();
    fm.append("post_id", selectedId);
    const requestOptions = {
      method: "POST", // goi api co dieu kien gui di
      body: fm,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/posts/like`,
        requestOptions
      );
      const responseJSON = await response.json();
      if (responseJSON.type === "like") {
        setCountLike(countLike + 1);
        setColorLike("#08c");
        message.success("Liked!");
      } else {
        setCountLike(countLike - 1);
        setColorLike("black");
        message.success("Unliked!");
      }
    } catch (error) {
      console.log("Failed fetch bookmark", error.message);
    }
  }

  async function createBookmark() {
    const token = sessionStorage.getItem("token");
    const fm = new FormData();
    fm.append("post_id", selectedId);
    const requestOptions = {
      method: "POST", // goi api co dieu kien gui di
      body: fm,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/posts/bookmark`,
        requestOptions
      );
      const responseJSON = await response.json();
      if (responseJSON.type === "bookmark") {
        setColorBookmark("#08c");
        message.success("Added this post to Bookmark!");
      } else {
        setColorBookmark("black");
        message.success("Removed this post from Bookmark!");
      }
    } catch (error) {
      console.log("Failed fetch bookmark", error.message);
    }
  }

  useEffect(() => {
    async function checkBookmark() {
      const token = sessionStorage.getItem("token");
      const fm = new FormData();
      fm.append("post_id", selectedId);
      const requestOptions = {
        method: "POST", // goi api co dieu kien gui di
        body: fm,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/posts/checkbookmark`,
          requestOptions
        );
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (responseJSON.result === true) {
          setColorBookmark("#08c");
        } else {
          setColorBookmark("black");
        }
      } catch (error) {
        console.log("Failed fetch bookmark", error.message);
      }
    }

    async function checkLike() {
      const token = sessionStorage.getItem("token");
      const fm = new FormData();
      fm.append("post_id", selectedId);
      const requestOptions = {
        method: "POST", // goi api co dieu kien gui di
        body: fm,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/posts/checklike`,
          requestOptions
        );
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (responseJSON.result === true) {
          setColorLike("#08c");
        } else {
          setColorLike("black");
        }
      } catch (error) {
        console.log("Failed fetch check like", error.message);
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
          `http://127.0.0.1:8000/api/user/posts/${selectedId}`,
          requestOptions
        );
        const responseJSON = await response.json();
        setCountLike(responseJSON.data.like);
        console.log(responseJSON.data.like);
        setSelectedPost(responseJSON.data);
        setUser(responseJSON.user);
      } catch (error) {
        console.log("Failed fetch list Posts", error.message);
      }
    }
    checkLike();
    checkBookmark();
    getPostData();
  }, []);

  async function handleDelete() {
    // eslint-disable-next-line no-restricted-globals
    const token = sessionStorage.getItem("token");
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setTimeout(async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/posts/${selectedId}`,
          requestOptions
        );
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (responseJSON.status === "success") {
          success();
          setRedirect(true);
        }
      } catch (error) {
        console.log("Faild fetch delete post : ", error.message);
      }
    }, 2000);
  }

  function handleEdit() {
    setEditMode(true);
  }

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

  const showModal = () => {
    setVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleEdit}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" onClick={showModal}>
        Delete
      </Menu.Item>
    </Menu>
  );

  if (redirect) {
    return <Redirect to="/post/myposts" />;
  }

  if (isEditMode) {
    return <Redirect to={`/post/edit/${selectedId}`} />;
  }

  // handle modal
  const handleOk = () => {
    handleDelete();
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const success = () => {
    message.success("Success. Post deleted!", 5);
  };
  return (
    <Layout>
      <Header />
      <Layout>
        <SidebarLeft />
        <Layout>
          <Content>
            <Modal
              title="Confirm"
              visible={visible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <p>{modalText}</p>
            </Modal>
            <div className="container">
              <div className="postDetail-container">
                <div className="postDetail-author">
                  <Avatar
                    src={`http://127.0.0.1:8000/${user.image}`}
                    size={40}
                  />
                  <Link
                    to={`/otherprofile/${user.id}`}
                    style={{ fontSize: "16px", lineHeight: "42px" }}
                  >
                    {user.full_name}
                  </Link>
                </div>
                <div className="postDetail-date">
                  {formatDate(selectedPost.updated_at)}
                </div>
                <div className="postDetail-hastag">
                  <a href="#">
                    <span>{selectedPost.hashtag}</span>
                  </a>
                </div>
                <div className="postDetail-title">
                  <h5>{selectedPost.title}</h5>
                  {user.id === parseInt(userId) ? (
                    <div className="postDetail-dropdown">
                      <Dropdown overlay={menu}>
                        <Button>
                          Option <DownOutlined />
                        </Button>
                      </Dropdown>
                    </div>
                  ) : null}
                  <i className="ti-more-alt">
                    <div className="postDetail-option">
                      <a href="#">Edit</a>
                      <a href="#">Delete</a>
                    </div>
                  </i>
                </div>
                <Image
                  width={500}
                  src={`http://localhost:8000/${selectedPost.image}`}
                  alt={selectedPost.image}
                  style={{ marginBottom: "5px", borderRadius: "10px" }}
                />
                <div
                  className="postDetail-content"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
                <Divider />
                <div className="postDetail-icons">
                  <Space direction="vertical" style={{ lineHeight: "3px" }}>
                    <LikeOutlined
                      style={{ fontSize: "30px", color: colorLike }}
                      onClick={handleLike}
                    />
                    <p style={{ display: "flex", justifyContent: "center" }}>
                      {countLike}
                    </p>
                  </Space>
                  <BookOutlined
                    style={{
                      fontSize: "30px",
                      color: colorBookmark,
                      marginLeft: "20px",
                    }}
                    onClick={createBookmark}
                  />
                </div>
              </div>
            </div>
          </Content>
          <Layout style={{ backgroundColor: "#fff", padding: "0 10px" }}>
            <ListComment />
          </Layout>
        </Layout>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default DetailPost;
