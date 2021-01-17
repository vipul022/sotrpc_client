import api from "../config/api";

async function getAllClasses() {
  const response = await api.get("/classes");
  return response.data;
}

const addNewClass = async (newClass) => {
  const response = await api.post("/classes", newClass);
  return response.data;
};

async function deleteClass(id) {
  // !sending id as req.params.id to backend
  const response = await api.delete(`/classes/${id}`, { params: { id } });
  return response;
}

async function updateClass(updatedClass) {
  const response = await api.put(`/classes/${updatedClass._id}`, updatedClass);
  return response;
}

const getClassFromId = (classes, id) => {
  const cl = classes && classes.find((cl) => cl._id === id);
  return cl;
};
export { getAllClasses, addNewClass, deleteClass, updateClass, getClassFromId };
