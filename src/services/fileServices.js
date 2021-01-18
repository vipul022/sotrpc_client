import api from "../config/api";
import axios from "axios";

// ! call backend api to save file to db
const addNewFile = async ({ fileName, fileType, description, type }) => {
  const response = await api.post(`/${type}`, {
    fileName,
    fileType,
    description,
  });

  return response;
};

const deleteFile = async (id, type) => {
  const response = await api.delete(`/${type}/${id}`, { params: { id } });
  return response;
};

// ! this function will delete file from db in case s3 bucket returns an error while saving the file
const deleteFileFromDb = (id, type) => {
  deleteFile(id, type)
    .then()
    .catch((error) => console.log(error));
};

const uploadFileToS3 = async (signedRequest, file, options, id, type) => {
  // !axios  call to S3
  let res = false;
  await axios
    .put(signedRequest, file, options)
    .then(() => (res = true))
    // !delete photo from db incase S3 bucket throws an error while saving the photo
    .catch((error) => {
      deleteFileFromDb(id, type);
      alert("ERROR FROM S3" + JSON.stringify(error));
    });
  return res;
};

const uploadFile = (fileState, dispatch) => {
  const { selectedFile, description, type } = fileState;

  let fileParts = selectedFile.name.split(".");
  let fileName = fileParts[0];
  let fileType = fileParts[1];

  // !passed type to make this function reusable to call backend api's
  addNewFile({ fileName, fileType, description, type })
    .then((response) => {
      const { returnData } = response.data.data;
      const { signedRequest } = returnData;
      const responsePhoto = response.data.photo;

      let updatedData = {
        ...fileState,
        file: responsePhoto,
        url: returnData.url,
      };

      dispatch({
        type: "setFileState",
        data: updatedData,
      });
      const id = responsePhoto._id;

      var options = {
        headers: {
          "Content-Type": fileType,
        },
      };
      uploadFileToS3(signedRequest, selectedFile, options, id, type)
        .then(() => {
          let updatedData = {
            ...fileState,
            success: true,
          };
          dispatch({
            type: "setFileState",
            data: updatedData,
          });
        })
        .catch((error) => {
          dispatch({
            type: "setErrorMessage",
            data: `There was a problem saving the photo to S3, code ${error.response.status}, ${error.response.statusText}`,
          });
        });
    })
    .catch((error) => {
      dispatch({
        type: "setErrorMessage",
        data: `There was a problem saving the photo to the server, code ${error.response.status}, ${error.response.statusText}`,
      });
    });
};

export { addNewFile, deleteFile, uploadFileToS3, uploadFile };
