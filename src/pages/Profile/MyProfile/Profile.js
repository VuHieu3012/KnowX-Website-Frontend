/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import "./styles.scss";
import { Layout, Menu } from "antd";
import Header from "../../../components/Header/Header";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import Followings from "./Followings";
import Followers from "./Followers";
import Information from "./Information";
import Bookmark from "./Bookmark";
import Mentor from "./Mentor";

const { Content } = Layout;

const Profile = () => {
  const [key, setKey] = useState("information");
  const [countFollowings, setCountFollowings] = useState(0);
  const [countFollowers, setCountFollowers] = useState(0);
  const [countBookmarks, setCountBookmarks] = useState(0);
  const handleClick = (e) => {
    setKey(e.key);
  };

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
        if (responseJSON.status === "success") {
          setCountFollowings(responseJSON.count);
        }
      } catch (error) {
        console.log("Faild fetch list following users ", error.message);
      }
    }

    async function getListFollowers() {
      const token = sessionStorage.getItem("token");
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/followers",
          requestOptions
        );
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (responseJSON.status === "success") {
          setCountFollowers(responseJSON.count);
        }
      } catch (error) {
        console.log("Faild fetch list followers ", error.message);
      }
    }

    async function getListBookmark() {
      const token = sessionStorage.getItem("token");
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/posts/getbookmark",
          requestOptions
        );
        const responseJSON = await response.json();
        setCountBookmarks(responseJSON.count);
      } catch (error) {
        console.log("Failed fetch list Bookmark", error.message);
      }
    }

    getListBookmark();
    getListFollowers();
    getListFollowingUsers();
  }, []);

  return (
    <Layout>
      <Header />
      <Layout>
        <SidebarLeft />
        <Content>
          <div className="container">
            <div className="navigation-profile">
              <Menu
                mode="horizontal"
                style={{ fontSize: "14px", fontWeight: "600" }}
                onClick={handleClick}
                selectedKeys={key}
              >
                <Menu.Item key="information">INFORMATION</Menu.Item>
                <Menu.Item key="followers">
                  FOLLOWERS (
                  {countFollowers}
                  )
                </Menu.Item>
                <Menu.Item key="followings">
                  FOLLOWINGS (
                  {countFollowings}
                  )
                </Menu.Item>
                <Menu.Item key="bookmarks">
                  BOOKMARKS (
                  {countBookmarks}
                  )
                </Menu.Item>
                <Menu.Item key="mentor">MENTOR</Menu.Item>
              </Menu>
            </div>
            {key === "information" ? (
              <Information />
            ) : key === "followers" ? (
              <Followers />
            ) : key === "bookmarks" ? (
              <Bookmark />
            ) : key === "mentor" ? (
              <Mentor />
            ) : (
              <Followings />
            )}
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default Profile;
