import axiosClient from "./axiosClient";

const PostApi = {
  getAll: (params) => {
    const url = "/posts";
    return axiosClient.get(url, { params });
  },

  getFollowing: (params) => {
    const url = "/posts/following";
    return axiosClient.get(url, { params });
  },

  getPostDetail: (id) => {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },

  create: (params) => {
    const url = "/posts";
    return axiosClient.post(url, { params });
  },

  delete: (id) => {
    const url = `/posts/${id}`;
    return axiosClient.delete(url);
  },

  update: (id) => {
    const url = `/posts/${id}`;
    return axiosClient.put(url);
  },
};

export default PostApi;
