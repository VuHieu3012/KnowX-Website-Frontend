/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import { Layout, Space, Divider, Button, Input } from "antd";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import Footer from "../../components/Footer/Footer";
import Meeting from "./Meeting";

const { Content } = Layout;

const MeetingOption = () => {
  const [meeting, setMeeting] = useState(false);
  const [user, setUser] = useState({});
  const [room, setRoom] = useState("Helloword");
  const [imageUrl, setImageUrl] = useState("");

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
        console.log(user);
      } catch (error) {
        console.log("Faild fetch user : ", error.message);
      }
    }

    getPersonal();
  }, []);

  let tmpRoom = "";
  const onChangehandler = (e) => {
    tmpRoom = e.target.value;
    setRoom(tmpRoom);
    console.log(room);
  };

  const handleStart = () => {
    setImageUrl(`http://127.0.0.1:8000/${user.image}`);
    setMeeting(true);
  };

  return (
    <div>
      {meeting ? (
        <Meeting room={room} imageUrl={imageUrl} />
      ) : (
        <Layout>
          <Header />
          <Layout>
            <SidebarLeft />
            <Content>
              <div className="container">
                <Divider orientation="left">KNOWX MEETING</Divider>
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
                  <Button type="primary" size="large" onClick={handleStart}>
                    START
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
