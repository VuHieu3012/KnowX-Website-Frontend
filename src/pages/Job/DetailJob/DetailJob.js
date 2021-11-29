/* eslint-disable no-undef */
/* eslint-disable no-useless-concat */
/* eslint-disable react/prop-types */
/* eslint-disable radix */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Layout, Avatar, Typography, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useLocation, Redirect, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";

const { Content } = Layout;
const { Text } = Typography;

const DetailJob = () => {
  const userId = sessionStorage.getItem("user_id");
  const location = useLocation();
  const arr = location.pathname.split("/");
  const selectedId = arr[arr.length - 1];

  const [selectedPost, setSelectedPost] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(selectedId);
    async function getJobData() {
      const token = sessionStorage.getItem("token");
      const fm = new FormData();
      fm.append("id", selectedId);
      const requestOptions = {
        method: "POST",
        body: fm,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/job/show`,
          requestOptions
        );
        const responseJSON = await response.json();
        console.log(responseJSON);
        setSelectedPost(responseJSON.data);
        setUser(responseJSON.user);
      } catch (error) {
        console.log("Failed fetch this Job", error.message);
      }
    }
    getJobData();
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

  const sendMail = () => {
    GmailApp.sendEmail("devhuy@gmail.com", "current time", "The time is: ");
  };

  return (
    <Layout>
      <Header />
      <Layout>
        <SidebarLeft />
        <Layout>
          <Content>
            <div className="container">
              <div className="postDetail-container">
                <div className="postDetail-author">
                  <Avatar
                    src={`http://127.0.0.1:8000/${user.image}`}
                    size={40}
                  />
                  <Link
                    to={`/otherprofile/${user.id}`}
                    style={{ fontSize: "16px", lineHeight: "42px" }}
                  >
                    {user.full_name}
                  </Link>
                </div>
                <div className="postDetail-date">
                  {formatDate(selectedPost.updated_at)}
                </div>
                <div className="postDetail-position">
                  <Text mark> POSITION: {selectedPost.position}</Text>
                </div>
                <div className="postDetail-title">
                  <h5>{selectedPost.title}</h5>
                </div>
                <div
                  className="postDetail-content"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
                <a href={`mailto:${user.email}`}>
                  <Button
                    icon={<MailOutlined style={{ marginTop: "3px" }} />}
                    type="primary"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    Contact Now!
                  </Button>
                </a>
              </div>
            </div>
          </Content>
        </Layout>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default DetailJob;
