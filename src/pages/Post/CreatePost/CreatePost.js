/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Button, Stack } from "@material-ui/core";
import { Layout } from 'antd';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";

const { Content } = Layout;
const CreatePost = () => (
  // <Layout>
  <>
    {/* <Header />
    <div className="container">
      <SidebarLeft />
      <Content className="content">
        Content
      </Content>
      <SidebarRight />
    </div>
    <Footer /> */}
    <Layout>
      <Header />
      <Layout>
        <SidebarLeft />
        <Content>
          Content
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  </>
  //  </Layout>
);

export default CreatePost;
