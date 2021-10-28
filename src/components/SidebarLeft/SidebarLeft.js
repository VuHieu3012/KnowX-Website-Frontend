/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "antd/dist/antd.css";
import "./styles.scss";
import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Avatar } from "antd";
import {
  ExportOutlined,
  ReadOutlined,
  TrophyOutlined,
  MailOutlined,
  createFromIconfontCN,
  BellOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SidebarLeft = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getPersonal() {
      const token = sessionStorage.getItem("token");
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user",
          requestOptions
        );
        const responseJSON = await response.json();
        setUser(responseJSON.data);
      } catch (error) {
        console.log("Faild fetch user : ", error.message);
      }
    }
    getPersonal();
  }, []);

  const logout = () => {
    const token = sessionStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch("http://127.0.0.1:8000/api/user/logout", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          window.location.reload();
          sessionStorage.clear();
          const temp = window.location.origin;
          window.location.href = `${temp}/auth`;
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="layout-sidebar-left">
      <Sider width={200} className="site-layout-background">
        <div className="sidebar-profile">
          <div className="sidebar-profile-img">
            <Avatar src={`http://127.0.0.1:8000/${user.image}`} size={128} />
          </div>
          <div>
            <Link to="/profile">{user.full_name}</Link>
          </div>
        </div>
        <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
          <SubMenu
            key="class"
            icon={<ReadOutlined className="fontSize-24" />}
            title="Class"
          >
            <Menu.Item key="1">Create class</Menu.Item>
            <Menu.Item key="2">Join class</Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<TrophyOutlined className="fontSize-24" />}>
            Certificates
          </Menu.Item>
          <Menu.Item key="4" icon={<MailOutlined className="fontSize-24" />}>
            Messages
          </Menu.Item>
          <Menu.Item key="5" icon={<BellOutlined className="fontSize-24" />}>
            Notifications
          </Menu.Item>
          <Menu.Item key="6" style={{ bottom: "-600px" }}>
            <Button
              type="primary"
              icon={<ExportOutlined className="fontSize-24" />}
              size="large"
              style={{ width: "160px", height: "40px" }}
              onClick={logout}
            >
              Sign out
            </Button>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default SidebarLeft;
