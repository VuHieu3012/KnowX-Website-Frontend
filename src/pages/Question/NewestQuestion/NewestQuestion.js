/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable radix */
/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Layout, Select, List, Avatar } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import images from "../../../assets/images";

const { Content } = Layout;

const NewestQuestion = () => {
  const [listQuestions, setList] = useState([]);
  const userId = sessionStorage.getItem("user_id");

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
        console.log("list question: ", listQuestions);
      } catch (error) {
        console.log("Failed fetch list newest questions", error.message);
      }
    }
    getQuestionData();
  }, []);

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
                  <List.Item>
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
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default NewestQuestion;
