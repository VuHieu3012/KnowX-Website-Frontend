/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/react-in-jsx-scope */
import "antd/dist/antd.css";
import "./styles.scss";
import { Layout, Menu, Button } from "antd";
import {
  ExportOutlined,
  ReadOutlined,
  TrophyOutlined,
  MailOutlined,
  createFromIconfontCN,
  BellOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import images from "../../assets/images";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const { Sider } = Layout;
const { SubMenu } = Menu;
const SidebarLeft = () => (
  <div className="layout-sidebar-left">
    <Sider width={200} className="site-layout-background">
      <div className="sidebar-profile">
        <img src={images.knowXLogo} alt="" />
        <div>
          <Link to="/profile">NGUYEN LE DUY ANH</Link>
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
        <Menu.Item key="6" style={{ bottom: "-350px" }}>
          <Button
            type="primary"
            icon={<ExportOutlined className="fontSize-24" />}
            size="large"
            style={{ width: "160px", height: "40px" }}
          >
            Sign out
          </Button>
        </Menu.Item>
      </Menu>
    </Sider>
  </div>
);

export default SidebarLeft;
// import images from "../../assets/images";
// import "./styles.scss";

// const SidebarLeft = () => (
//   <div className="sidebar-left">
//     <div className="sidebar-profile">
//       <img src={images.knowXLogo} alt="" />
//       <a src="#" className="user-name">
//         VU QUOC HIEU
//       </a>
//     </div>

//     <div className="sidebar-list-items">
//       <div className="sidebar-item">
//         <i className="ti-agenda" />
//         <p> Class</p>
//       </div>
//       <div className="sidebar-item">
//         <i className="ti-receipt" />
//         <p> Certifications</p>
//       </div>
//       <div className="sidebar-item">
//         <i className="ti-email" />
//         <p> Messages</p>
//       </div>
//       <div className="sidebar-item">
//         <i className="ti-bell" />
//         <p> Notifications</p>
//       </div>
//     </div>
//     <button className="signout-button">
//       <i className="ti-back-right" />
//       Sign out
//     </button>
//   </div>
// );

// export default SidebarLeft;
