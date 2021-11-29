/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Layout, List, Avatar, Space, Spin } from "antd";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";

const { Content } = Layout;

const MyPosts = () => {
  const [listPost, setList] = useState([]);
  const [user, setUser] = useState({});
  const [spin, setSpin] = useState(true);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

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
        setSpin(false);
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
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(timestams).toLocaleDateString(undefined, options);
  };

  let data;

  if (listPost.length === 0) {
    data = <p>Create post now!</p>;
  } else {
    data = (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={listPost}
          renderItem={(item) => (
            <List.Item
              actions={[
                <IconText
                  icon={LikeOutlined}
                  text={item.like}
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={MessageOutlined}
                  text={item.comment}
                  key="list-vertical-message"
                />,
              ]}
              extra={
                <img
                  height={168}
                  alt="logo"
                  src={`http://127.0.0.1:8000/${item.image}`}
                />
              }
            >
              <List.Item.Meta
                avatar={
                  <Link to="/profile">
                    <Avatar src={`http://127.0.0.1:8000/${user.image}`} />
                  </Link>
                }
                title={<Link to="/profile">{user.full_name}</Link>}
                description={
                  <a href={`/post/detail/${item.id}`}>
                    <h6>{item.title}</h6>
                  </a>
                }
              />

              {`${formatDate(item.updated_at)}  |  `}
              {
                <a href="#">
                  <span>{item.hashtag}</span>
                </a>
              }
            </List.Item>
          )}
        />
        ,
      </div>
    );
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
            </div>
            {spin ? (
              <div
                className="spin"
                style={{ textAlign: "center", marginTop: "50px" }}
              >
                <Spin size="large" />
              </div>
            ) : (
              data
            )}
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default MyPosts;
