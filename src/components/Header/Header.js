/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-unresolved */
import "antd/dist/antd.css";
import {
  Layout, Menu, Space, Input,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./styles.scss";

const { SubMenu } = Menu;
const { Search } = Input;

const Header = () => (
  <Layout className="layout-header">
    <Layout.Header className="navigation space-align-header">
      <Menu mode="horizontal">
        <Menu.Item
          icon={<HomeOutlined style={{ fontSize: "24px", color: "#00358E", marginTop: "-6px" }} />}
        >
          <span style={{ color: "#00358E" }}>
            Know
            <span style={{ color: "red" }}>X</span>
          </span>
        </Menu.Item>
        <SubMenu key="Post" title="Post">
          <Menu.Item>Followings</Menu.Item>
          <Menu.Item>Newest</Menu.Item>
          <Menu.Item>Top read</Menu.Item>
          <Menu.Item>Master post</Menu.Item>
          <Menu.Item>Create post</Menu.Item>
        </SubMenu>
        <SubMenu key="Question" title="Question">
          <Menu.Item>Followings</Menu.Item>
          <Menu.Item>Newest</Menu.Item>
          <Menu.Item>Unsolved</Menu.Item>
          <Menu.Item>Interest</Menu.Item>
        </SubMenu>
        <Menu.Item key="3">Find buddy</Menu.Item>
        <Menu.Item key="4">Find mentor</Menu.Item>
        <Menu.Item key="5">Video call</Menu.Item>
        <Menu.Item key="6">Job</Menu.Item>
        <Menu.Item key="7">
          <Search style={{ marginTop: '6px' }} size="default" placeholder="Search KnowX" enterButton />
        </Menu.Item>
      </Menu>
    </Layout.Header>
    <div className="banner" />
  </Layout>
);

export default Header;
// import "./styles.scss";
// import { Input } from "@material-ui/core";

// const ariaLabel = { 'aria-label': 'description' };

// const Header = () => (
//   // eslint-disable-next-line react/react-in-jsx-scope
//   <div className="header-container">
//     <div className="header-banner" />
//     <div className="header-navbar">
//       <button>HOMEPAGE</button>
//       <button className="post-option">POST
//         <i className="ti-angle-down" />
//         <div className="hover-post">
//           <a href="#">Followings</a>
//           <a href="#">Newest</a>
//           <a href="#">Top read</a>
//           <a href="#">Master post</a>
//           <a href="#">Create post</a>
//         </div>
//       </button>
//       <button className="question-option">QUESTION
//         <i className="ti-angle-down" />
//         <div className="hover-question">
//           <a href="#">Followings</a>
//           <a href="#">Newest</a>
//           <a href="#">Unsolved</a>
//           <a href="#">Interest</a>
//         </div>
//       </button>
//       <button>FIND BUDDY</button>
//       <button>FIND MENTOR</button>
//       <button>VIDEO CALL</button>
//       <div className="header-search">
//         <Input placeholder="Search something..." inputProps={ariaLabel} />
//         <i className="ti-search" />
//       </div>
//     </div>
//   </div>
// );
