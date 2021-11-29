/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prop-types */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
// import "./styles.scss";\
import "./styles.scss";
import { Layout, List, Avatar, Space } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";

const { Content } = Layout;

const ListJobs = () => {
  const [listPost, setList] = useState([]);
  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    async function getPostData() {
      const token = sessionStorage.getItem("token");
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/job/newest",
          requestOptions
        );
        const responseJSON = await response.json();
        if (responseJSON.status === "success") {
          setList(responseJSON.data);
        }
      } catch (error) {
        console.log("Failed fetch list newest Posts", error.message);
      }
    }
    getPostData();
  }, []);

  // convert timestams to date
  const formatDate = (timestams) => {
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(timestams).toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
      <Header />
      <Layout>
        <SidebarLeft />
        <Content>
          <div className="container">
            <div>
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginRight: "25px",
                }}
              >
                JOBS
              </span>
            </div>
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
                dataSource={listPost}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Link
                          to={
                            item.user_id === parseInt(userId)
                              ? "/profile"
                              : `/otherprofile/${item.user_id}`
                          }
                        >
                          <Avatar
                            src={`http://127.0.0.1:8000/${item.user_image}`}
                          />
                        </Link>
                      }
                      title={
                        <Link
                          to={
                            item.user_id === parseInt(userId)
                              ? "/profile"
                              : `/otherprofile/${item.user_id}`
                          }
                        >
                          {item.full_name}
                        </Link>
                      }
                      description={
                        <a href={`/jobs/detail/${item.id}`}>
                          <h6>{item.title}</h6>
                        </a>
                      }
                    />

                    {`${formatDate(item.updated_at)}  |  `}
                    {<span>{item.position}</span>}
                  </List.Item>
                )}
              />
              ,
            </div>
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default ListJobs;
