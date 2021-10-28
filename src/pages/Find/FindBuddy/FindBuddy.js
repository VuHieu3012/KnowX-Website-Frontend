/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import "./styles.scss";
import axios from "axios";
import {
  Button,
  Col,
  Drawer,
  Input,
  Layout,
  Row,
  Select,
  Avatar,
  Divider,
  List,
  Cascader,
} from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import SidebarRight from "../../../components/SidebarRight/SidebarRight";
import Footer from "../../../components/Footer/Footer";
import images from "../../../assets/images";
import SidebarLeft from "../../../components/SidebarLeft/SidebarLeft";

const { Content } = Layout;
const FindBuddy = () => {
  const [listSubject, setListSubject] = useState([]);
  const [listBuddy, setListBuddy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

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
        requestOptions
      );
      const responseJSON = await response.json();
      setListSubject(responseJSON.data);
    }
    getListSubject();
  }, []);

  async function handleFindBuddy() {
    const token = sessionStorage.getItem("token");
    const fm = new FormData();
    fm.append("subject_id", selectedSubject);
    fm.append("description", description);
    const requestOptions = {
      method: "POST",
      body: fm,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/user/findbuddy/create",
        requestOptions
      );
      const responseJSON = await response.json();
      if (responseJSON.status === "success") {
        handleGetListBuddy(selectedSubject);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetListBuddy() {
    const token = sessionStorage.getItem("token");
    const fm = new FormData();
    fm.append("subject_id", selectedSubject);
    const requestOptions = {
      method: "POST",
      body: fm,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      "http://127.0.0.1:8000/api/user/findbuddy/get",
      requestOptions
    );
    const responseJSON = await response.json();
    if (responseJSON.status === "success") {
      setListBuddy(responseJSON.data);
      console.log(listBuddy);
    }
    if (responseJSON.status === "failed") {
      console.log(responseJSON.message);
    }
  }
  let selectedUser = {};

  // let selectedUser = {
  //   // id: 0,
  //   // user_id: 0,
  //   // subject_id: 0,
  //   // description: "",
  //   // created_at: "",
  //   // updated_at: "",
  //   // user: [
  //   //   {
  //   //     id: 1,
  //   //     first_name: "",
  //   //     last_name: "",
  //   //     full_name: "",
  //   //     email: "",
  //   //     phone: 0,
  //   //     email_verified_at: null,
  //   //     image: "",
  //   //     gender: "",
  //   //     birthday: "",
  //   //     topic: "",
  //   //     description: "",
  //   //     created_at: "",
  //   //     updated_at: "",
  //   //   },
  //   // ],
  //   // subject: [
  //   //   {
  //   //     id: 0,
  //   //     name: "",
  //   //     created_at: "",
  //   //     updated_at: "",
  //   //   },
  //   // ],
  // };
  const showDrawer = (value) => {
    selectedUser = value;
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}</p>
      {content}
    </div>
  );

  const options = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < listSubject.length; i++) {
    options.push({
      value: listSubject[i].id,
      label: listSubject[i].name,
    });
  }
  console.log(options);
  let selectedSubject = null;
  let description = "";
  function onChange(value, selectedOptions) {
    selectedSubject = value;
    console.log(selectedSubject);
  }
  function filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  }
  return (
    <>
      <Layout>
        <Header />
        <Layout>
          <SidebarLeft />
          <Content>
            <div className="container">
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
                        console.log(description);
                      }}
                    />
                  </Col>
                </Row>
                <div align="center">
                  <Button
                    style={{ marginTop: "25px" }}
                    size="large"
                    type="primary"
                    onClick={handleFindBuddy}
                  >
                    FIND BUDDY
                  </Button>
                </div>
              </div>
              <div className="list-users content">
                <List
                  dataSource={listBuddy}
                  bordered
                  size="large"
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 5,
                  }}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      actions={[
                        <a
                          onClick={() => {
                            showDrawer(item);
                            console.log("selectedUSer: ", selectedUser);
                          }}
                          key={`a-${item.id}`}
                        >
                          View Detail
                        </a>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            size={64}
                            src={`http://127.0.0.1:8000/${item.user[0].image}`}
                          />
                        }
                        title={<a href="/profile">{item.user[0].full_name}</a>}
                        description={item.subject[0].name}
                      />
                    </List.Item>
                  )}
                />
              </div>
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
        <p
          className="site-description-item-profile-p"
          style={{ marginBottom: 24 }}
        >
          User Profile
        </p>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Full Name"
              content={selectedUser.user[0].full_name}
              // content="asdasd"
            />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Gender" content="asds" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Birthday" content="asdas" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Description" content="asdas" />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Contacts</p>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Email" content="asdas" />
          </Col>
          <Col span={24}>
            <DescriptionItem title="Phone Number" content="asdas" />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default FindBuddy;
