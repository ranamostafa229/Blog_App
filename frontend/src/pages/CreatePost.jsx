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
import { useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [category, setCategory] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
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
  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
            <CssTextField variant="filled" placeholder="Title" required />
            <CssFormControl variant="filled" sx={{ minWidth: 200 }} required>
              <InputLabel
                id="demo-simple-select-filled-label"
                sx={{ color: "#6e86b2" }}
              >
                Select a category
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={category}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </CssFormControl>
          </CssBox>
          <CssBox>
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
              required
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
              })}
            >
              <CloudUploadIcon sx={{ fontSize: "50px", color: "#a5a6ad" }} />
              <Typography variant="h4" sx={{ fontSize: "25px" }}>
                Drop files here or click to upload.
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: "12px", color: "#a5a6ad" }}
              >
                (This is just a demo dropzone.Selected files are not actually
                uploaded)
              </Typography>
            </CssUploadBox>

            {imgUrl && (
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
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
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
    padding: "10px", // Adjust padding as needed
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
