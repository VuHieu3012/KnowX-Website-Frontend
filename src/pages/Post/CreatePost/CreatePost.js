/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable object-curly-newline */
import "./styles.scss";
import { Layout, Input, Button, Space, message, Form } from "antd";
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
  const [picture, setPicture] = useState();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    hashtag: "",
    content: "",
  });

  const tmpPostData = { ...postData };

  async function create() {
    setLoading(true);
    setPostData(tmpPostData);
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", tmpPostData.title);
    formData.append("hashtag", tmpPostData.hashtag);
    formData.append("content", tmpPostData.content);
    formData.append("image", picture);
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setTimeout(async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/posts",
          // eslint-disable-next-line comma-dangle
          requestOptions
        );
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (responseJSON.status === "success") {
          success();
          setRedirect(true);
        }
        if (responseJSON.error === false) {
          setPostData({
            title: "",
            hashtag: "",
            content: "",
          });
        }
        if (responseJSON.status === "error") {
          setLoading(false);
          error(tmpPostData);
          if (responseJSON.validation_errors.image) {
            for (const item of responseJSON.validation_errors.image) {
              message.error(item);
            }
          }
        }
      } catch (err) {
        setLoading(false);
        console.log("Failed create post", err);
      }
    }, 2000);
  }

  if (redirect) {
    return <Redirect to="/post/myposts" />;
  }

  const success = () => {
    message.success("Success. Post Created!", 5);
  };

  const error = (data) => {
    if (data.title === "") {
      message.error("Error. Title is required!", 5);
    }

    if (data.hashtag === "") {
      message.error("Error. Hashtag is required!", 5);
    }

    if (data.content === "") {
      message.error("Error. Content is required!", 5);
    }
  };

  const handleImage = (e) => {
    setPicture(e.target.files[0]);
  };

  return (
    <>
      <Layout>
        <Header />
        <Layout>
          <SidebarLeft />
          <Content>
            <div className="container">
              <Form />
              <Form.Item>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginBottom: "25px",
                    marginRight: "25px",
                    paddingBottom: "25px",
                  }}
                >
                  CREATE POST
                </span>
              </Form.Item>
              <Form.Item name="image">
                <div className="input-group mb-3">
                  <label className="input-group-text">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImage}
                  />
                </div>
              </Form.Item>
              <Form.Item
                name="title"
                rules={[{ required: true, message: "please input title" }]}
              >
                <Input
                  placeholder="Add title of post"
                  onChange={(e) => {
                    tmpPostData.title = e.target.value;
                    console.log(tmpPostData.title);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="hashtag"
                rules={[{ required: true, message: "Please input hashtag!" }]}
              >
                <Input
                  placeholder="VD: #react, #php"
                  onChange={(e) => {
                    tmpPostData.hashtag = e.target.value;
                    console.log(tmpPostData);
                  }}
                />
              </Form.Item>
              <Form.Item name="content">
                <CKEditor
                  name="content"
                  editor={ClassicEditor}
                  data="<p></p>"
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    tmpPostData.content = data;
                    console.log(tmpPostData);
                  }}
                />
              </Form.Item>
              <Form.Item>
                <div style={{ marginTop: "55px", textAlign: "center" }}>
                  <Space size={20}>
                    <Button
                      size="large"
                      type="primary"
                      onClick={create}
                      loading={loading}
                      htmlType="submit"
                    >
                      CREATE
                    </Button>
                    <Button size="large" type="primary">
                      CANCEL
                    </Button>
                  </Space>
                </div>
              </Form.Item>
              <Form />
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
