/* eslint-disable no-restricted-syntax */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import "./styles.scss";
import {
  Layout,
  Form,
  Input,
  Button,
  Modal,
  Alert,
  Descriptions,
  Menu,
} from "antd";
import Header from "../../components/Header/Header";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import Footer from "../../components/Footer/Footer";

const { Content } = Layout;
const Profile = () => {
  const [changePassword, setChangePassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const tmpChangePassword = { ...changePassword };

  // handle change password
  async function handleChangePassword() {
    const token = sessionStorage.getItem("token");
    const urlencoded = new URLSearchParams();
    urlencoded.append("old_password", tmpChangePassword.old_password);
    urlencoded.append("new_password", tmpChangePassword.new_password);
    urlencoded.append("confirm_password", tmpChangePassword.confirm_password);
    console.log("formData", urlencoded);
    // for (const key of urlencoded.entries()) {
    //   console.log(`${key[0]}, ${key[1]}`);
    // }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const requestOptions = {
      method: "PUT",
      body: urlencoded,
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/user/change-password",
        requestOptions
      );
      console.log(response);
      const responseJSON = await response.json();
      console.log("response", responseJSON);
      if (responseJSON.status === "success") {
        console.log("status: ", responseJSON);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
  // handle show Modal
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setVisible(false);
    // }, 5000);
    handleChangePassword();
  };

  const handleCancel = () => {
    setVisible(false);
  };

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
              >
                <Menu.Item>INFORMATION</Menu.Item>
                <Menu.Item>FOLLOWERS</Menu.Item>
                <Menu.Item>FOLLOWINGS</Menu.Item>
                <Menu.Item>BOOKMARKS</Menu.Item>
                <Menu.Item>MENTOR</Menu.Item>
              </Menu>
            </div>
            <div className="personal-profile content">
              <Descriptions bordered column={1} title="Personal profile">
                <Descriptions.Item label="Name">
                  Đinh Quang Hòa
                </Descriptions.Item>
                <Descriptions.Item label="Birthday">
                  20/09/1999
                </Descriptions.Item>
                <Descriptions.Item label="Gender">Male</Descriptions.Item>
                <Descriptions.Item label="Email">
                  dinhquanghoa2009@gmail.com
                </Descriptions.Item>
                <Descriptions.Item label="Phone">0392789658</Descriptions.Item>
              </Descriptions>
            </div>
            <div className="account-info content">
              <span className="title-account-info">Account information</span>
              <Form name="basic">
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name="email"
                  label="Email"
                >
                  <span className="">vuquochieu@gmail.com</span>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name="password"
                  label="Password"
                >
                  <span className="">********</span>
                </Form.Item>
              </Form>
              <Button type="primary" onClick={showModal}>
                Change Password
              </Button>
              <Modal
                visible={visible}
                title="Change Password"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Return
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={handleOk}
                  >
                    CHANGE PASSWORD
                  </Button>,
                ]}
              >
                <Form name="basic">
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input your old password!",
                      },
                    ]}
                    name="old-password"
                    label="Old Password"
                  >
                    <Input.Password
                      maxLength={30}
                      placeholder="Old Password"
                      onChange={(e) => {
                        tmpChangePassword.old_password = e.target.value;
                        console.log("tmp", tmpChangePassword);
                        console.log(typeof tmpChangePassword.old_password);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input your new password!",
                      },
                    ]}
                    name="new-password"
                    label="New Password"
                  >
                    <Input.Password
                      maxLength={30}
                      placeholder="New Password"
                      onChange={(e) => {
                        tmpChangePassword.new_password = e.target.value;
                        console.log("tmp", tmpChangePassword);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input your confirm new password!",
                      },
                    ]}
                    name="confirm-password"
                    label="Confirm Password"
                  >
                    <Input.Password
                      maxLength={30}
                      placeholder="Confirm password"
                      onChange={(e) => {
                        tmpChangePassword.confirm_password = e.target.value;
                        console.log("tmp", tmpChangePassword);
                      }}
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </Content>
        <SidebarRight />
      </Layout>
      <Footer />
    </Layout>
  );
};

export default Profile;
