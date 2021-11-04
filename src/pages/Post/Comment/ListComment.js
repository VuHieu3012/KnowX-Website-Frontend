/* eslint-disable comma-dangle */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import { useLocation } from "react-router-dom";

const { TextArea } = Input;
const ListComment = () => {
  const [loading, setLoading] = useState(false);
  const [listComment, setListComment] = useState([]);
  const location = useLocation();
  const arr = location.pathname.split("/");
  const selectedId = arr[arr.length - 1];

  let comment = "";
  // lấy list comment
  async function getListComment() {
    const token = sessionStorage.getItem("token");
    const fm = new FormData();
    fm.append("post_id", selectedId);
    const requestOptions = {
      method: "POST",
      body: fm,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // gọi api
    setTimeout(async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/posts/comment/get`,
          requestOptions
        );
        const responseJSON = await response.json();
        setLoading(false);
        // Gán giá trị vừa lấy được vào biến listcomment để hiển thị ra màn hình
        setListComment(responseJSON.data);
        console.log(listComment);
      } catch (error) {
        console.log("Failed fetch list comment", error.message);
      }
    }, 2000);
  }
  async function createComment() {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    const fm = new FormData();
    fm.append("post_id", selectedId);
    fm.append("comment", comment);
    const requestOptions = {
      method: "POST",
      body: fm,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/user/posts/comment/create`,
        requestOptions
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      getListComment();

      comment = "";
    } catch (error) {
      console.log("Failed fetch create comment", error.message);
    }
  }
  useEffect(() => {
    getListComment();
  }, []);

  const formatDate = (timestams) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    };
    return new Date(timestams).toLocaleDateString(undefined, options);
  };
  console.log(listComment);

  return (
    <div>
      <Form.Item>
        <TextArea
          rows={1}
          value={comment}
          onChange={(e) => {
            comment = e.target.value;
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          onClick={createComment}
          loading={loading}
        >
          Add Comment
        </Button>
      </Form.Item>
      {listComment ? (
        <List
          className="comment-list"
          header={`${listComment.length} replies`}
          itemLayout="horizontal"
          dataSource={listComment}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.full_name}
                avatar={`http://127.0.0.1:8000/${item.image}`}
                content={item.comment}
                datetime={formatDate(item.updated_at)}
              />
            </li>
          )}
        />
      ) : null}
    </div>
  );
};

export default ListComment;
