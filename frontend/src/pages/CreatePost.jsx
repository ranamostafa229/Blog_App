import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import UploadImgBox from "../components/CreatePost/UploadImgBox";

const CreatePost = () => {
  const [categories, setCategories] = useState("");
  const [catgory, setCatgory] = useState("");
  const [formData, setFormData] = useState({ category: "" });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addToFormData = useCallback((downloadURL) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePicture: downloadURL,
    }));
  }, []);
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("/api/v1/post/categories");
      const data = await res.json();
      data && setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <CssContainer>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "600",
          paddingX: "5px",
        }}
      >
        Add New Post
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
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
          <CssBox>
            <Box
              sx={{
                backgroundColor: "#ede7f6",
                padding: "10px",
                borderRadius: "5px",
                color: "black",
              }}
            >
              General Information
            </Box>
            <CssTextField
              variant="filled"
              placeholder="Title"
              required
              name="title"
              value={formData.title}
            />
            {!categories ? (
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <CssFormControl
                  variant="filled"
                  sx={{ minWidth: 200 }}
                  required
                >
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    sx={{ color: "#6e86b2" }}
                  >
                    Select a category
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    name="category"
                    value={formData.category || ""}
                    onChange={handleChange}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </CssFormControl>
                or
                <CssTextField
                  variant="filled"
                  placeholder="Add New Category"
                  required
                  name="category"
                  value={catgory}
                  onChange={(e) => setCatgory(e.target.value)}
                />
              </Box>
            ) : (
              <CssTextField
                variant="filled"
                placeholder="Add New Category"
                required
                name="category"
                value={catgory}
                onChange={(e) => setCatgory(e.target.value)}
              />
            )}
          </CssBox>
          <CssBox>
            <UploadImgBox addToFormData={addToFormData} />
          </CssBox>
        </Box>
        <CssBox sx={{ height: "450px" }}>
          <Box
            sx={{
              backgroundColor: "#ede7f6",
              padding: "10px",
              borderRadius: "5px",
              color: "black",
            }}
          >
            Post Content
          </Box>
          <ReactQuill theme="snow" style={{ height: "300px" }} />
        </CssBox>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              textTransform: "none",
              width: "fit-content",
              bgcolor: "#6a4ee9",
              color: "white",
            }}
          >
            Pusblish{" "}
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              width: "fit-content",
            }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </CssContainer>
  );
};

export default CreatePost;

const CssContainer = styled(Container)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  // alignItems: "center",
  width: "100%",
  padding: "15px",
}));
const CssBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.banner,
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  gap: "20px",
  // alignItems: "center",
  width: "100%",
}));
const CssTextField = styled(TextField)(({ theme }) => ({
  "& label": {
    // color: "#6e86b2",
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
    borderRadius: "5px",
    "&.Mui-focused ": {
      borderColor: "#2196f3",
    },
  },
  "& .MuiFilledInput-input": {
    padding: "15px", // Adjust padding as needed
  },
}));

const CssFormControl = styled(FormControl)(({ theme }) => ({
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
    borderRadius: "5px",
    "&.Mui-focused ": {
      borderColor: "#2196f3",
    },
  },
  "& .MuiFilledInput-input": {
    padding: "6px important",
  },
}));
