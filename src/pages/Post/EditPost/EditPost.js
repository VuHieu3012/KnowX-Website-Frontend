/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable object-curly-newline */
import "./styles.scss";
import { Layout, Input, Button, Space, Form } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState, React, useRef } from "react";
import { Redirect, useLocation } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";

const { Content } = Layout;
const EditPost = () => {
  const location = useLocation();
  const arr = location.pathname.split("/");
  const selectedId = arr[arr.length - 1];
  const [redirect, setRedirect] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    hashtag: "",
    content: "",
  });

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
        setPostData(responseJSON.data);
      } catch (error) {
        console.log("Failed fetch Editing Post", error.message);
      }
    }
    getPostData();
  }, [selectedId]);

  async function handleEdit() {
    console.log("new Data: ", postData);
    setPostData(tmpPostData);
    const token = sessionStorage.getItem("token");
    const urlencode = new URLSearchParams();
    urlencode.append("title", tmpPostData.title);
    urlencode.append("hashtag", tmpPostData.hashtag);
    urlencode.append("content", tmpPostData.content);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const requestOptions = {
      method: "PUT",
      body: urlencode,
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/posts/${selectedId}`,
        requestOptions
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      if (responseJSON.status === "success") {
        setRedirect(true);
        alert("Post Updated");
      }
    } catch (error) {
      console.log("Failed edit post", error.message);
    }
  }

  const tmpPostData = { ...postData };
  if (redirect) {
    return <Redirect to={`/post/detail/${selectedId}`} />;
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
                EDIT POST
              </span>
              {tmpPostData.title && tmpPostData.title !== "" && (
                <Form
                  name="basic"
                  initialValue={{
                    title: tmpPostData.title,
                    hashtag: tmpPostData.hashtag,
                  }}
                >
                  <Form.Item
                    rules={[{ required: true }]}
                    name="title"
                    initialValue={tmpPostData.title}
                  >
                    <Input
                      onChange={(e) => {
                        tmpPostData.title = e.target.value;
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true }]}
                    name="hashtag"
                    initialValue={tmpPostData.hashtag}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <CKEditor
                      name="content"
                      editor={ClassicEditor}
                      data={tmpPostData.content}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        tmpPostData.content = data;
                        console.log({ event, editor, data });
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <div style={{ marginTop: "55px", textAlign: "center" }}>
                      <Space size={20}>
                        <Button
                          size="large"
                          type="primary"
                          onClick={handleEdit}
                          style={{ width: "100px" }}
                        >
                          EDIT
                        </Button>
                        <Button
                          size="large"
                          type="primary"
                          style={{ width: "100px" }}
                        >
                          CANCEL
                        </Button>
                      </Space>
                    </div>
                  </Form.Item>
                </Form>
              )}
            </div>
          </Content>
          <SidebarRight />
        </Layout>
        <Footer />
      </Layout>
    </>
  );
};

export default EditPost;