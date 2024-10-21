import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import UploadImgBox from "../components/CreatePost/UploadImgBox";

const CreatePost = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    newcategory: "",
  });
  const [tab, setTab] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { indent: "-1" }, { indent: "+1" }],
      ["code-block"],
    ],
  };

  const formats = [
    "header",
    "font",
    "bold",
    "italic",
    "underline",
    "list",
    "indent",
    "code-block",
  ];
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const newCategory =
        name === "newcategory" ? value : prevFormData.newcategory;
      if (name === "category") {
        return {
          ...prevFormData,
          [name]: value,
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
          category: newCategory,
        };
      }
    });
  };

  const addToFormData = useCallback((downloadURL) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: downloadURL,
    }));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/post/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        navigate(`/post/${data.slug}`);
      } else {
        setError(data.message);
        return;
      }
    } catch (error) {
      setError(error.message);
    }
  };
  // console.log(formData);
  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("/api/v1/post/categories");
      const data = await res.json();
      data && setCategories(data);
    };
    getCategories();
  }, []);
  useEffect(() => {
    tab === 1 &&
      setCategories((prevCategories) => [
        ...prevCategories,
        formData.newcategory,
      ]);
  }, [formData.newcategory, tab]);
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
              onChange={handleChange}
            />
            <Box
              sx={(theme) => ({
                maxWidth: { xs: 400, sm: 520 },
                bgcolor: theme.palette.background.paper,
              })}
            >
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs "
                sx={{
                  "& .MuiTabs-flexContainer": {
                    gap: "10px",
                  },
                  "& .Mui-selected": {
                    color: "#745ed8",
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#6a4ee9",
                  },
                }}
                value={tab}
              >
                <Tab
                  sx={{
                    color: tab === 0 ? "#6a4ee9" : "#6e86b2",
                    padding: "10px",
                    borderBottom: tab === 0 ? "2px solid" : "none",
                  }}
                  onClick={() => setTab(0)}
                  label=" Add New Category"
                  value={0}
                />
                {categories?.length > 0 && (
                  <Tab
                    sx={{
                      padding: "10px",
                      color: tab === 1 ? "#6a4ee9" : "#6e86b2",
                      borderBottom: tab === 1 ? "2px solid" : "none",
                    }}
                    onClick={() => setTab(1)}
                    label="Select Category"
                    value={1}
                  />
                )}
              </Tabs>
            </Box>
            {categories && tab === 1 ? (
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <CssFormControl
                  variant="filled"
                  sx={{ minWidth: 485 }}
                  required
                >
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    sx={{ color: "green" }}
                  >
                    Select a category
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </CssFormControl>
              </Box>
            ) : (
              tab === 0 && (
                <CssTextField
                  variant="filled"
                  placeholder="Add New Category"
                  required
                  name="newcategory"
                  value={formData.newcategory || ""}
                  onChange={handleChange}
                />
              )
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
          <ReactQuill
            theme="snow"
            style={{ height: "300px" }}
            required
            onChange={(value) => setFormData({ ...formData, content: value })}
            modules={modules}
            formats={formats}
          ></ReactQuill>
        </CssBox>
        {error && (
          <Alert
            severity="error"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {error === "You are not authorized" ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {error}
                <Button onClick={() => navigate("/signin")} variant="text">
                  Login
                </Button>
              </Box>
            ) : (
              error
            )}
          </Alert>
        )}

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
    color: "#9c9a9f",
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
