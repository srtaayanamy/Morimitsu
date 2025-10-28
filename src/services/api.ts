import axios from "axios";

const api = axios.create({
  baseURL: "https://morimtsu-lds.onrender.com",
});

export default api;