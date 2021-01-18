const validatePhoto = (selectedFile, dispatch) => {
  const { size } = selectedFile;

  // //! Split the filename to get the type
  let fileParts = selectedFile.name.split(".");

  let fileType = fileParts[1];
  const typeLowerCase = fileType.toLowerCase();
  const TWOMEGABYTES = 2097152;

  if (size >= TWOMEGABYTES) {
    dispatch({
      type: "setErrorMessage",
      data: "File Size needs to be below 2MB",
    });
    return false;
  } else if (
    typeLowerCase !== "jpg" &&
    typeLowerCase !== "jpeg" &&
    typeLowerCase !== "png"
  ) {
    dispatch({
      type: "setErrorMessage",
      data: "File type needs to be a jpg or png",
    });
    return false;
  } else {
    dispatch({
      type: "setErrorMessage",
      data: null,
    });

    return true;
  }
};
export { validatePhoto };
