/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import {
  Button,
  Col,
  Drawer,
  Input,
  Layout,
  Row,
  Avatar,
  Divider,
  List,
  Cascader,
  Typography,
  Tooltip,
  Modal,
  message,
  Spin,
} from "antd";
import {
  MessageOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";

const { Content } = Layout;
const FindBuddy = () => {
  let description = "";
  const [listSubject, setListSubject] = useState([]);
  const [listBuddy, setListBuddy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [myFindBuddy, setMyFindBuddy] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modalText, setModalText] = useState("Accept delete this item?");
  const [deletingSubject, setDeletingSubject] = useState(null);
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    async function getAllListSubject() {
      const token = sessionStorage.getItem("token");
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        "http://127.0.0.1:8000/api/user/buddy/getall",
        requestOptions,
      );
      const responseJSON = await response.json();
      setListBuddy(responseJSON.data);
    }
    getAllListSubject();
  }, []);

  useEffect(() => {
    async function getListSubject() {
      const token = sessionStorage.getItem("token");
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        "http://127.0.0.1:8000/api/user/subject/get",
        requestOptions,
      );
      const responseJSON = await response.json();
      setListSubject(responseJSON.data);
    }
    getListSubject();
  }, []);

  useEffect(() => {
    getListMyFindBuddy();
  }, []);

  async function getListMyFindBuddy() {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/user/buddy/myfindbuddy",
        requestOptions,
      );
      const responseJSON = await response.json();
      if (responseJSON.status === "success") {
        setMyFindBuddy(responseJSON.data);
      }
      setSpin(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleFindBuddy() {
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("subject_id", selectedSubject);
    formData.append("description", description);
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/user/buddy/create",
        requestOptions,
      );
      const responseJSON = await response.json();
      if (responseJSON.status === "success") {
        handleGetListBuddy(selectedSubject);
        getListMyFindBuddy();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetListBuddy() {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("subject_id", selectedSubject);
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      "http://127.0.0.1:8000/api/user/buddy/get",
      requestOptions,
    );
    const responseJSON = await response.json();
    if (responseJSON.status === "success") {
      setListBuddy(responseJSON.data);
      setLoading(false);
      console.log(listBuddy);
    }
    if (responseJSON.status === "failed") {
      setLoading(false);
      setListBuddy([]);
      console.log(responseJSON.message);
    }
  }

  async function handleDelteBuddy() {
    console.log(deletingSubject);
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("subject_id", deletingSubject);
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setTimeout(async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/user/buddy/delete",
        requestOptions,
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      if (responseJSON.status === "success") {
        success();
        getListMyFindBuddy();
      }
    }, 2000);
  }
  const [viewDetails, setViewDetails] = useState([]);
  const showDrawer = (value) => {
    console.log(value);
    setViewDetails(value);
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">
        {title}
        {":"}
      </p>
      {content}
    </div>
  );

  const options = [];
  for (let i = 0; i < listSubject.length; i++) {
    options.push({
      value: listSubject[i].id,
      label: listSubject[i].name,
    });
  }
  let selectedSubject = null;
  function onChange(value, selectedOptions) {
    selectedSubject = value;
  }
  function filter(inputValue, path) {
    return path.some(
      (option) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  }
  const handleOk = () => {
    handleDelteBuddy();
    setConfirmLoading(true);
    setTimeout(() => {
      setShow(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setShow(false);
  };
  const success = () => {
    message.success("Success. Item deleted!", 5);
  };
  const showModal = () => {
    console.log(deletingSubject);
    setShow(true);
  };

  return (
    <>
      <Layout>
        <Header />
        <Layout>
          <SidebarLeft />
          <Content>
            <div className="container">
              <Modal
                title="Confirm"
                visible={show}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <p>{modalText}</p>
              </Modal>
              <div className="find-content content">
                <Row>
                  <Col span={12}>
                    <Cascader
                      size="large"
                      options={options}
                      onChange={onChange}
                      placeholder="Subject, topic"
                      showSearch={{ filter }}
                    />
                  </Col>
                  <Col span={12}>
                    <Input.TextArea
                      rows={6}
                      placeholder="Description"
                      onChange={(e) => {
                        description = e.target.value;
                      }}
                    />
                  </Col>
                </Row>
                <div align="center">
                  <Button
                    style={{ marginTop: "25px" }}
                    size="large"
                    type="primary"
                    loading={loading}
                    onClick={handleFindBuddy}
                    icon={<SearchOutlined style={{ marginBottom: "7px" }} />}
                  >
                    FIND BUDDY
                  </Button>
                </div>
                {myFindBuddy.length > 0 ? (
                  <>
                    <Divider orientation="left">My Find Buddy</Divider>
                    <List
                      bordered
                      dataSource={myFindBuddy}
                      renderItem={(item) => (
                        <List.Item>
                          <Typography.Text>
                            <b>
                              [
                              {item.subject_name}
                              ]
                            </b>
                          </Typography.Text>
                          {" "}
                          {item.description}
                          <Tooltip title="delete">
                            <Button
                              shape="circle"
                              icon={<CloseOutlined />}
                              style={{ float: "right" }}
                              size="small"
                              onClick={() => {
                                setDeletingSubject(item.subject_id);
                                showModal();
                              }}
                            />
                          </Tooltip>
                        </List.Item>
                      )}
                    />
                  </>
                ) : null}
              </div>
              {spin ? (
                <div className="spin">
                  <Spin size="large" />
                </div>
              ) : (
                <div className="list-users content">
                  <Divider orientation="left">Result</Divider>
                  <List
                    dataSource={listBuddy}
                    bordered
                    size="small"
                    pagination={{
                      pageSize: 5,
                    }}
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        actions={[
                          <a
                            key={`a-${item.id}`}
                            onClick={() => {
                              showDrawer(item);
                              console.log("item: ", item);
                            }}
                          >
                            View Detail
                          </a>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={(
                            <Avatar
                              size={64}
                              src={`http://127.0.0.1:8000/${item.image}`}
                            />
                          )}
                          title={<a href="/profile">{item.full_name}</a>}
                          description={item.subject[0].name}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              )}
            </div>
          </Content>
          <SidebarRight />
        </Layout>
        <Footer />
      </Layout>
      <Drawer
        width={500}
        placement="right"
        title="Personal information"
        closable={false}
        onClose={onClose}
        visible={visible}
        key="drawer"
      >
        <p className="site-description-item-profile-p">Buddy information</p>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Subject"
              content={viewDetails.subject_name}
            />
          </Col>
          <Col span={24}>
            <DescriptionItem
              title="Description"
              content={viewDetails.description}
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">User Profile</p>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Full Name"
              content={viewDetails.full_name}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Gender" content={viewDetails.gender} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Birthday" content={viewDetails.birthday} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Bio" content={viewDetails.bio} />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Contacts</p>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Email" content={viewDetails.email} />
          </Col>
          <Col span={24}>
            <DescriptionItem title="Phone Number" content={viewDetails.phone} />
          </Col>
        </Row>
        <Divider />
        <div style={{ lineHeight: "32px" }}>
          <a href={`/otherprofile/${viewDetails.user_id}`}>Profile details</a>
          <Button
            size="24px"
            type="primary"
            style={{ float: "right" }}
            icon={<MessageOutlined style={{ fontSize: "23px" }} />}
            shape="round"
          >
            Send Message
          </Button>
        </div>
      </Drawer>
    </>
  );
};
export default FindBuddy;
