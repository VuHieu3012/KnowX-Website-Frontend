/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prop-types */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Layout, List, Avatar, Space, Spin, Divider } from "antd";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import Footer from "../../components/Footer/Footer";

const { Content } = Layout;

const Homepage = () => {
  const [listPost, setList] = useState([]);
  const userId = sessionStorage.getItem("user_id");
  const [spin, setSpin] = useState(true);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  useEffect(() => {
    async function getPostData() {
      const token = sessionStorage.getItem("token");
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/posts/recomment",
          requestOptions
        );
        const responseJSON = await response.json();
        if (responseJSON.status === "success") {
          setList(responseJSON.data);
          setSpin(false);
        }
      } catch (error) {
        console.log("Failed fetch list newest Posts", error.message);
      }
    }
    setTimeout(() => {
      getPostData();
    }, 2000);
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

  return (
    <Layout>
      <Header />
      <Layout>
        <SidebarLeft />
        <Content>
          <div className="container">
            <Divider orientation="left">RECOMMENT FOR YOU</Divider>
            {spin ? (
              <div className="spin">
                <Spin size="large" />
              </div>
            ) : (
              <div>
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 5,
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
                          <Link
                            to={
                              item.user_id === parseInt(userId)
                                ? "/profile"
                                : `/otherprofile/${item.user_id}`
                            }
                          >
                            <Avatar
                              src={`http://127.0.0.1:8000/${item.user_image}`}
                            />
                          </Link>
                        }
                        title={
                          <Link
                            to={
                              item.user_id === parseInt(userId)
                                ? "/profile"
                                : `/otherprofile/${item.user_id}`
                            }
                          >
                            {item.full_name}
                          </Link>
                        }
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
            )}
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default Homepage;
