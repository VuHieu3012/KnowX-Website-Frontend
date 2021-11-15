import { Layout, Select, List, Avatar, Space, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ChatWindow from "../ChatWindow/ChatWindow";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import "./styles.scss";

const { Content } = Layout;

const ChatRoom = () => {
  const i = 0;
  return (
    <Layout>
      <Header />
      <Layout>
        <SidebarLeft />
        <Content>
          <div className="chat-wrapper">
            <Row>
              <Col span={8}>
                <Sidebar />
              </Col>
              <Col span={16}>
                <ChatWindow />
              </Col>
            </Row>
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default ChatRoom;
