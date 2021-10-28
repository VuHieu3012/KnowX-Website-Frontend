/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Layout, Select, List, Avatar } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { Link } from "react-router-dom";
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

const MyQuestions = () => {
  const [listQuestions, setList] = useState([]);
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
          "http://127.0.0.1:8000/api/user/questions",
          requestOptions
        );
        const responseJSON = await response.json();
        setList(responseJSON.data);
        console.log("list question: ", listQuestions);
      } catch (error) {
        console.log("Failed fetch list questions", error.message);
      }
    }
    getPersonal();
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

  let data;
  if (listQuestions.length === 0) {
    data = (
      <p>Bạn chưa có câu hỏi nào. Tích cực đưa ra vấn đề bạn đang gặp nhé !</p>
    );
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
            pageSize: 5,
          }}
          dataSource={listQuestions}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Link to="/profile">
                    <Avatar src={`http://127.0.0.1:8000/${user.image}`} />
                  </Link>
                }
                title={<Link to="/profile">{user.full_name}</Link>}
                description={
                  <a href={`/question/detail/${item.id}`}>
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
                MY QUESTIONS
              </span>
            </div>
            {data}
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default MyQuestions;
