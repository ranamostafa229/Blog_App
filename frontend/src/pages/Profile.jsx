import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  Paper,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CssTextField = styled(TextField)(({ theme }) => ({
  "& label": {
    color: "#6e86b2",
  },
  "& label.Mui-focused": {
    color: "#2196f3",
  },
  "& .MuiFilledInput-underline:after": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-underline:before": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
    borderBottom: "none",
  },
  "& .MuiFilledInput-root": {
    backgroundColor: theme.palette.background.default,
    border: "1px solid ",
    borderColor: " #d3d4d5",
    borderRadius: "10px",
    "&.Mui-focused ": {
      borderColor: "#2196f3",
    },
  },
}));

const Profile = () => {
  const theme = useTheme();
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState("");
  const [imageFileURL, setImageFileURL] = useState("");
  const [imageFileUploadProgress, setImageUploadProgress] = useState("");
  const [imageFileUploadError, setImageUploadError] = useState(null);
  const inputRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      () => {
        setImageUploadError(
          "Could not upload image, file must be less than 2MB"
        );
        setImageUploadProgress(null);
        setImageFile(null);
        setImageFileURL("");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
        });
      }
    );
  };
  console.log(imageFileUploadProgress, imageFileUploadError);
  return (
    <Paper
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h6">Account</Typography>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: "20px",
        }}
      >
        <Card sx={{ borderRadius: "10px", padding: "20px", flexGrow: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "500", pb: "10px" }}
          >
            Profile Picture
          </Typography>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "15px",
              gap: "12px",
              position: "relative",
            }}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress}
                text={`${imageFileUploadProgress}%`}
                styles={{
                  root: {
                    width: "100px",
                    height: "100px",
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
            )}
            <img
              src={imageFileURL || currentUser.profilePicture}
              alt="user avatar"
              width="100px"
              height="100px"
              style={{ borderRadius: "50%" }}
            />
            <Typography variant="subtitle1">
              Upload/Change Your Profile Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              hidden
              onChange={(e) => handleImageChange(e)}
            />
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
                bgcolor: "#6a4ee9",
                color: "white",
                textTransform: "none",
              }}
              onClick={() => inputRef.current.click()}
            >
              Upload Avatar
            </Button>
          </Box>
          {imageFileUploadError && (
            <Alert severity="error">{imageFileUploadError}</Alert>
          )}
        </Card>
        <Card
          sx={{
            borderRadius: "10px",
            border: "1px solid ",
            borderColor: theme.palette.text.secondary,
            padding: "20px",
            flexGrow: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "500", pb: "10px" }}
          >
            Edit Account Details
          </Typography>
          <Divider />
          <form>
            <FormControl sx={{ width: "100%", padding: "10px", gap: "20px" }}>
              <CssTextField
                label="Name"
                variant="filled"
                type="text"
                value={currentUser.username}
              />
              <CssTextField
                label="Email address"
                variant="filled"
                type="email"
                value={currentUser.email}
              />
              <CssTextField label="Password" variant="filled" type="password" />
              <Button
                variant="contained"
                sx={{
                  width: "fit-content",
                  bgcolor: "#6a4ee9",
                  color: "white",
                  textTransform: "none",
                }}
              >
                Change Details
              </Button>
            </FormControl>
          </form>
        </Card>
      </Box>
    </Paper>
  );
};

export default Profile;
