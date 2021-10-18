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
const CreatePost = () => {
  const [redirect, setRedirect] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    hashtag: "",
    content: "",
  });

  const tmpPostData = { ...postData };
  async function create() {
    setPostData(tmpPostData);
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("hashtag", postData.hashtag);
    formData.append("content", postData.content);
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/user/posts",
        requestOptions,
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      if (responseJSON.status === "success") {
        setRedirect(true);
        alert("Post Created");
      }
      if (responseJSON.error === false) {
        setPostData({
          title: "",
          hashtag: "",
          content: "",
        });
      }
    } catch (error) {
      console.log("Failed create post", error);
    }
  }

  if (redirect) {
    return <Redirect to="/post/myposts" />;
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
                CREATE POST
              </span>
              <div className="title">
                <Input
                  type="text"
                  placeholder="Add title of post"
                  name="title"
                  onChange={(e) => {
                    tmpPostData.title = e.target.value;
                  }}
                />
              </div>
              <div className="hashtag">
                <Input
                  type="text"
                  placeholder="Add hashtag"
                  name="hashtag"
                  onChange={(e) => {
                    tmpPostData.hashtag = e.target.value;
                  }}
                />
              </div>
              <div className="description">
                <CKEditor
                  name="content"
                  editor={ClassicEditor}
                  data="<p></p>"
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    tmpPostData.content = data;
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

export default CreatePost;
