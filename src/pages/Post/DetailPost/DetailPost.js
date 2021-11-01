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
} from "antd";
import { createFromIconfontCN, DownOutlined } from "@ant-design/icons";
import { Input } from "reactstrap";
import { useLocation, Redirect, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import images from "../../../assets/images";
import ListComment from "../Comment/ListComment";
// import images from "../../assets/images";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
const { Content } = Layout;
const { Option } = Select;

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

  useEffect(() => {
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
        setSelectedPost(responseJSON.data);
        setUser(responseJSON.user);
        console.log(responseJSON.user.id);
      } catch (error) {
        console.log("Failed fetch list Posts", error.message);
      }
    }
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
                <div className="postDetail-icons">
                  <i className="fas fa-thumbs-up" />
                  <i className="fas fa-thumbs-down" />
                  <i className="fas fa-bookmark" />
                  <i className="fas fa-star" />
                </div>
              </div>
            </div>
          </Content>
          <Layout style={{ padding: "0 15px" }}>
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
