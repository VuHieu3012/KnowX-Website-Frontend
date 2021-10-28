/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import "./styles.scss";
import { Layout, Menu } from "antd";
import Header from "../../../components/Header/Header";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import Information from "./Information";
import ListPost from "./ListPost";
import ListQuestion from "./ListQuestion";

const { Content } = Layout;

const Profile = () => {
  const [key, setKey] = useState("information");
  const handleClick = (e) => {
    setKey(e.key);
  };

  return (
    <Layout>
      <Header />
      <Layout>
        <SidebarLeft />
        <Content>
          <div className="container">
            <div className="navigation-profile">
              <Menu
                mode="horizontal"
                style={{ fontSize: "14px", fontWeight: "600" }}
                onClick={handleClick}
                selectedKeys={key}
              >
                <Menu.Item key="information">INFORMATION</Menu.Item>
                <Menu.Item key="post">POST</Menu.Item>
                <Menu.Item key="question">QUESTION</Menu.Item>
              </Menu>
            </div>
            {key === "information" ? (
              <Information />
            ) : key === "post" ? (
              <ListPost />
            ) : (
              <ListQuestion />
            )}
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default Profile;
