/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Layout, Select, Button, Tooltip, Image, List, Avatar } from "antd";
import { createFromIconfontCN, SearchOutlined } from "@ant-design/icons";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ListQuestion = () => {
  const [listQuestion, setList] = useState([]);
  const [user, setUser] = useState({});
  const location = useLocation();
  const arr = location.pathname.split("/");
  const selectedId = arr[arr.length - 1];

  useEffect(() => {
    async function getTargetUser() {
      const formData = new FormData();
      formData.append("id", selectedId);
      const requestOptions = {
        method: "POST",
        body: formData,
      };

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/get-by-id`,
          requestOptions
        );
        const responseJSON = await response.json();
        if (responseJSON.status === "success") {
          setUser(responseJSON.data);
        }
      } catch (error) {
        console.log("Faild fetch this user : ", error.message);
      }
    }
    async function getQuestionData() {
      const token = sessionStorage.getItem("token");
      const fm = new FormData();
      fm.append("user_id", selectedId);
      const requestOptions = {
        method: "POST",
        body: fm,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/questions/getbyuserid",
          requestOptions
        );
        const responseJSON = await response.json();
        if (responseJSON.status === "success") {
          setList(responseJSON.data);
        }
      } catch (error) {
        console.log("Failed fetch list questions", error.message);
      }
    }
    getQuestionData();
    getTargetUser();
  }, []);

  // convert timestams to date
  const formatDate = (timestams) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    };
    return new Date(timestams).toLocaleDateString(undefined, options);
  };

  if (listQuestion.length === 0) {
    return <p>Nothing...</p>;
  }
  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={listQuestion}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Link to={`/otherprofile/${user.id}`}>
                  <Avatar src={`http://127.0.0.1:8000/${user.image}`} />
                </Link>
              }
              title={
                <Link to={`/otherprofile/${user.id}`}>{user.full_name}</Link>
              }
              description={
                <a href={`/question/detail/${item.id}`}>
                  <h6>{item.title}</h6>
                </a>
              }
            />

            {`${formatDate(item.updated_at)}  |  `}
            {
              <a href="#">
                <span>{item.hashtag}</span>
              </a>
            }
          </List.Item>
        )}
      />
      ,
    </div>
  );
};

export default ListQuestion;
