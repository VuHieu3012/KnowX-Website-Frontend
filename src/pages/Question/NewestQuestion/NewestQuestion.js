/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable radix */
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

const NewestQuestion = () => {
  const [listQuestions, setList] = useState([]);
  const [spin, setSpin] = useState(true);
  const userId = sessionStorage.getItem("user_id");

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

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
          "http://127.0.0.1:8000/api/user/questions/newest",
          requestOptions
        );
        const responseJSON = await response.json();
        setList(responseJSON.data);
        setSpin(false);
      } catch (error) {
        console.log("Failed fetch list newest questions", error.message);
      }
    }
    getQuestionData();
  }, []);

  const formatDate = (timestams) => {
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
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
            <div>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginRight: "25px",
                }}
              >
                NEWEST QUESTIONS
              </span>
            </div>
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
                  dataSource={listQuestions}
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
                    >
                      <List.Item.Meta
                        avatar={(
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
                        )}
                        title={(
                          <Link
                            to={
                              item.user_id === parseInt(userId)
                                ? "/profile"
                                : `/otherprofile/${item.user_id}`
                            }
                          >
                            {item.full_name}
                          </Link>
                        )}
                        description={(
                          <a href={`/question/detail/${item.id}`}>
                            <h6>{item.title}</h6>
                          </a>
                        )}
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

export default NewestQuestion;
