import api from "../config/api";

const getAllPhotos = async () => {
  const response = await api.get("/photos");
  return response.data;
};

export { getAllPhotos };
