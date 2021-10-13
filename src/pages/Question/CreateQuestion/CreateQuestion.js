/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable object-curly-newline */
import "./styles.scss";
import { Layout, Input, Button, Space } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";

const { Content } = Layout;
const CreateQuestion = () => (
  <>
    <Layout>
      <Header />
      <Layout>
        <SidebarLeft />
        <Content>
          <div className="container">
            <div className="title">
              <Input placeholder="Add title of question" />
            </div>
            <div className="hashtag">
              <Input placeholder="Add hashtag" />
            </div>
            <div className="description">
              <CKEditor
                editor={ClassicEditor}
                data="<p></p>"
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </div>
            <div style={{ marginTop: "55px", textAlign: "center" }}>
              <Space size={20}>
                <Button size="large" type="primary">
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

export default CreateQuestion;
