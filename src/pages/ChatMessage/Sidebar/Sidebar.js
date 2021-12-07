/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-alert */
import { Row, Col, Typography, Divider, Input } from "antd";
import React, { useEffect, useState } from "react";
import Message from "../Message/Message";
import "./styles.scss";

const { Search } = Input;

const Sidebar = () => {
  const [listFollowing, setListFollowing] = useState([]);
  const [targetId, setTargetId] = useState("");

  useEffect(() => {
    async function getListFollowingUsers() {
      const token = sessionStorage.getItem("token");
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/following",
          requestOptions
        );
        const responseJSON = await response.json();
        setListFollowing(responseJSON.data);
      } catch (error) {
        console.log("Faild fetch list following users ", error.message);
      }
    }
    getListFollowingUsers();
  }, []);

  const onSearch = (value) => console.log(value);

  return (
    <div
      className="wrapper-sidebar"
      style={{ height: "100vh", borderRight: "1px solid #ccc", padding: "5px" }}
    >
      <Row>
        <Col span={24}>
          <Typography.Text
            style={{
              fontSize: "24px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            YOUR MESSAGES
          </Typography.Text>
        </Col>
        <Col span={24}>
          <Search
            size="large"
            placeholder="Search on messenger "
            onSearch={onSearch}
            enterButton
            style={{ margin: "20px 0" }}
          />
        </Col>

        <div>
          {listFollowing.map((item) => (
            <div
              className="chat-item"
              onClick={() => {
                setTargetId(item.id);
                alert(item.id);
              }}
            >
              <Message
                text="Hi"
                displayName={item.full_name}
                createdAt="11:01 AM | Today"
                photoURL={`http://127.0.0.1:8000/${item.image}`}
              />
            </div>
          ))}
        </div>
      </Row>
    </div>
  );
};

export default Sidebar;
