import axios from "axios";

const v1URL = "https://ark.ru/api/v1";

const api = axios.create({
  baseURL: v1URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const users = {
  async fetch(limit, offset) {
    return await api.get("/management/users", { params: { limit, offset } });
  },

  async create(data) {
    return await api.post("/management/users", data);
  },

  async update(id, data) {
    return await api.patch(`/management/users/${id}`, data);
  },

  async show(id) {
    return await api.head(`/management/users/${id}`);
  },

  async delete(id) {
    return await api.delete(`/management/users/${id}`);
  },
};

export default {
  users,
};
