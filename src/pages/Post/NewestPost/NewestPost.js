/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Layout, Select, Button, Tooltip, List, Avatar } from "antd";
import { createFromIconfontCN, SearchOutlined } from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import images from "../../../assets/images";

const { Content } = Layout;
const { Option } = Select;

const NewestPost = () => {
  const [listPost, setList] = useState([]);
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
        console.log("personal: ", user);
      } catch (error) {
        console.log("Faild fetch user : ", error.message);
      }
    }

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
          "http://127.0.0.1:8000/api/user/posts/newest",
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
    getPersonal();
    getPostData();
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

  if (listPost.length === 0) {
    return <p>Create post now!</p>;
  }
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
                NEWEST POSTS
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
                  <List.Item
                    extra={(
                      <img
                        width={272}
                        alt="logo"
                        src={`http://127.0.0.1:8000/${item.image}`}
                      />
                    )}
                  >
                    <List.Item.Meta
                      avatar={(
                        <Link to={`/otherprofile/${user.id}`}>
                          <Avatar src={`http://127.0.0.1:8000/${user.image}`} />
                        </Link>
                      )}
                      title={(
                        <Link to={`/otherprofile/${user.id}`}>
                          {user.full_name}
                        </Link>
                      )}
                      description={(
                        <a href={`/post/detail/${item.id}`}>
                          <h6>{item.title}</h6>
                        </a>
                      )}
                    />

                    {`${formatDate(item.updated_at)}  |  `}
                    {<a href="#"><span>{item.hashtag}</span></a>}
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

export default NewestPost;