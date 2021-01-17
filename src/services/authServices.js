import api from "../config/api";

// !Whenever we use api with a http req , it redirects our req to the server
async function registerUser(userInfo) {
  const response = await api.post("/users", userInfo);
  return response.data;
}

async function loginUser(userInfo) {
  const response = await api.post("/users/login", userInfo);
  return response.data;
}

async function logoutUserFromBackend() {
  const response = await api.get("/users/logout");
  return response.data;
}
export { registerUser, loginUser, logoutUserFromBackend };
