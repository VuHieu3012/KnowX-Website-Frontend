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
  Menu,
  Dropdown,
  Button,
  Modal,
  message,
  Avatar,
  Space,
  Spin,
  Divider,
} from "antd";
import { DownOutlined, LikeOutlined } from "@ant-design/icons";
import { useLocation, Redirect, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../../../components/Header/Header";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import ListComment from "../Comment/ListComment";

const { Content } = Layout;

const DetailQuestion = () => {
  const [modalText, setModalText] = useState("Accept delete this question?");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const arr = location.pathname.split("/");
  const selectedId = arr[arr.length - 1];

  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [colorLike, setColorLike] = useState("");
  const [countLike, setCountLike] = useState(0);
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    async function getQuestionData() {
      const token = sessionStorage.getItem("token");
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/questions/${selectedId}`,
          requestOptions
        );
        const responseJSON = await response.json();
        setCountLike(responseJSON.data.like);
        setSelectedQuestion(responseJSON.data);
        setUser(responseJSON.user);
        setSpin(false);
      } catch (error) {
        console.log("Failed fetch this question", error.message);
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
          `http://127.0.0.1:8000/api/user/questions/checklike`,
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
    checkLike();
    getQuestionData();
  }, []);

  async function handleLike() {
    const token = sessionStorage.getItem("token");
    const fm = new FormData();
    fm.append("question_id", selectedId);
    const requestOptions = {
      method: "POST", // goi api co dieu kien gui di
      body: fm,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/questions/like`,
        requestOptions
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
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
      console.log("Failed fetch like question", error.message);
    }
  }

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
          `http://127.0.0.1:8000/api/user/questions/${selectedId}`,
          requestOptions
        );
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (responseJSON.status === "success") {
          success();
          setRedirect(true);
        }
      } catch (error) {
        console.log("Faild fetch delete question : ", error.message);
      }
    }, 2000);
  }

  function handleEdit() {
    setEditMode(true);
  }

  // convert timestams to date
  const formatDate = (timestams) => {
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
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
    return <Redirect to="/question/myquestions" />;
  }

  if (isEditMode) {
    return <Redirect to={`/question/edit/${selectedId}`} />;
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
    message.success("Success. Question deleted!", 5);
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
              {spin ? (
                <div className="spin">
                  <Spin size="large" />
                </div>
              ) : (
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
                    {formatDate(selectedQuestion.updated_at)}
                  </div>
                  <div className="postDetail-hastag">
                    <a href="#">
                      <span>{selectedQuestion.hashtag}</span>
                    </a>
                  </div>
                  <div className="postDetail-title">
                    <h5>{selectedQuestion.title}</h5>
                    <div className="postDetail-dropdown">
                      <Dropdown overlay={menu}>
                        <Button>
                          Option <DownOutlined />
                        </Button>
                      </Dropdown>
                    </div>
                    <i className="ti-more-alt">
                      <div className="postDetail-option">
                        <a href="#">Edit</a>
                        <a href="#">Delete</a>
                      </div>
                    </i>
                  </div>
                  <div
                    className="postDetail-content"
                    dangerouslySetInnerHTML={{
                      __html: selectedQuestion.content,
                    }}
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
                  </div>
                </div>
              )}
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

export default DetailQuestion;
