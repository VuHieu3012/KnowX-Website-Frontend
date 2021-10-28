/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { List, Avatar, Button, notification } from "antd";
import { Link } from "react-router-dom";

const Followings = () => {
  const [listFollowing, setListFollowing] = useState([]);
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
        console.log(responseJSON);
        if (responseJSON.status === "success") {
          setListFollowing(responseJSON.data);
        }
      } catch (error) {
        console.log("Faild fetch list following users ", error.message);
      }
    }
    getListFollowingUsers();
    console.log("list: ", listFollowing);
  }, []);

  const handleFollow = (id) => {
    console.log(id);
    const token = sessionStorage.getItem("token");
    const fm = new FormData();
    fm.append("target_user_id", id);
    const requestOptions = {
      method: "POST",
      body: fm,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch("http://127.0.0.1:8000/api/user/follow", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("status: ", result);
      })
      .catch((error) => {
        console.log("errro", error);
      });
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        size="large"
        pagination={{
          pageSize: 5,
        }}
        dataSource={listFollowing}
        renderItem={(item) => (
          <div>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`http://127.0.0.1:8000/${item.image}`} />}
                title={
                  <a href={`/otherprofile/${item.id}`}>{item.full_name}</a>
                }
                description={`${item.email} | ${item.topic}`}
              />
              <Button>
                <Link to={`/otherprofile/${item.id}`}>View Profile</Link>
              </Button>
            </List.Item>
          </div>
        )}
      />
    </div>
  );
};

export default Followings;
