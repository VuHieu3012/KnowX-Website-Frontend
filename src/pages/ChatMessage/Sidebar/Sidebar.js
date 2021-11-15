import {
  Layout,
  Select,
  List,
  Avatar,
  Tooltip,
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Input,
} from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import Message from "../Message/Message";

const { Search } = Input;

const Sidebar = () => {
  const onSearch = (value) => console.log(value);
  return (
    <div
      className="wrapper-sidebar"
      style={{ height: "100vh", borderRight: "1px solid #ccc", padding: "5px" }}
    >
      <Row>
        <Col span={24}>
          <Typography.Text style={{ fontSize: "24px" }}>Chat</Typography.Text>
        </Col>
        <Col span={24}>
          <Search
            size="large"
            placeholder="Search on messenger "
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Divider />
        {/* <Col span={24}>
          <Avatar style={{ marginRight: "10px" }} icon={<UserOutlined />} />
          <Typography.Text>Vu Hieu</Typography.Text>
        </Col> */}
        <Divider />
        <div>
          <Message
            text="Manchester United, No.1"
            displayName="Vũ Hiệu"
            createdAt="11:01 AM | Today"
            photoURL="https://joeschmoe.io/api/v1/random"
          />
          <Message
            text="Oh yeah!"
            displayName="Duy Anh"
            createdAt="11:01 AM | Today"
            photoURL="https://joeschmoe.io/api/v1/random"
          />
          <Message
            text="Manchester United, No.1"
            displayName="Vũ Hiệu"
            createdAt="11:01 AM | Today"
            photoURL="https://joeschmoe.io/api/v1/random"
          />
        </div>
      </Row>
    </div>
  );
};

export default Sidebar;
