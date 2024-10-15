/* eslint-disable react/prop-types */
import { Alert, Box, styled, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UploadImgBox = ({ addToFormData }) => {
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(null);
  const [imgUploadError, setImgUploadError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setImgUrl(URL.createObjectURL(file));
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageChange({ target: { files: [file] } }); // this create an object that looks like the event object
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => {
    setDragOver(false);
  };
  const uploadImage = useCallback(async () => {
    //   setImageFileUploadError(null);
    //   setImageFileUploading(true);
    setImgUploadProgress(null);
    if (!imgFile) {
      return;
    }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imgFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    try {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgUploadProgress(progress.toFixed(0));
        },
        () => {
          setImgUploadError("Could not upload image, please try again");
          setImgUploadProgress(null);
          setImgFile(null);
          setImgUrl("");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
            setImgUploadProgress(null);
            setImgUploadError(null);
            addToFormData(downloadURL);
          });
        }
      );
    } catch (error) {
      setImgUploadError(error.message);
      setImgUploadProgress(null);
    }
  }, [addToFormData, imgFile]);
  useEffect(() => {
    if (imgFile) {
      uploadImage();
    }
  }, [imgFile, uploadImage]);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#ede7f6",
          padding: "10px",
          borderRadius: "5px",
          color: "black",
        }}
      >
        Post Image{" "}
      </Box>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        hidden
        onChange={handleImageChange}
      />

      <CssUploadBox
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={(theme) => ({
          border: dragOver ? "2px dashed #000" : "2px dashed #a5a6ad",
          background: dragOver
            ? theme.palette.background.drag
            : theme.palette.background.input,
          pointerEvents:
            dragOver || imgUploadProgress === null ? "auto" : "none",
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            height: "80px",
          }}
        >
          {imgUploadProgress ? (
            <CircularProgressbar
              value={imgUploadProgress}
              text={`${imgUploadProgress}%`}
              styles={{
                root: {
                  width: "80px",
                  height: "80px",
                  position: "absolute",
                },
                path: {
                  stroke: `rgba(237,231,246,0.9) `,
                },
                text: {
                  fontSize: "16px",
                  fontWeight: "600",
                  fill: "#6A4EE9",
                },
              }}
            />
          ) : (
            <CloudUploadIcon sx={{ fontSize: "50px", color: "#a5a6ad" }} />
          )}
        </Box>
        <Typography variant="h4" sx={{ fontSize: "25px" }}>
          Drop files here or click to upload.
        </Typography>
        <Typography variant="h6" sx={{ fontSize: "12px", color: "#a5a6ad" }}>
          (This is just a demo dropzone.Selected files are not actually
          uploaded)
        </Typography>
      </CssUploadBox>
      {imgUploadError && <Alert severity="error">{imgUploadError}</Alert>}
      {imgUrl && !imgUploadError && !imgUploadProgress && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #d3d4d5",
            borderRadius: "5px",
            padding: "15px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={imgUrl} alt="" style={{ width: "160px" }} />
            <Typography sx={{ fontSize: "15px", color: "#a5a6ad" }}>
              {imgFile.name}
            </Typography>
          </Box>
          <CloseIcon
            onClick={() => setImgUrl(null)}
            sx={{ fontSize: "25px", color: "#a5a6ad", cursor: "pointer" }}
          />
        </Box>
      )}
    </>
  );
};

export default UploadImgBox;

const CssUploadBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "8px",
  padding: "30px",
  gap: "15px",
  width: "100%",
  border: "1px dashed #d3d4d5",
  cursor: "pointer",
}));
