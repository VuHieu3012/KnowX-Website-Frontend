/* eslint-disable no-nested-ternary */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import "./styles.scss";
import { Layout, Menu } from "antd";
import Header from "../../components/Header/Header";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import Footer from "../../components/Footer/Footer";
import SearchPost from "./SearchPost";
import SearchQuestion from "./SearchQuestion";
import SearchUser from "./SearchUser";

const { Content } = Layout;

const Search = () => {
  const [key, setKey] = useState("post");
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
                <Menu.Item key="post">POSTS</Menu.Item>
                <Menu.Item key="question">QUESTIONS</Menu.Item>
                <Menu.Item key="user">USERS</Menu.Item>
              </Menu>
            </div>
            {key === "post" ? (
              <SearchPost />
            ) : key === "question" ? (
              <SearchQuestion />
            ) : (
              <SearchUser />
            )}
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default Search;
