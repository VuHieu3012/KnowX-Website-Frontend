/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-unresolved */
import "antd/dist/antd.css";
import { Layout, Menu, Input } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./styles.scss";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Search } = Input;

const Header = () => {
  const handleClick = () => {
    <Link to="/post" />;
  };
  return (
    <Layout className="layout-header">
      <Layout.Header className="navigation space-align-header">
        <Menu mode="horizontal">
          <Link to="/homepage">
            <Menu.Item
              icon={
                <HomeOutlined
                  style={{
                    fontSize: "24px",
                    marginTop: "-6px",
                    marginLeft: "-45px",
                  }}
                />
              }
            >
              <span style={{ color: "#00358E" }}>
                Know
                <span style={{ color: "red" }}>X</span>
              </span>
            </Menu.Item>
          </Link>
          <SubMenu key="Post" title="Post" onTitleClick={handleClick}>
            <Menu.Item>
              <Link to="/post/myposts">My Posts</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/following">Followings</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/post/newest">Newest</Link>
            </Menu.Item>
            <Menu.Item>Master post</Menu.Item>
            <Menu.Item>
              <Link to="/post/create">Create post</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="Question" title="Question">
            <Menu.Item>
              <Link to="/question/myquestions">My Questions</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/question/following">Followings</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/question/newest">Newest</Link>
            </Menu.Item>
            <Menu.Item>Interest</Menu.Item>
            <Menu.Item>
              <Link to="/question/create">Create question</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="3">
            <Link to="/buddy">Find buddy</Link>
          </Menu.Item>
          <Menu.Item key="4">Find mentor</Menu.Item>
          <Menu.Item key="5">Video call</Menu.Item>
          <Menu.Item key="6">Job</Menu.Item>
          <Menu.Item key="7">
            <Search
              style={{ marginTop: "6px" }}
              size="default"
              placeholder="Search KnowX"
              enterButton
            />
          </Menu.Item>
        </Menu>
      </Layout.Header>
      <div className="banner" />
    </Layout>
  );
};

export default Header;
