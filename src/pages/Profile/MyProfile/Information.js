/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line import/no-unresolved
import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.scss";
import {
  Form,
  Input,
  Button,
  Modal,
  Descriptions,
  Space,
  notification,
  Image,
  Spin,
  message,
} from "antd";

const Information = () => {
  const [picture, setPicture] = useState();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [changePassword, setChangePassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [spin, setSpin] = useState(true);

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
        setSpin(false);
      } catch (error) {
        console.log("Faild fetch user : ", error.message);
      }
    }
    getPersonal();
  }, []);

  // handle change password
  function handleChangePassword() {
    const token = sessionStorage.getItem("token");
    const data = new FormData();
    data.append("old_password", changePassword.old_password);
    data.append("new_password", changePassword.new_password);
    data.append("confirm_password", changePassword.confirm_password);
    axios
      .post("http://127.0.0.1:8000/api/user/change-password", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response", response);
        if (response.data.status === "success") {
          onReset();
          message.success(`${response.data.message}`);
          setVisible(false);
          setChangePassword(null);
        }
        if (response.data.status === "failed") {
          message.error("Old password does not matched", 3);
        }
        if (
          response.data.status === "error" &&
          response.data.validation_errors.confirm_password
        ) {
          message.error(
            `${response.data.validation_errors.confirm_password[0]}`,
            3
          );
        }
        if (
          response.data.status === "error" &&
          response.data.validation_errors.new_password
        ) {
          message.error(
            `${response.data.validation_errors.new_password[0]}`,
            3
          );
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }
  // handle show Modal
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    handleChangePassword();
  };

  const handleCancel = () => {
    onReset();
    setVisible(false);
  };

  async function handleEdit() {
    setLoading(true);
    setUser(tmpInforData);
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("first_name", tmpInforData.first_name);
    formData.append("last_name", tmpInforData.last_name);
    formData.append("email", tmpInforData.email);
    formData.append("birthday", tmpInforData.birthday);
    formData.append("gender", tmpInforData.gender);
    formData.append("phone", tmpInforData.phone);
    formData.append("topic", tmpInforData.topic);
    formData.append("description", tmpInforData.description);
    formData.append("image", picture);
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setTimeout(async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/update`,
          requestOptions
        );
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (responseJSON.status === "success") {
          console.log("new data:", responseJSON.data);
          setUser(responseJSON.data);
          setEditMode(false);
          openNotificationWithIcon("success", "Information updated!");
          // window.location.reload(true);
        } else {
          setLoading(false);
          openNotificationWithIcon("error", "Update profile failed!");
        }
      } catch (error) {
        setLoading(false);
        console.log("Failed edit profile", error.message);
      }
    }, 2000);
  }
  const openNotificationWithIcon = (type, msg) => {
    setLoading(false);
    notification[type]({
      message: msg,
    });
  };

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const handleImage = (e) => {
    setPicture(e.target.files[0]);
  };

  const tmpInforData = { ...user };
  const editInfo = (
    <div>
      <Form
        name="basic"
        initialValue={{
          first_name: tmpInforData.first_name,
          last_name: tmpInforData.last_name,
          email: tmpInforData.email,
          phone: tmpInforData.phone,
          image: tmpInforData.image,
          gender: tmpInforData.gender,
          birthday: tmpInforData.birthday,
          topic: tmpInforData.topic,
          description: tmpInforData.description,
        }}
      >
        <div className="form-edit">
          <Form.Item
            rules={[{ required: true }]}
            name="image"
            initialValue={tmpInforData.image}
            label="Image"
          >
            <div className="input-group mb-3">
              <input
                style={{ marginLeft: "91px" }}
                type="file"
                className="form-control"
                onChange={handleImage}
              />
            </div>
          </Form.Item>

          <Form.Item
            rules={[{ required: true }]}
            name="email"
            initialValue={tmpInforData.email}
            label="Email"
          >
            <Input
              width="100px"
              onChange={(e) => {
                tmpInforData.email = e.target.value;
              }}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="first_name"
            initialValue={tmpInforData.first_name}
            label="First name"
          >
            <Input
              width="100px"
              onChange={(e) => {
                tmpInforData.first_name = e.target.value;
              }}
            />
          </Form.Item>
          <Form.Item
            label="Last name"
            rules={[{ required: true }]}
            name="last_name"
            initialValue={tmpInforData.last_name}
          >
            <Input
              onChange={(e) => {
                tmpInforData.last_name = e.target.value;
              }}
            />
          </Form.Item>
          <Form.Item
            label="Gender"
            rules={[{ required: true }]}
            name="gender"
            initialValue={tmpInforData.gender}
          >
            <Input
              onChange={(e) => {
                tmpInforData.gender = e.target.value;
              }}
            />
          </Form.Item>
          <Form.Item
            label="Phone"
            rules={[{ required: true }]}
            name="phone"
            initialValue={tmpInforData.phone}
          >
            <Input
              onChange={(e) => {
                tmpInforData.phone = e.target.value;
              }}
            />
          </Form.Item>
          <Form.Item
            label="Birthday"
            rules={[{ required: true }]}
            name="birthday"
            initialValue={tmpInforData.birthday}
          >
            <Input
              onChange={(e) => {
                tmpInforData.birthday = e.target.value;
              }}
            />
          </Form.Item>
          <Form.Item
            label="Topic"
            rules={[{ required: true }]}
            name="topic"
            initialValue={tmpInforData.topic}
          >
            <Input
              onChange={(e) => {
                tmpInforData.topic = e.target.value;
              }}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            rules={[{ required: true }]}
            name="description"
            initialValue={tmpInforData.description}
          >
            <Input.TextArea
              onChange={(e) => {
                tmpInforData.description = e.target.value;
              }}
            />
          </Form.Item>
          <Form.Item>
            <div style={{ marginTop: "55px", textAlign: "center" }}>
              <Space size={20}>
                <Button
                  size="medium"
                  type="primary"
                  onClick={handleEdit}
                  style={{ width: "100px" }}
                  loading={loading}
                >
                  EDIT
                </Button>
                <Button
                  size="medium"
                  type="primary"
                  style={{ width: "100px" }}
                  onClick={() => {
                    setEditMode(false);
                  }}
                >
                  CANCEL
                </Button>
              </Space>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );

  if (spin) {
    return (
      <div className="spin">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="personal-profile content">
        <span
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            marginRight: "25px",
            marginTop: "25px",
            paddingBottom: "25px",
          }}
        >
          Personal information
        </span>
        <Button
          style={{ marginBottom: "20px" }}
          type="primary"
          onClick={() => {
            setEditMode(true);
          }}
        >
          Edit
        </Button>
        {editMode ? editInfo : null}

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Image">
            <Image height={150} src={`http://127.0.0.1:8000/${user.image}`} />
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
      </div>
      <div className="account-info content">
        <span className="title-account-info">Account information</span>
        <Form name="basic">
          <Form.Item style={{ marginBottom: 0 }} name="email" label="Email">
            <span className="">{user.email}</span>
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
              Change
            </Button>,
          ]}
        >
          <Form name="changepassword" form={form}>
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
                  changePassword.old_password = e.target.value;
                }}
                style={{ marginLeft: "26px", width: "337px" }}
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
                  changePassword.new_password = e.target.value;
                }}
                style={{ marginLeft: "20px", width: "338px" }}
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
                  changePassword.confirm_password = e.target.value;
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Information;
