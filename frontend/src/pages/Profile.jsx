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
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { updateFailure, updateStart, updateSuccess } from "../redux/userSlice";

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
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState("");
  const [imageFileURL, setImageFileURL] = useState("");
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState("");
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);
  const [formData, setFormData] = useState({});
  const inputRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };
  const uploadImage = useCallback(async () => {
    setImageFileUploadError(null);
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      () => {
        setImageFileUploadError(
          "Could not upload image, file must be less than 2MB"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileURL("");
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setFormData((prevFormData) => ({
            ...prevFormData,
            profilePicture: downloadURL,
          }));
          setImageFileUploading(false);
        });
      }
    );
  }, [imageFile]);

  useEffect(() => {
    dispatch(updateFailure(""));
    setUpdateUser(null);
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile, dispatch, uploadImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setUpdateUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) return;
    if (imageFileUploading) {
      dispatch(updateFailure("Please wait while image is uploading"));
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/v1/user/update/${currentUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(updateSuccess(data));
        setUpdateUser("User's Profile Updated Successfully");
      }
      if (data.message === false) {
        dispatch(updateFailure(data.message));
        setUpdateUser(null);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

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
      <form onSubmit={handleSubmit}>
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
                Select Photo
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

            <FormControl sx={{ width: "100%", padding: "10px", gap: "20px" }}>
              <CssTextField
                label="Name"
                variant="filled"
                type="text"
                name="username"
                value={formData.username || currentUser.username}
                onChange={handleChange}
              />
              <CssTextField
                label="Email address"
                variant="filled"
                type="email"
                name="email"
                value={formData.email || currentUser.email}
                onChange={handleChange}
              />
              <CssTextField
                label="Password"
                variant="filled"
                type="password"
                name="password"
                onChange={handleChange}
              />
              <Button
                variant="contained"
                sx={{
                  width: "fit-content",
                  bgcolor: "#6a4ee9",
                  color: "white",
                  textTransform: "none",
                }}
                type="submit"
                disabled={loading || imageFileUploading}
              >
                Change Details
              </Button>
            </FormControl>
          </Card>
        </Box>
      </form>
      {updateUser && <Alert severity="success">{updateUser}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </Paper>
  );
};

export default Profile;
