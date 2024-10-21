import { Badge, Box, Button, styled, Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import { icons } from "../utils/icons";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const TrendTopics = () => {
  const navigate = useNavigate();
  const { data } = useFetch("/api/v1/post/categories", []);
  const categoryElement = icons
    .filter((icon) => data?.categories?.includes(icon.label))
    .map((icon, index) => (
      <Typography
        key={index}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          fontWeight: "500",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/categories/${icon.label}`, {
            state: {
              categoryImg: icon.img,
              categoryBg: icon.bg,
            },
          });
        }}
      >
        <Badge
          badgeContent={data.countedPosts.map((e) =>
            e._id === icon.label ? e.count : ""
          )}
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": { bgcolor: "#FF2AAC" },
            color: "white",
          }}
        >
          <Box
            component="span"
            sx={{
              position: "relative",
              width: "70px",
              height: "70px",
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
    ));

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
      <StyledBox sx={{ paddingY: "15px", paddingX: "23px" }} variant="outlined">
        {categoryElement}
        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: "bold",
            gap: "16px",
            display: {
              xs: "none",
              md: "flex",
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
      </StyledBox>
    </Box>
  );
};

export default TrendTopics;

const shapeCircleStyles = {
  width: 60,
  height: 60,
  position: "absolute",
  borderRadius: "50%",
  boxshadow: "0 0 2px 2px rgba(0, 0, 0, 0.15)",
};
const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  backgroundColor: theme.palette.background.banner,
  gap: "50px",
  borderRadius: "60px",
  width: "75%",
  border: "2px solid #f2f1ff",
  borderColor: theme.palette.text.secondary,
  alignItems: "center",
  justifyContent: "center",
}));
