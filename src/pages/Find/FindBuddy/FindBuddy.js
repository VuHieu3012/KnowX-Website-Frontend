/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Layout, Select } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import images from "../../../assets/images";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
const { Content } = Layout;
const { Option } = Select;
const FindBuddy = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Layout>
      <Header />
      <Layout>
        <SidebarLeft />
        <Content>
          <div className="container">
            <div className="find-content content"> Hello, world</div>
            <div className="list-buddy"> </div>
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default FindBuddy;
