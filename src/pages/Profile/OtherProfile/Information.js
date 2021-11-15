/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import "./styles.scss";
import { Descriptions, Image, Space, Button, notification } from "antd";
import { useLocation } from "react-router-dom";

const Information = () => {
  const [follow, setFollow] = useState("");
  const [user, setUser] = useState({});
  const location = useLocation();
  const arr = location.pathname.split("/");
  const selectedId = arr[arr.length - 1];

  useEffect(() => {
    async function checkFollow() {
      const token = sessionStorage.getItem("token");
      const formData = new FormData();
      formData.append("target_user_id", selectedId);
      const requestOptions = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/checkfollow`,
          requestOptions
        );
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (responseJSON.status === "followed") {
          setFollow("Following");
        }
        if (responseJSON.status === "follow") {
          setFollow("Unfollowing");
        }
      } catch (error) {
        console.log("Faild fetch this user : ", error.message);
      }
    }
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
    checkFollow();
    getTargetUser();
  }, []);

  const handleFollow = () => {
    const token = sessionStorage.getItem("token");
    const fm = new FormData();
    fm.append("target_user_id", selectedId);
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
        if (result.type === "follow") {
          setFollow("Following");
          openNotificationWithIcon("success", `Following ${user.full_name}`);
        } else {
          setFollow("Unfollowing");
          openNotificationWithIcon("success", `Unfollowing ${user.full_name}`);
        }
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
      <div className="personal-profile content">
        <Descriptions bordered column={1} title="Personal information">
          <Descriptions.Item label="Image">
            <Image width={200} src={`http://127.0.0.1:8000/${user.image}`} />
          </Descriptions.Item>
          <Descriptions.Item label="Name">{user.full_name}</Descriptions.Item>
          <Descriptions.Item label="Birthday">
            {user.birthday}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="Topic">{user.topic}</Descriptions.Item>
          <Descriptions.Item label="Description">
            {user.description}
          </Descriptions.Item>
        </Descriptions>
        <Button
          size="large"
          type={follow ? "primary" : "default"}
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={handleFollow}
        >
          {`${follow}`}
        </Button>
      </div>
    </div>
  );
};

export default Information;
