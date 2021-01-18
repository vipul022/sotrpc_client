import api from "../config/api";

const getAllMembers = async () => {
  const response = await api.get("/users");
  return response.data;
};

const deleteMember = async (id) => {
  const response = await api.delete(`/users/${id}`, { params: { id } });
  return response;
};

const updateMember = async (updatedMember) => {
  const response = await api.put(`/users/${updatedMember._id}`, updatedMember);
  return response;
};
export { getAllMembers, deleteMember, updateMember };
