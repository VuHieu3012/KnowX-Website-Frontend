/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import {
  Layout,
  Space,
  Divider,
  Button,
  Input,
  message,
  Modal,
  List,
  Avatar,
} from "antd";
import { useEffect, useState } from "react";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import Header from "../../components/Header/Header";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import Footer from "../../components/Footer/Footer";
import Meeting from "./Meeting";

const { Content } = Layout;

const MeetingOption = () => {
  const [meeting, setMeeting] = useState(false);
  const [user, setUser] = useState({});
  const [room, setRoom] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [rec_id, setRec_id] = useState("");
  const [mes, setMes] = useState("");
  const [isInvited, setIsInvited] = useState(false);

  const showModal = () => {
    if (room === "") {
      message.error("Name of meeting is required!");
    } else {
      setIsModalVisible(true);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setRec_id(followingUsers[0].id);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleStart = () => {
    setImageUrl(`http://127.0.0.1:8000/${user.image}`);
    setMeeting(true);
  };

  const sendLink = async () => {
    const token = sessionStorage.getItem("token");
    const fm = new FormData();
    fm.append("receiver_id", rec_id);
    fm.append("message", mes);
    const requestOptions = {
      method: "POST", // goi api co dieu kien gui di
      body: fm,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/sendlink`,
        requestOptions,
      );
      const responseJSON = await response.json();
      if (responseJSON.status === "success") {
        setIsInvited(true);
      }
      console.log(responseJSON);
    } catch (error) {
      console.log("Failed fetch send link", error.message);
    }
  };

  const modal = (
    <Modal
      title="Invite people"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={(
        <Button type="primary" onClick={handleStart}>
          Start Meeting
        </Button>
      )}
    >
      {" "}
      <List
        itemLayout="horizontal"
        dataSource={followingUsers}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`http://127.0.0.1:8000/${item.image}`} />}
              title={<a href="https://ant.design">{item.full_name}</a>}
              description={item.is_online === 1 ? "online" : "offline"}
            />
            <Button
              onClick={() => {
                setRec_id(item.id);
                setMes(`https://meet.jit.si/${room}`);
                sendLink();
                followingUsers.forEach((el) => {
                  if (el.id === item.id) {
                    Object.assign(el, { isInvite: true });
                  }
                });
              }}
              disabled={followingUsers.find((el) => el.id === item.id).isInvite}
              type={
                followingUsers.find((el) => el.id === item.id).isInvite
                  ? "default"
                  : "primary"
              }
            >
              {followingUsers.find((el) => el.id === item.id).isInvite
                ? "Invited"
                : "Invite"}
            </Button>
          </List.Item>
        )}
      />
    </Modal>
  );

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
          requestOptions,
        );
        const responseJSON = await response.json();
        setUser(responseJSON.data);
      } catch (error) {
        console.log("Faild fetch user : ", error.message);
      }
    }

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
          requestOptions,
        );
        const responseJSON = await response.json();
        if (responseJSON.status === "success") {
          setFollowingUsers(responseJSON.data);
        }
      } catch (error) {
        console.log("Faild fetch list following users ", error.message);
      }
    }
    getListFollowingUsers();
    getPersonal();
  }, []);

  let tmpRoom = "";
  const onChangehandler = (e) => {
    tmpRoom = e.target.value;
    setRoom(tmpRoom);
  };

  return (
    <div>
      {meeting ? (
        <Meeting room={room} imageUrl={imageUrl} userName={user.full_name} />
      ) : (
        <Layout>
          <Header />
          <Layout>
            <SidebarLeft />
            <Content>
              <div className="container">
                {modal}
                <Divider
                  orientation="left"
                  style={{ fontSize: "18px", color: "#3F51B5" }}
                >
                  KNOWX MEETING
                </Divider>
                <Space
                  size="large"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "100px",
                  }}
                >
                  <Input
                    placeholder="Enter name of meeting..."
                    size="large"
                    onChange={onChangehandler}
                  />
                  <Button
                    type="primary"
                    size="large"
                    onClick={showModal}
                    icon={(
                      <VideoCameraAddOutlined
                        className="video-camera"
                        style={{ fontSize: "20px", marginBottom: "5px" }}
                      />
                    )}
                  >
                    NEW MEETING
                  </Button>
                </Space>
              </div>
            </Content>
            <SidebarRight />
          </Layout>
          <Footer />
        </Layout>
      )}
    </div>
  );
};

export default MeetingOption;
