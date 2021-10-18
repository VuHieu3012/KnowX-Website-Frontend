/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable object-curly-newline */
import "./styles.scss";
import { Layout, Input, Button, Space } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";

const { Content } = Layout;
const CreateQuestion = () => {
  const [redirect, setRedirect] = useState(false);
  const [QuestionData, setQuestionData] = useState({
    title: "",
    hashtag: "",
    content: "",
  });

  const tmpQuestionData = { ...QuestionData };
  async function create() {
    setQuestionData(tmpQuestionData);
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", QuestionData.title);
    formData.append("hashtag", QuestionData.hashtag);
    formData.append("content", QuestionData.content);
    console.log(formData);
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/user/questions",
        requestOptions,
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      if (responseJSON.status === "success") {
        setRedirect(true);
        alert("Question Created");
      }
      if (responseJSON.error === false) {
        setQuestionData({
          title: "",
          hashtag: "",
          content: "",
        });
      }
    } catch (error) {
      console.log("Failed create question", error);
    }
  }

  if (redirect) {
    return <Redirect to="/question/myquestions" />;
  }

  return (
    <>
      <Layout>
        <Header />
        <Layout>
          <SidebarLeft />
          <Content>
            <div className="container">
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginRight: "25px",
                  marginBottom: "25px",
                  paddingBottom: "25px",
                }}
              >
                CREATE QUESTION
              </span>
              <div className="title">
                <Input
                  type="text"
                  placeholder="Add title of question"
                  name="title"
                  onChange={(e) => {
                    tmpQuestionData.title = e.target.value;
                  }}
                />
              </div>
              <div className="hashtag">
                <Input
                  type="text"
                  placeholder="Add hashtag"
                  name="hashtag"
                  onChange={(e) => {
                    tmpQuestionData.hashtag = e.target.value;
                  }}
                />
              </div>
              <div className="description">
                <CKEditor
                  name="content"
                  editor={ClassicEditor}
                  data="<p></p>"
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    tmpQuestionData.content = data;
                    console.log({ event, editor, data });
                  }}
                />
              </div>
              <div style={{ marginTop: "55px", textAlign: "center" }}>
                <Space size={20}>
                  <Button size="large" type="primary" onClick={create}>
                    CREATE
                  </Button>
                  <Button size="large" type="primary">
                    CANCEL
                  </Button>
                </Space>
              </div>
            </div>
          </Content>
          <SidebarRight />
        </Layout>
        <Footer />
      </Layout>
    </>
  );
};

export default CreateQuestion;
