/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Layout, Select } from "antd";
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

  let myQuestionsData = [];
  if (listQuestions.length !== 0) {
    myQuestionsData = listQuestions.map((question) => (
      <div className="content">
        <div className="user-profile">
          <img className="avatar" src={`http://127.0.0.1:8000/${user.image}`} />
          <span className="user-name">{user.full_name}</span>
        </div>
        <div className="title">
          <Link exact to={`/question/detail/${question.id}`}>
            {question.title}
          </Link>
        </div>
        <div className>
          <span className="time">{formatDate(question.updated_at)}</span>
          <div className="react">
            <span className="like"> </span>
            <span className="dislike"> </span>
            <span className="comment"> </span>
          </div>
        </div>
        <div className="hashtag">
          <span>{question.hashtag}</span>
        </div>
      </div>
    ));
  } else {
    myQuestionsData = (
      <p>Bạn chưa có câu hỏi nào. Tích cực đưa ra vấn đề bạn đang gặp nhé !</p>
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
                  fontSize: "18px",
                  marginRight: "25px",
                }}
              >
                NEWEST QUESTIONS
              </span>
            </div>
            {myQuestionsData}
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default NewestQuestion;
