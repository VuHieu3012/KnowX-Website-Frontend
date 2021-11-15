/* eslint-disable operator-linebreak */
import { Form, Button, Input } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { MessageOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Message from "../Message/Message";

const WrapperStyled = styled.div`
  height: 100vh;
  padding: 5px;
`;
const HeaderStyled = styled.div``;
const ContentStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;
const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;
const ChatWindow = () => {
  const formatDate = (timestams) => {
    const options = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(timestams).toLocaleDateString(undefined, options);
  };
  const inputRef = useRef(null);
  const messageListRef = useRef(null);
  const [form] = Form.useForm();
  const [message, setMessage] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  async function getMessages() {
    const token = sessionStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      "http://127.0.0.1:8000/api/user/messages",
      requestOptions,
    );
    const responseJSON = await response.json();
    setMessage(responseJSON);
    console.log(responseJSON);
  }
  useEffect(() => {
    getMessages();
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, []);
  async function sendMessage() {
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("rec_id", "11");
    formData.append("message", inputValue);
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      "http://127.0.0.1:8000/api/user/messages",
      requestOptions,
    );
    const responseJSON = await response.json();
    if (responseJSON.status === "success") {
      console.log(responseJSON);
      getMessages();
      form.resetFields(["message"]);
      // focus to input again after submit
      if (inputRef?.current) {
        setTimeout(() => {
          inputRef.current.focus();
        });
      }
    }
  }
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div> Khó chịu thật sự </div>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled ref={messageListRef}>
          {message.map((mes) => (
            <Message
              key={mes.id}
              text={mes.message}
              photoURL={mes.user.image}
              displayName={mes.user.full_name}
              createdAt={`${formatDate(mes.created_at)}`}
            />
          ))}
        </MessageListStyled>
        <FormStyled form={form}>
          <Form.Item name="message">
            <Input
              ref={inputRef}
              onChange={handleInputChange}
              // onPressEnter={handleOnSubmit}
              placeholder="Type a message..."
              bordered={false}
              autoComplete="off"
            />
          </Form.Item>
          <Button
            icon={<MessageOutlined />}
            type="primary"
            onClick={sendMessage}
          >
            Send
          </Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  );
};

export default ChatWindow;
