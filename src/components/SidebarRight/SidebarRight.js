/* eslint-disable react/react-in-jsx-scope */
import "antd/dist/antd.css";
import "./styles.scss";
import { Layout, Button, Divider } from "antd";
import { EditOutlined, SearchOutlined, BookTwoTone } from "@ant-design/icons";

const { Sider } = Layout;

const SidebarRight = () => (
  <div className="layout-sidebar-right">
    <Sider width={280} className="site-layout-background">
      <BookTwoTone
        style={{
          fontSize: "70px",
          color: "#00358E",
          marginTop: "36px",
          marginLeft: "45px",
        }}
      />
      <span style={{ color: "#00358E", fontWeight: "bold", fontSize: "20px" }}>
        BOOKMARK
      </span>
      <Button
        icon={<SearchOutlined />}
        size="large"
        style={{ marginTop: "10px", marginLeft: "46px" }}
      >
        Search Bookmarks
      </Button>
      <Divider orientation="left">
        <EditOutlined
          style={{
            fontSize: "28px",
            color: "#00358E",
            marginBottom: "18px",
            marginRight: "12px",
          }}
        />
        <span
          style={{
            fontWeight: "700",
            fontSize: "20px",
            lineHeight: "30px",
          }}
        >
          React: Hello word!
        </span>
      </Divider>
      <p
        style={{
          marginLeft: "35px",
          marginTop: "-25px",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "20px",
        }}
      >
        React creates a VIRTUAL DOM
        <br />
        in memory.
      </p>
      <Divider orientation="left">
        <EditOutlined
          style={{
            fontSize: "28px",
            color: "#00358E",
            marginBottom: "18px",
            marginRight: "12px",
          }}
        />
        <span
          style={{
            fontWeight: "700",
            fontSize: "20px",
            lineHeight: "30px",
          }}
        >
          Hooks
        </span>
      </Divider>
      <p
        style={{
          marginLeft: "35px",
          marginTop: "-25px",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "20px",
        }}
      >
        Hook: a specific example or story that
        <br />
        interests the reader.
      </p>
      <p
        style={{
          marginLeft: "35px",
          fontWeight: "700",
          fontSize: "20px",
          lineHeight: "30px",
        }}
      >
        Introduction about
        <br />
        React Router
      </p>
      <div className="poster-right"> </div>
    </Sider>
  </div>
);

export default SidebarRight;
