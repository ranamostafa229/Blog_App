import { Badge, Box, Button, Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import HtmlIcon from "../assets/html-icon.png";
import CssIcon from "../assets/css-icon.png";
import JavascriptIcon from "../assets/js-icon.png";
import CodeIcon from "../assets/code-icon.png";
import DatabaseIcon from "../assets/databases-icon.png";
import { useNavigate } from "react-router-dom";
// import SQLIcon from "../assets/sql-icon.png";

const TrendTopics = () => {
  const icons = [
    {
      img: HtmlIcon,
      bg: "#ff8e51",
      label: "HTML",
    },
    {
      img: CssIcon,
      bg: "#227dff",
      label: "CSS",
    },
    {
      img: JavascriptIcon,
      bg: "#ffcb29",
      label: "Javascript",
    },
    {
      img: CodeIcon,
      bg: "#6a4ee9",
      label: "Fundamentals",
    },
    {
      img: DatabaseIcon,
      bg: "#5751ff",
      label: "Databases",
    },
    // {
    //   img: SQLIcon,
    //   bg: "#f95353",
    //   label: "Databases",
    // },
  ];

  const shapeCircleStyles = {
    width: 60,
    height: 60,
    position: "absolute",
    // top: "10px",
    borderRadius: "50%",
    boxshadow: "0 0 2px 2px rgba(0, 0, 0, 0.15)",
  };
  const categoryElement = icons.map((icon, index) => {
    return (
      <Typography
        key={index}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          fontWeight: "500",
          color: "black",
        }}
      >
        <Badge
          badgeContent={index + 1}
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": { backgroundColor: "#FF2AAC" },
            color: "white",
          }}
        >
          <Box
            component="span"
            sx={{
              position: "relative",
              width: "70px",
              height: "70px",
              bgcolor: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                bgcolor: icon.bg + "33",
              },
              transition: "all 0.4s ease",
              cursor: "pointer",
            }}
          >
            <Box
              component="span"
              sx={{
                ...shapeCircleStyles,
                bgcolor: icon.bg,
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <img
                src={icon.img}
                alt="Trending"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "60px",
                  height: "60px",
                }}
              />
            </Box>
          </Box>
        </Badge>
        {icon.label}
      </Typography>
    );
  });
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
        }}
      >
        <BoltIcon sx={{ fontSize: "35px", color: "#ff2aac" }} />
        Trending Topics
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "#ffffff",
          gap: "50px",
          paddingY: "15px",
          paddingX: "40px",
          borderRadius: "60px",
          width: "75%",
          border: "2px solid #f2f1ff",
          alignItems: "center",
          justifyContent: "center",
        }}
        variant="outlined"
      >
        {categoryElement}
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: "bold",
            gap: "16px",
            display: {
              xs: "none",
              lg: "flex",
            },
            alignItems: "center",
          }}
        >
          or...
          <Button
            variant="contained"
            sx={{
              placeSelf: "center",
              bgcolor: "#6a4ee9",
              ":hover": { bgcolor: "#363853" },
            }}
            onClick={() => {
              navigate("categories");
            }}
          >
            Explore All
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default TrendTopics;
